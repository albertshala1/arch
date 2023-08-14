import type { SentInvitation } from "~/services/invitation-schema.ts";
import type { Role } from "~/services/roles-schema.ts";
import type { Integration } from "~/services/source-accounts-schema.ts";
import type { User } from "~/services/user-schema.ts";

export const storageKeys = {
  BRIDGE_STATE: "bridge_state",
  TIMESTAMP: "timestamp_b",
  UI_PREFERENCES: "bridge_ui_preferences",
  SOURCE_ACCOUNT_SETUP: "bridge_source_account_setup",
};

export const DEPLOYMENT_TARGET = import.meta.env.NODE_ENV || "development";

export const recaptchaKey = {
  development: "6LeF77UmAAAAAGhfFFHJYp3BR76nqikOHjKZ6FR8",
  alpha: "6LeF77UmAAAAAGhfFFHJYp3BR76nqikOHjKZ6FR8",
  stage: "6LfJ07kmAAAAAHTxDCMAxkXvTZ7gLPglm8rRFsD6",
  prod: "6Lcy1rkmAAAAAFIOHTzjlw8ZJe8n8mCbor7oX7if",
};

export const supportedLocale = [{ id: "en", value: "English" }];
export const getLang = () => {
  const browserLang = navigator.languages[0] || navigator.language;
  return supportedLocale.some((locale) => locale.id === browserLang) ? browserLang : "en";
};
export const getLangDisplayValue = (lang: string) => {
  return supportedLocale.find((locale) => locale.id === lang);
};

export const defaultRoles = [
  { id: "full-access", name: "Full Access" },
  { id: "read-only", name: "Read Only" },
] as Role[];

/** Remove non-uuid characters from a string. Only allow alphanumeric + '-' + '_'  */
export function stripNonUUID(str: string): string {
  return str.replace(/[^a-zA-Z0-9-_]+/gi, "");
}

export const getTheme = () => {
  const storedTheme = uiPreferenceState.get("theme");
  return !storedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : storedTheme || "light";
};

export const uiPreferenceState = {
  rememberMe: false,
  email: "",
  theme: "light",

  // SETTERS/GETTERS
  get: function (key = "") {
    const storedState = JSON.parse(window.localStorage.getItem(storageKeys.UI_PREFERENCES) || "{}");
    return storedState[key];
  },
  set: function (key = "", value: unknown) {
    const storedState = JSON.parse(window.localStorage.getItem(storageKeys.UI_PREFERENCES) || "{}");
    window.localStorage.setItem(
      storageKeys.UI_PREFERENCES,
      JSON.stringify({ ...storedState, [key]: value })
    );
  },
};

export const delay = (delayUntil: number): Promise<ReturnType<typeof setTimeout> | unknown> => {
  return new Promise((resolve, reject) => {
    if (isNaN(delayUntil)) {
      return reject(new Error("Parameter must be a number"));
    }
    setTimeout(resolve, delayUntil);
  });
};

export const getInvitationState = (state: SentInvitation["state"]) => {
  return {
    accepted: "Accepted",
    rejected: "Rejected",
    invited: "Invited",
    revoked: "Revoked",
  }[state];
};

export const getUserState = (state: User["state"]) => {
  return {
    enabled: "Active",
    disabled: "Inactive",
  }[state];
};

export const getRoleName = (rolesList: Role[], roleId: string) =>
  rolesList.find((role) => role.id === roleId)?.name ?? roleId;

export const sourceAccountState = {
  event: "",
  installationId: "",

  getStoredState: function () {
    return JSON.parse(window.localStorage.getItem(storageKeys.SOURCE_ACCOUNT_SETUP) || "{}");
  },
  // SETTERS/GETTERS
  get: function (key = "") {
    return this.getStoredState()[key];
  },
  set: function (key = "", value: unknown) {
    const storedState = this.getStoredState();
    window.localStorage.setItem(
      storageKeys.SOURCE_ACCOUNT_SETUP,
      JSON.stringify({ ...storedState, [key]: value })
    );
  },
  delete: function () {
    window.localStorage.removeItem(storageKeys.SOURCE_ACCOUNT_SETUP);
  },
};

export const getProviderName = (provider: string) => {
  return (
    {
      github: "GitHub",
    }[provider] || provider
  );
};

export const getIntegrationState = (state: Integration["state"]) => {
  return (
    {
      managed: {
        state: "Managed",
        classes: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
      },
      failed: {
        state: "Failed",
        classes: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300",
      },
      outdated: {
        state: "Outdated",
        classes: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300",
      },
      suspended: {
        state: "Suspended",
        classes: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300",
      },
    }[state] || { state: state, classes: "" }
  );
};
