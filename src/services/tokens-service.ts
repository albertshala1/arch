import type { AccountSchema } from "~/services/accounts-schema.ts";
import { clearSession } from "~/context/context-helpers.ts";
import { delay } from "~/utils/helpers.ts";
import {
  fetchAPI,
  getAccountLinks,
  getCognitoAccessJwtToken,
  getCurrentTimeInSeconds,
  getIsSamlUser,
  getTokenDetails,
  updatedPersistedState,
} from "./helper.ts";

export type BridgeTokenResp = {
  tokenID: string;
  expires: string;
};

let refreshTokensTimer: ReturnType<typeof setInterval>;
// Holds API retry count
const retries = {
  numOfRetries: 2,
  backOffPeriod: 3000,
  set value(num: number) {
    this.numOfRetries = num;
  },
  get value() {
    return this.numOfRetries;
  },
};

const fetchBridgeToken = async (selectedAccount: AccountSchema): Promise<BridgeTokenResp> => {
  const response = {
    tokenID: "",
    expires: "",
  };

  clearInterval(refreshTokensTimer);

  try {
    let tokenURL = getAccountLinks(selectedAccount, "token");
    if (!tokenURL) {
      throw new Error("Unable to retrieve tokenURL");
    }

    // SAML Request
    const roleId = selectedAccount?.roleID || "";
    const isSamlUser = getIsSamlUser();
    if (roleId !== "" && isSamlUser) {
      tokenURL = `${tokenURL}?roleID=${roleId}`;
    }

    const { resp } = await fetchAPI({
      url: `${tokenURL}`,
      type: "POST",
    });

    if (resp) {
      const callerId = await getCallerIdentity(selectedAccount, resp.token);
      response.tokenID = resp.token;
      response.expires = callerId.exp;

      const expiresInSeconds = callerId.exp - 45;

      refreshTokensTimer = setInterval(() => {
        // eslint-disable-next-line no-console
        console.debug("fetch bridge token started...");

        if (getCurrentTimeInSeconds() > expiresInSeconds) {
          clearInterval(refreshTokensTimer);
          return refreshBridgeToken(selectedAccount, resp.token);
        }
      }, 15000); // 15 secs

      return {
        ...response,
      };
    }
  } catch (e) {
    console.error("Error Fetching Bridge Token", e);
  }

  return { ...response };
};

const refreshBridgeToken = async (
  account: AccountSchema,
  token: string
): Promise<BridgeTokenResp | undefined> => {
  if (!token || !account) {
    console.error("Missing token and/or account");
    clearInterval(refreshTokensTimer);
    return undefined;
  }

  const tokenExpires = getTokenDetails("expires");

  // If previous token is still valid, bail out
  if (tokenExpires - 45 > getCurrentTimeInSeconds() || !tokenExpires) {
    return undefined;
  }

  if (refreshTokensTimer) {
    clearInterval(refreshTokensTimer);
  }

  const tokenURL = getAccountLinks(account, "token");
  if (!tokenURL) {
    // eslint-disable-next-line no-console
    console.error("No Token URL Found");
    return undefined;
  }

  try {
    const requestURL = `${tokenURL.split("/api/accounts/")[0]}/api/refresh-token`;
    const { resp } = await fetchAPI({
      url: requestURL,
      type: "POST",
      body: {
        token: token,
      },
    });

    if (resp) {
      const callerId = await getCallerIdentity(account, resp.token);
      const expiresInSeconds = callerId.exp - 45;

      refreshTokensTimer = setInterval(() => {
        if (getCurrentTimeInSeconds() > expiresInSeconds) {
          clearInterval(refreshTokensTimer);
          // eslint-disable-next-line no-console
          console.debug("Refreshing Bridge Token");
          return refreshBridgeToken(account, resp.token);
        }
      }, 15 * 1000); // 15 seconds

      retries.value = 2; // reset retries back to default value
      updatedPersistedState("tokens", { tokenID: resp.token });
      return { tokenID: resp.token, expires: callerId.exp };
    }

    return resp;
  } catch (error: unknown) {
    const errorResp = error as BridgeApiError;
    clearInterval(refreshTokensTimer);

    if (retries.value === 0) {
      console.error("Reached maximum retries fetching bridge token ");
      await clearSession();
    }

    if (errorResp.status === 401 && errorResp.message.toLowerCase().startsWith("invalid token")) {
      if (retries.value > 0) {
        retries.value = retries.value - 1;

        await delay(retries.backOffPeriod);
        return await fetchBridgeToken(account);
      }
    }

    if (
      errorResp?.status === 403 &&
      errorResp.message.toLowerCase().startsWith("user is not authorized")
    ) {
      const tokenRefreshed = await getCognitoAccessJwtToken();
      if (tokenRefreshed && retries.value > 0) {
        retries.value = retries.value - 1;

        await delay(retries.backOffPeriod);
        return await fetchBridgeToken(account);
      }
    }

    // If the token is revoked you'll get back a 403 no body response
    // If the user/account have been deleted or made inactive you'll get a 403 no body response
    if (errorResp?.status === 403) {
      console.error("Error Refreshing Bridge Token ", errorResp);
      await clearSession();
    }
  }
};

export const revokeBridgeToken = async (selectedAccount: AccountSchema, bridgeToken: string) => {
  let tokenServiceURL;
  if (!selectedAccount) {
    console.error("Missing parameter for selectedAccount");
    return undefined;
  }

  let tokenURL = getAccountLinks(selectedAccount, "token");
  if (!tokenURL) {
    console.error("Unable to retrieve token end-point");
    return undefined;
  }
  // SAML Request
  const roleId = selectedAccount?.roleID || "";
  const isSamlUser = getIsSamlUser();
  if (roleId !== "" && isSamlUser) {
    tokenURL = `${tokenURL}?roleID=${roleId}`;
  }

  const { jti } = await getCallerIdentity(selectedAccount, bridgeToken);
  if (!jti) {
    throw new Error(`Missing jti property from c1Token`);
  }

  if (tokenURL.indexOf("?roleID=") !== -1) {
    const noRoleIdTokenURL = tokenURL.split("?roleID=")[0];
    tokenServiceURL = `${noRoleIdTokenURL}/${jti}`;
  } else {
    tokenServiceURL = `${tokenURL}/${jti}`;
  }

  try {
    await fetchAPI({
      url: tokenServiceURL,
      bridgeToken: bridgeToken,
      type: "DELETE",
    });

    updatedPersistedState("tokens", { isTokenRevoked: true });
    return { isTokenRevoked: true };
  } catch (error: unknown) {
    const errorResp = error as BridgeApiError;
    console.error(errorResp);

    updatedPersistedState("tokens", { isTokenRevoked: false });
    return { isTokenRevoked: false };
  }
};

const getCallerIdentity = async (selectedAccount: AccountSchema, bridgeToken: string) => {
  try {
    const tokenURL = getAccountLinks(selectedAccount, "token");
    if (!tokenURL) {
      console.error("Missing token url");
      return undefined;
    }
    const requestURL = `${tokenURL.split("/api/accounts/")[0]}/api/caller-identity`;

    const { resp } = await fetchAPI({ url: requestURL, bridgeToken });
    return resp;
  } catch (error) {
    console.error("Error getting caller identity claim ", error);
  }
};

export default {
  fetchBridgeToken,
  refreshBridgeToken,
  getCallerIdentity,
};
