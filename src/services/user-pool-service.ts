import { fetchAPI, getBuildStageEndPoint } from "~/services/helper.ts";
import { stripNonUUID } from "~/utils/helpers.ts";

const getCognitoMfaResetCode = async (): Promise<{ code: string }> => {
  const proxyUrl = `${getBuildStageEndPoint("users")}/api/recoverycodes`;
  const { resp } = await fetchAPI({ url: proxyUrl });
  return resp;
};

const validateUserAccount = async (queryParams: URLSearchParams) => {
  const validationURL = `${getBuildStageEndPoint("uservalidation")}/validation?${queryParams}`;

  const validationConfirmation = await fetch(validationURL, {
    cache: "no-store",
    headers: { "api-version": "v1" },
  });
  const response = await validationConfirmation.json();
  if (!validationConfirmation.ok) {
    if (response.status === 400) {
      throw {
        code: "BadRequestMissingUserNameOrCode",
        message: response.message,
      };
    }
    const error =
      response?.state ?? `${validationConfirmation.status} - ${validationConfirmation.statusText}`;
    console.error(error);
    throw new Error(error);
  } else {
    return response;
  }
};

const deleteMfa = async (cognitoUserId: string, resetCode: string, sessionId: string) => {
  const disableMfaUrl = `${getBuildStageEndPoint("users")}/api/mfa/${cognitoUserId}`;
  const requestHeaders: HeadersInit = new Headers();
  requestHeaders.set("api-version", "v1");
  requestHeaders.set("Recovery-Code", stripNonUUID(resetCode));
  requestHeaders.set("Auth-Session", sessionId);

  const disabledMfa = await fetch(disableMfaUrl, {
    method: "DELETE",
    headers: requestHeaders,
  });

  if (!disabledMfa.ok) {
    const response = await disabledMfa.json();
    const error = `${disabledMfa.status} - ${disabledMfa.statusText}`;
    console.error(response);
    throw new Error(error);
  } else {
    return "success";
  }
};

export default {
  getCognitoMfaResetCode,
  validateUserAccount,
  deleteMfa,
};
