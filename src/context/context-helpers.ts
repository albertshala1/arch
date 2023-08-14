import { Auth } from "@aws-amplify/auth";
import { storageKeys } from "~/utils/helpers.ts";
import { getCurrentTimeInSeconds } from "~/services/helper.ts";

export const authenticatedRoutes = [
  "dashboard",
  "profile",
  "onboarding",
  "account-selection",
  "account-setup",
  "get-started",
  "explorer",
  "applications",
  "admin",
  "aws",
  "github",
];

export const isRouteAccessibleWithoutCurrentAccount = (pathname: string) =>
  ["account-selection", "profile", "account-setup"].some((url) => pathname.includes(url));

let currentAuthenticatedSessionTimer: number;
const defaultTimer = 180000; // 3 mins

export const clearSession = async (timeout = false) => {
  try {
    await Auth.signOut();
  } catch (e) {
    console.error("Error clearing session");
  } finally {
    clearTimeout(currentAuthenticatedSessionTimer);
    window.localStorage.removeItem(storageKeys.BRIDGE_STATE);

    const url = new URL(`${location.origin}/login`);
    if (timeout) {
      url.searchParams.set("session-timeout", "true");
    }
    location.href = url.href;
  }
};

const checkSAMLTokenExpiry = async (samlTokenExpiresTimeStamp: number | undefined) => {
  if (!samlTokenExpiresTimeStamp) {
    // eslint-disable-next-line no-console
    console.log("Required SAML Expires Token missing");
    return undefined;
  }

  // eslint-disable-next-line no-console
  console.debug("Checking current SAML Session...");
  const newExpiresTokenInSeconds = samlTokenExpiresTimeStamp - 5 * 60;
  // Check SAML expires token against users current timestamp,
  // if current time is greater than SAML expires value, log SAML user out
  if (getCurrentTimeInSeconds() >= newExpiresTokenInSeconds) {
    clearTimeout(currentAuthenticatedSessionTimer);
    await clearSession(true);
  } else {
    currentAuthenticatedSessionTimer = window.setTimeout(
      checkSAMLTokenExpiry,
      defaultTimer,
      samlTokenExpiresTimeStamp
    );
  }
};

export const updateSessionState = async ({
  isSamlUser,
  samlTokenExpiry,
  clearStoredState,
}: {
  isSamlUser?: boolean;
  samlTokenExpiry?: number;
  clearStoredState?: boolean;
}): Promise<void> => {
  if (clearStoredState) {
    return window.localStorage.removeItem(storageKeys.BRIDGE_STATE);
  }

  if (isSamlUser) {
    await checkSAMLTokenExpiry(samlTokenExpiry);
  }
};
