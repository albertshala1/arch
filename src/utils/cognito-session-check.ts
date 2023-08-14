import { Auth } from "@aws-amplify/auth";
import type { CognitoUserSession } from "amazon-cognito-identity-js";
import { persistCognitoToken } from "~/services/helper.ts";
import { clearSession } from "~/context/context-helpers.ts";

let currentAuthenticatedSessionTimer: number;
const defaultTimer = 180000; // 3 mins

const retries = {
  numOfRetries: 2,
  set value(num: number) {
    this.numOfRetries = num;
  },
  get value() {
    return this.numOfRetries;
  },
};

export async function refreshCognitoToken() {
  if (currentAuthenticatedSessionTimer) {
    clearTimeout(currentAuthenticatedSessionTimer);
  }

  try {
    // Get current cognito session
    const currentSession = await Auth.currentSession();
    if (currentSession) {
      retries.value = 2; // reset back to default value
      // eslint-disable-next-line no-console
      console.debug("Checking current Cognito Session...");
      // Get the ID Token's expiry value, the ID Token is valid for 1 hour, and will require a new idToken in order to continue
      // making successful API calls.
      // Compare idToken expiry against the current users browser time, in seconds
      const idTokenExpiresInSeconds = currentSession.getIdToken().getExpiration();
      const refreshToken = currentSession.getRefreshToken();
      const currentTimeInSeconds = Math.floor(Date.now() / 1000);
      const newExpiresTokenInSeconds = idTokenExpiresInSeconds - 5 * 60;

      // if idToken is about to expire (within 5 minutes before)
      if (currentTimeInSeconds >= newExpiresTokenInSeconds) {
        try {
          // Call the refreshSession method to retrieve a new idToken, using the current refresh token as a parameter
          const currentUser = await Auth.currentAuthenticatedUser();
          currentUser.refreshSession(refreshToken, (err: Error, session: CognitoUserSession) => {
            // if unable to get a new idToken, throw an error and log the user out
            if (err) {
              throw err;
            }
            // if successful, store the new idToken in bridge_state
            const freshIdToken = session.getIdToken().getJwtToken();
            persistCognitoToken(freshIdToken);
            // restart checking for expired idToken and/or refresh token
            currentAuthenticatedSessionTimer = window.setTimeout(refreshCognitoToken, defaultTimer);
            return freshIdToken;
          });
        } catch (e) {
          console.error("Error refreshing session ", e);
          await clearSession(true);
        }
      } else {
        // Session is good, keep checking it again.
        currentAuthenticatedSessionTimer = window.setTimeout(refreshCognitoToken, defaultTimer);
      }
    } else {
      // eslint-disable-next-line no-console
      console.log("No currentSession");
      await clearSession();
    }
  } catch (e) {
    console.error("Error getting current cognito session", e);
    if (!import.meta.hot) {
      await clearSession();
    }
  }
}
