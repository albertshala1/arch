import { $ } from "@builder.io/qwik";

/**
 * Filter Cognito Based Exceptions
 * @param resp
 */
// @ts-ignore
export const filterMessage = $((resp) => {
  let filteredMessage;

  switch (resp?.code || resp?.__type || resp?.message || resp?.name) {
    case "UserNotConfirmedException":
      filteredMessage = "Bridge user not confirmed.";
      break;
    case "PasswordResetRequiredException":
      filteredMessage = "Check your email for instructions on how to reset your password.";
      break;
    case "UserLambdaValidationException":
      filteredMessage = "Unable to sign-up at this time, please try again later.";
      break;
    case "UserNotFoundException":
      filteredMessage = "User not found";
      break;
    case "NotAuthorizedException":
      filteredMessage = "Incorrect email or password.";
      break;
    case "InvalidParameterException":
      filteredMessage = "One or more fields are invalid.";
      break;
    case "UsernameExistsException":
      filteredMessage = "The email address you provided is already in use.";
      break;
    case "CodeMismatchException":
      filteredMessage =
        "The one-time code you provided was incorrect. Please wait for the code on your app to change and try again.";
      break;
    case "ExpiredCodeException":
      filteredMessage =
        "Link has expired. Please request a new code by visiting Forgot Password page.";
      break;
    case "expired": // {state: 'expired' | 'invalid' } for expired verification email, refer validate-user-account.ts
    case "invalid":
      filteredMessage = "Link has expired. Please request a new email verification link.";
      break;
    case "BadRequestMissingUserNameOrCode":
      filteredMessage =
        "Please ensure that you have clicked the correct confirmation link or request a new link.";
      break;
    case "Confirmation code cannot be empty":
      filteredMessage =
        "Please ensure that you have clicked the correct confirmation link or request a new link.";
      break;
    case "IncorrectCurrentPassword":
      filteredMessage = "Please ensure that you have entered correct current password.";
      break;
    case "MfaSessionExpired":
      filteredMessage = "Session has expired, please re-login to authenticate with a new MFA code.";
      break;
    case "MfaResetSessionExpired":
      filteredMessage = "Session has expired, please re-login to disable MFA.";
      break;
    case "SamlInvalidAuthCode":
      filteredMessage =
        "Unable to authenticate, please ensure you have valid session with your SAML provider.";
      break;
    default:
      filteredMessage = resp instanceof Error ? resp.message : "Something went wrong";
  }

  return filteredMessage;
});

export const mfaLoginMessageFilter = async (error: CognitoErrorResp) => {
  const isSessionExpiredError =
    (error.code === "NotAuthorizedException" &&
      error.message.includes("session can only be used once")) ||
    error.message.includes("session is expired");

  const isTokenMismatch =
    error.code === "EnableSoftwareTokenMFAException" && error.message === "Code mismatch";

  return await filterMessage(
    isSessionExpiredError
      ? { code: "MfaSessionExpired" }
      : isTokenMismatch
      ? { code: "CodeMismatchException" }
      : error
  );
};

export const mfaResetMessageFilter = async (error: CognitoErrorResp) => {
  return await filterMessage(
    error?.message?.includes("Your authentication session is not valid")
      ? { code: "MfaResetSessionExpired" }
      : error
  );
};

export const enableMfaMessageFilter = async (error: CognitoErrorResp) => {
  return await filterMessage(
    error.code === "EnableSoftwareTokenMFAException" && error.message === "Code mismatch"
      ? { code: "CodeMismatchException" }
      : error
  );
};
