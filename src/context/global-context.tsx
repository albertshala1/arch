import type { QRL } from "@builder.io/qwik";
import {
  $,
  createContextId,
  useContextProvider,
  useStore,
  useVisibleTask$,
} from "@builder.io/qwik";
import type { Role } from "~/services/roles-schema.ts";
import { defaultRoles, storageKeys } from "~/utils/helpers.ts";
import type { AccountSchema } from "~/services/accounts-schema.ts";

export type BridgeStoreContextProps = {
  auth: {
    idToken: string;
    isAuthenticated: boolean;
    signOff: boolean;
    user: { username: string; email: string; locale: string };
    // SAML
    isSamlUser?: boolean;
    samlTokenExpiry?: number;
  };
  accounts: {
    currentAccountID: string;
    currentAccount: AccountSchema;
    lastAccessedAccountID: string;
    accountsList: AccountSchema[];
    hasAccountInvite: boolean;
    cloudProviders: Record<string, unknown>[];
    roleID: string;
    roles: Role[];
  };
  tokens: {
    tokenID: string;
    expires: string;
    isTokenRevoked: boolean;
  };
  getStore: QRL<<T extends keyof BridgeStoreContextProps>(state: T) => BridgeStoreContextProps[T]>;
  updateStore: QRL<
    (
      store: Record<string, unknown>,
      state: string | undefined,
      payload: Record<string, unknown>,
      cb?: (() => void) | undefined
    ) => Record<string, unknown>
  >;
};

// Initial State
const initialState: BridgeStoreContextProps = {
  auth: {
    idToken: "",
    isAuthenticated: false,
    signOff: false,
    user: { username: "", email: "", locale: "en" },
  },
  accounts: {
    currentAccountID: "",
    currentAccount: {} as AccountSchema,
    lastAccessedAccountID: "",
    accountsList: [],
    hasAccountInvite: false,
    cloudProviders: [],
    roleID: "",
    roles: defaultRoles,
  },
  tokens: {
    tokenID: "",
    expires: "",
    isTokenRevoked: false,
  },

  // STORE SETTERS/GETTERS
  getStore: $(function (state) {
    // @ts-ignore
    // Ignoring to avoid the implicit any error, alternative fix:  "noImplicitAny": false which leads to other issues.
    return this[state];
  }),

  updateStore: $(function (
    store: Record<string, unknown>,
    state = "",
    payload: Record<string, unknown>,
    cb?: () => void
  ) {
    if (!Object.keys(payload).length) {
      throw new Error("Payload must be an object");
    }

    Object.keys(payload).forEach((key) => {
      // @ts-ignore
      this[state][key] = payload[key];
    });

    window.localStorage.setItem(storageKeys.BRIDGE_STATE, JSON.stringify({ ...store }));

    // Optional callback
    if (cb) {
      cb();
    }

    return store;
  }),
};

type BridgeStoreType = ReturnType<typeof useGlobalProvider>;
export const BridgeStoreContext = createContextId<BridgeStoreType>("BridgeStoreContext");

export const useGlobalProvider = () => {
  const store = useStore(initialState);

  const getState = $(<T extends keyof BridgeStoreContextProps>(state: T) => {
    return store?.getStore(state);
  });

  const setState = $((state: string, payload: Record<string, unknown>, cb?: () => void) => {
    return store.updateStore(store, state, payload, cb);
  });

  const getAccountDetails = $(
    async (
      type?: keyof BridgeStoreContextProps["accounts"]
    ): Promise<BridgeStoreContextProps["accounts"]> => {
      const accountsState = (await getState("accounts")) as BridgeStoreContextProps["accounts"];
      // @ts-ignore
      return accountsState[type] || accountsState;
    }
  );

  const getTokenDetails = $(
    async (
      type?: keyof BridgeStoreContextProps["tokens"]
    ): Promise<BridgeStoreContextProps["tokens"]> => {
      const tokenState = (await getState("tokens")) as BridgeStoreContextProps["tokens"];
      // @ts-ignore
      return tokenState[type] || tokenState;
    }
  );

  const getAuthDetails = $(
    async (
      type?: keyof BridgeStoreContextProps["auth"]
    ): Promise<BridgeStoreContextProps["auth"]> => {
      const authState = (await getState("auth")) as BridgeStoreContextProps["auth"];
      // @ts-ignore
      return authState[type] || authState;
    }
  );

  useVisibleTask$(async ({ track }) => {
    track(() => store?.auth?.signOff);

    const persistedState = () =>
      JSON.parse(window.localStorage.getItem(storageKeys.BRIDGE_STATE) || "{}");

    if (store?.auth?.signOff) {
      const storedState = persistedState();
      for (const parent of Object.keys(storedState)) {
        if (Object.keys(storedState[parent]).length) {
          await setState(parent, {
            // @ts-ignore
            ...initialState[parent],
          });
          window.localStorage.removeItem(storageKeys.BRIDGE_STATE);
        }
      }
    }

    if (Object.keys(persistedState()).length) {
      const storedState = persistedState();

      for (const parent of Object.keys(storedState)) {
        if (Object.keys(storedState[parent]).length) {
          await setState(parent, {
            ...storedState[parent],
          });
        }
      }
    }
  });

  const globalStateService = {
    store,
    getState,
    setState,
    getTokenDetails,
    getAuthDetails,
    getAccountDetails,
  };

  useContextProvider(BridgeStoreContext, globalStateService);
  return globalStateService;
};
