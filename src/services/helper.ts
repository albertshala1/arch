import type { SafeParseError, SafeParseSuccess, ZodType } from "zod";
import { Auth } from "@aws-amplify/auth";
import type { AccountSchema } from "~/services/accounts-schema.ts";
import { DEPLOYMENT_TARGET } from "~/utils/helpers.ts";
import { clearSession } from "~/context/context-helpers.ts";

export const getBuildStageEndPoint = (domain: string): string => {
  let endpoint: string;
  switch (DEPLOYMENT_TARGET) {
    case "prod":
      endpoint = `https://${domain}.bridge.cloud`;
      break;
    case "stage":
      endpoint = `https://${domain}.staging-bridge.cloud`;
      break;
    case "alpha":
    case "development":
      endpoint = `https://${domain}.alpha-bridge.cloud`;
      break;
    default:
      endpoint = "";
      console.error("No bridge end-point found.");
  }
  return endpoint;
};

export const getIDToken = () => {
  const storedState = JSON.parse(localStorage.getItem("bridge_state") || "false");
  if (storedState) {
    return storedState?.auth?.idToken;
  }
};

export const getTokenDetails = (key: string) => {
  const storedState = JSON.parse(localStorage.getItem("bridge_state") || "false");
  if (storedState) {
    return storedState?.tokens[key];
  }
};

export const getCognitoAccessJwtToken = async () => {
  try {
    // Auth.currentSession() checks if token is expired and refreshes with Cognito if needed automatically
    const session = await Auth.currentSession();
    const freshIdToken = session.getIdToken().getJwtToken();
    persistCognitoToken(freshIdToken);
    return freshIdToken;
  } catch (e) {
    console.error("Unable to refresh cognito token");
    await clearSession();
  }
};

export const persistCognitoToken = (newIdToken: string): void | Record<string, unknown> => {
  if (!newIdToken) {
    console.error("idToken required");
    return;
  }

  let storedState;
  try {
    storedState = JSON.parse(localStorage.getItem("bridge_state") || "{}");
  } catch (e) {
    console.error(e);
    storedState = {};
  }

  const updatedBridgeState = {
    ...storedState,
    auth: {
      ...storedState.auth,
      idToken: newIdToken,
    },
  };

  localStorage.setItem("bridge_state", JSON.stringify(updatedBridgeState));
};

export const updatedPersistedState = (
  state: string,
  value: Record<string, unknown>
): undefined | Record<string, unknown> => {
  if (!state || !value) {
    console.error("Missing parameters state and/or value");
    return undefined;
  }

  let storedState;
  try {
    storedState = JSON.parse(localStorage.getItem("bridge_state") || "{}");
  } catch (e) {
    console.error(e);
    storedState = {};
    return storedState;
  }

  const updatedBridgeState = {
    ...storedState,
    [state]: {
      ...storedState[state],
      ...value,
    },
  };

  localStorage.setItem("bridge_state", JSON.stringify(updatedBridgeState));
};

export const getIsSamlUser = () => {
  const storedState = JSON.parse(localStorage.getItem("bridge_state") || "false");
  if (storedState) {
    return storedState?.auth?.isSamlUser;
  }
};

export const getAccountLinks = (account: AccountSchema, relType: string): string | undefined => {
  if (!account) {
    return undefined;
  }

  return [account].reduce((serviceUrl, { links }) => {
    if (links && !serviceUrl) {
      const findByRelType = links.find(({ rel }) => rel === relType);
      if (findByRelType) {
        serviceUrl = findByRelType.href;
      }
    }
    return serviceUrl;
  }, "");
};

export const getAccountRegion = () => {
  const storedState = JSON.parse(localStorage.getItem("bridge_state") || "false");
  if (storedState) {
    const currentAccount = storedState?.accounts.currentAccount as AccountSchema;
    return currentAccount?.region;
  }
  return undefined;
};

export const getCurrentTimeInSeconds = () => Math.floor(Date.now() / 1000);

const bridgeTimeouts: any[] = [];

export const globalTimeout = (fn: Function, delay: number, args: unknown) => {
  const timeout = window.setTimeout(fn, delay, args);
  bridgeTimeouts.push(timeout);
};

export const clearTimeouts = () => {
  while (bridgeTimeouts) {
    clearTimeout(bridgeTimeouts.pop());
  }
};

export const isSpecificFieldError = (message = "") =>
  message.toLowerCase().includes("review the indicated field for more details");

export const fetchAPI = async ({
  url = "",
  type = "GET",
  body = {},
  bridgeToken = "",
}): Promise<{
  req: Response;
  resp: any; // TODO Improve with better typings
}> => {
  const idToken = !bridgeToken ? getIDToken() : bridgeToken;
  if (!idToken) {
    console.error(`Unable to retrieve Bridge/ID Token`);
  }

  const options = {
    headers: {
      "api-version": "v1",
      Authorization: `Bearer ${idToken}`,
    },
  };

  const request = await fetch(url, {
    method: type,
    cache: "no-cache",
    ...options,
    ...(Object.keys(body).length && { body: JSON.stringify(body) }),
  });

  if (request.status === 204) {
    // No content request
    return {
      req: request,
      resp: {},
    };
  }

  if (request.status === 404) {
    // No content request
    throw {
      status: request.status,
    };
  }

  const response = await request.json();

  if (!request.ok) {
    throw {
      status: request.status,
      message: response.message ?? response,
      ...(isSpecificFieldError(response.message) && { response }),
    };
  }

  return {
    req: request,
    resp: response,
  };
};

export function parseResponse<T>(
  schema: ZodType,
  value: Record<string, unknown>
): SafeParseSuccess<T> | SafeParseError<T> {
  if (import.meta.env.NODE_ENV !== "production") {
    // Throw in development so we're aware of the error
    return schema.parse(value);
  } else {
    const parsed = schema.safeParse(value);
    if (!parsed.success) {
      // Log to service to be informed
      const formatted = parsed.error.format();
      console.error(formatted);
    }
    return parsed;
  }
}

export const getRequestSearchParams = (limit: number, cursor: string) => {
  return new URLSearchParams({
    limit: `${limit}`,
    cursor: cursor,
    rel: "next",
  }).toString();
};
