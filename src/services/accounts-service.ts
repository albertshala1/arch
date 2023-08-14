import TokensService, { revokeBridgeToken } from "~/services/tokens-service.ts";
import { delay } from "~/utils/helpers.ts";
import {
  fetchAPI,
  getCognitoAccessJwtToken,
  getIDToken,
  parseResponse,
} from "~/services/helper.ts";
import type {
  AccountListSchema,
  AccountSchema,
  RegionsSchemaType,
} from "~/services/accounts-schema.ts";
import {
  accountsInterfaceSchema,
  createAccountSchema,
  regionsSchema,
} from "~/services/accounts-schema.ts";
import { clearSession } from "~/context/context-helpers.ts";

// state used on login to redirect to the right page
// type: "NAVIGATE_TO" | "ADD_ACCOUNT"
const filteredAccountState = (): AccountListSchema => ({
  type: "",
  state: {
    accounts: {
      accountsList: [],
      currentAccount: {} as AccountSchema,
      previousAccount: {} as AccountSchema,
      currentAccountID: "",
      roleID: "",
    },
    tokens: {
      tokenID: "",
      previousToken: "",
      expires: "",
    },
    pathTo: "",
  },
});

const baseURL = `${import.meta.env.BRIDGE_ACCOUNTS_ENDPOINT}`;
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
const getAllAccounts = async (): Promise<AccountListSchema> => {
  try {
    const idToken: string = getIDToken();

    const bridgeAccounts: AccountSchema[] = [];
    if (!idToken) {
      console.error("Token missing...");
      return filteredAccountState();
    }

    const fetchBridgeAccounts = async (
      cursor = ""
    ): Promise<{ accountsList: AccountSchema[] } | undefined> => {
      try {
        const params = {
          limit: "50",
          cursor: cursor,
          rel: "next",
        };

        const { resp } = await fetchAPI({
          url: `${baseURL}/api/accounts?${new URLSearchParams(params).toString()}`,
        });

        if (resp.accounts.length === 0) {
          return {
            accountsList: resp.accounts,
          };
        }

        const validatedResponse =
          resp.accounts && parseResponse(accountsInterfaceSchema, resp.accounts[0]);

        if (validatedResponse) {
          const { accounts = [], next = false } = resp;
          bridgeAccounts.push(...accounts);

          if (next) {
            await fetchBridgeAccounts(next);
          }

          return {
            accountsList: bridgeAccounts,
          };
        }
      } catch (error: unknown) {
        if (retries.value === 0) {
          await clearSession();
        }
        const errorResp = error as BridgeApiError;
        if (
          errorResp?.status === 403 &&
          errorResp.message.toLowerCase().startsWith("user is not authorized")
        ) {
          const tokenRefreshed = await getCognitoAccessJwtToken();
          if (tokenRefreshed) {
            retries.value = retries.value - 1;
            await delay(retries.backOffPeriod);
            return fetchBridgeAccounts();
          }
        }

        // @ts-ignore
        const errorMessage = errorResp ? errorResp?.message : errorResp;
        console.error("Error Fetching Bridge Accounts: ", errorMessage);
        throw errorMessage;
      }
    };

    const entireAccountsList = await fetchBridgeAccounts();
    if (entireAccountsList) {
      const { accountsList } = entireAccountsList;

      const activeAccounts =
        accountsList && accountsList.filter((account: AccountSchema) => account.state === "active");

      if (activeAccounts.length > 0) {
        return await filterBridgeAccounts(activeAccounts, idToken);
      }
    }

    return {
      type: "NAVIGATE_TO",
      state: {
        ...filteredAccountState().state,
        pathTo: "account-setup",
      },
    };
  } catch (error) {
    console.error("Error Fetching Bridge Accounts: ", error);
    throw error;
  }
};

// const getAccountDetails () => {},

const getAccountRegions = async (): Promise<RegionsSchemaType> => {
  const defaultPayloadResponse: RegionsSchemaType = {
    type: "",
    state: {
      regions: [],
    },
    errorMessage: "",
  };
  try {
    const { resp } = await fetchAPI({
      url: `${baseURL}/api/regions`,
      type: "GET",
    });

    const validatedResponse =
      resp && parseResponse(regionsSchema.shape.state.shape.regions, resp.regions);

    if (validatedResponse) {
      return {
        ...defaultPayloadResponse,
        type: "SHOW_REGIONS",
        state: {
          regions: [...resp.regions],
        },
      };
    } else {
      console.error("Invalid Response - Fetching Regions ", validatedResponse);
      return { ...defaultPayloadResponse };
    }
  } catch (error) {
    // @ts-ignore
    const errorMessage = error ? error?.message : error;
    console.error(errorMessage);
    return {
      ...defaultPayloadResponse,
      type: "SHOW_REGIONS_ERROR",
      errorMessage: errorMessage,
    };
  }
};

interface BridgeCreateAccountProps {
  type: string;
  state: {
    accountsList: AccountSchema[];
    lastAccessedAccountID: string;
  };
  errorMessage?: string;
}

const createBridgeAccount = async (
  accountDetails: Record<string, string>
): Promise<BridgeCreateAccountProps> => {
  const defaultPayloadResponse: BridgeCreateAccountProps = {
    type: "",
    state: {
      accountsList: [],
      lastAccessedAccountID: "",
    },
    errorMessage: "",
  };
  try {
    if (!accountDetails) {
      console.error("Missing or Invalid Add Account Payload");
      return { ...defaultPayloadResponse };
    }

    const reqData = {
      alias: accountDetails.alias,
      locale: accountDetails.locale || "en",
      region: accountDetails.region,
    };

    const { resp: account } = await fetchAPI({
      url: `${baseURL}/api/accounts`,
      type: "POST",
      body: reqData,
    });

    const validatedResponse = account && parseResponse(createAccountSchema, account);

    if (validatedResponse) {
      return {
        ...defaultPayloadResponse,
        type: "ADD_ACCOUNT",
        state: {
          accountsList: [account],
          lastAccessedAccountID: account.id,
        },
      };
    } else {
      console.error("Invalid Response - Fetching Regions ", validatedResponse);
      return { ...defaultPayloadResponse };
    }
  } catch (error) {
    // @ts-ignore
    const errorMessage = error ? error?.message : error;
    console.error("Account could not be created: ", errorMessage);

    return {
      ...defaultPayloadResponse,
      type: "ADD_ACCOUNT_ERROR",
      // @ts-ignore
      errorMessage: errorMessage,
    };
  }
};

// const deleteAccount () => {},

const filterBridgeAccounts = async (
  accounts: AccountSchema[],
  idToken: string
): Promise<AccountListSchema> => {
  const lastAccessedAccountID = localStorage.getItem("lastAccessedID") || "";
  const selectedAccount = accounts.find((account) => account.id === lastAccessedAccountID);

  if (!idToken) {
    throw Error("Missing IDToken");
  }

  const { state } = filteredAccountState();

  if (accounts.length === 1) {
    const { id = "", roleID = "" } = accounts[0];
    state.accounts.accountsList = accounts;
    state.accounts.currentAccount = accounts[0];
    state.accounts.currentAccountID = id;
    state.accounts.roleID = roleID;
  } else if (!accounts.some((account) => account.id === lastAccessedAccountID)) {
    state.accounts.accountsList = accounts;
    return {
      type: "NAVIGATE_TO",
      state: {
        ...state,
        pathTo: "account-selection",
      },
    };
  } else {
    if (selectedAccount) {
      const { id = "", roleID = "" } = selectedAccount;
      state.accounts.accountsList = accounts;
      state.accounts.previousAccount = state.accounts.currentAccount;
      state.tokens.previousToken = state.tokens.tokenID;
      state.accounts.currentAccount = selectedAccount;
      state.accounts.currentAccountID = id;
      state.accounts.roleID = roleID;
    }
  }

  if (state.accounts.roleID) {
    localStorage.setItem("lastAccessedRoleID", state.accounts.roleID);
  } else {
    localStorage.removeItem("lastAccessedRoleID");
  }

  if (state.accounts.currentAccountID && state.accounts.roleID) {
    localStorage.setItem("lastAccessedID", state.accounts.currentAccountID);
    localStorage.setItem("lastAccessedRoleID", state.accounts.roleID);
  } else {
    localStorage.removeItem("lastAccessedID");
    localStorage.removeItem("lastAccessedRoleID");
  }

  if (state.accounts.currentAccount.id !== "") {
    const previousAccount = state.accounts.previousAccount;
    const previousToken = state.tokens.previousToken;
    const previousAccountID = previousAccount?.id;

    const bridgeTokens = await TokensService.fetchBridgeToken(state.accounts.currentAccount);

    if (bridgeTokens) {
      // Revoke previous token
      if (
        previousAccountID &&
        previousToken &&
        state.accounts.currentAccountID !== previousAccountID
      ) {
        await revokeBridgeToken(previousAccount, previousToken);
      }

      state.tokens = {
        tokenID: bridgeTokens.tokenID,
        expires: bridgeTokens.expires,
      };
    }
  }

  // Add Account will return a collection of accounts and tokens
  return {
    type: "ADD_ACCOUNT",
    state: {
      ...state,
    },
  };
};

export default {
  getAccountRegions,
  getAllAccounts,
  filterBridgeAccounts,
  createBridgeAccount,
};
