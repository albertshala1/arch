import { getBuildStageEndPoint } from "~/services/helper.ts";

export const getSamlAuthToken = async (authCode = ""): Promise<Record<string, string>> => {
  if (authCode === "") {
    console.error("Error: Auth Code Missing");
    return {};
  }
  const samlTokensUrl = `${getBuildStageEndPoint("saml")}/api/tokens/${authCode}`;

  try {
    const response = await fetch(samlTokensUrl, {
      headers: {
        "api-version": "v1",
        "cache-control": "no-cache",
      },
      method: "POST",
    });

    const { access_token, expires, message } = await response.json();
    if (!response.ok || access_token === "") {
      throw new Error(message);
    }

    return {
      access_token,
      expires,
    };
  } catch (error) {
    console.error(error);
    // @ts-ignore
    const errMsg = error?.message ?? error;
    throw new Error(errMsg);
  }
};
