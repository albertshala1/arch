/**
 * Filter Bridge API Based Exceptions
 * @param resp
 */
// @ts-ignore
export const filterMessage = (resp) => {
  let filteredMessage;

  switch (resp?.code || resp?.message) {
    case "SamlInvalidAuthCode":
      filteredMessage =
        "Unable to authenticate, please ensure you have valid session with your SAML provider.";
      break;
    case "UserAlreadyJoined":
      filteredMessage = "This teammate has already joined this account.";
      break;
    case "UserAlreadyInvited":
      filteredMessage = "This teammate has already been invited to this account.";
      break;
    case "PendingDeletionAccountCannotJoin":
      filteredMessage = "Please wait at least 15 minutes before resending invitation";
      break;
    case "ResentInviteTooQuickly":
      filteredMessage = "Please wait at least 15 minutes before resending invitation";
      break;
    case "GithubInvalidInstallationId":
      filteredMessage =
        "Installation ID is incorrect. Please make sure you clicked the right link after installing Bridge app in the GitHub.";
      break;
    case "GithubAlreadyIntegrated":
      filteredMessage =
        "GitHub Integration can be connected to single Bridge account. Please delete any existing integrations before retrying.";
      break;
    case "InvalidIntegrationId":
      filteredMessage =
        "Repositories could not be fetched for this integration. Please check the status of Integration on GitHub Integrations page.";
      break;
    default:
      filteredMessage = resp?.message || "Something went wrong";
  }

  return filteredMessage;
};

export const samlTokenMessageFilter = (error: BridgeApiError) => {
  return filterMessage(
    error?.message?.includes("authentication code is not valid")
      ? { code: "SamlInvalidAuthCode" }
      : error
  );
};

export const sendInvitationMessageFilter = (error: BridgeApiError) => {
  const emailError = (error.response?.fields?.email ?? "") as string;
  return emailError.includes("user already exists")
    ? filterMessage({ code: "UserAlreadyJoined" })
    : emailError.includes("existing invitation")
    ? filterMessage({ code: "UserAlreadyInvited" })
    : "There was an error while sending the invite.";
};

export const updateInvitationMessageFilter = (error: BridgeApiError) => {
  const stateError = (error.response?.fields?.state ?? "") as string;
  return error.status === 400 && stateError && stateError.includes("pending deletion")
    ? filterMessage({ code: "PendingDeletionAccountCannotJoin" })
    : "There was an error updating the invitation state. Please try again later.";
};

export const resendInvitationMessageFilter = (error: BridgeApiError) => {
  return error.status === 429 && error?.message.includes("too many requests too quickly")
    ? filterMessage({ code: "ResentInviteTooQuickly" })
    : "There was an error resending the invitation. Please try again later.";
};

export const createIntegrationMessageFilter = (error: BridgeApiError) => {
  return error.status === 404
    ? filterMessage({ code: "GithubInvalidInstallationId" })
    : error?.message.includes("already been integrated")
    ? filterMessage({ code: "GithubAlreadyIntegrated" })
    : "There was error setting up the integration. Please try later.";
};

export const getRepositoriesMessageFilter = (error: BridgeApiError) => {
  const stateError = (error.response?.fields?.integrationID ?? "") as string;
  return error.status === 400 && stateError && stateError.includes("invalid")
    ? filterMessage({ code: "InvalidIntegrationId" })
    : "There was an error fetching the repositories for this integration. Please try again later.";
};
