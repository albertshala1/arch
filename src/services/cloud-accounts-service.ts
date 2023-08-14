import { fetchAPI, getTokenDetails } from "~/services/helper.ts";
import type { CloudAccounts } from "~/services/cloud-accounts-schema.ts";

// TODO Need to get URL from API source
const baseURL = "https://cloudaccounts.us-1.alpha-bridge.cloud";

const getProviderCloudAccounts = async (
  cloudProvider: string = "aws"
): Promise<CloudAccounts[] | undefined> => {
  try {
    const bridgeToken = await getTokenDetails("tokenID");
    if (!bridgeToken) {
      console.error("Bridge Token missing...");
      return;
    }

    const { resp } = await fetchAPI({
      url: `${baseURL}/api/cloudaccounts/${cloudProvider}`,
      bridgeToken: bridgeToken,
    });

    return resp.cloudAccounts;
  } catch (errorResp: unknown) {
    // @ts-ignore
    const errorMessage: BridgeApiError = errorResp ? errorResp?.message : errorResp;
    console.error("Error Fetching Bridge Templates: ", errorMessage);
    throw errorMessage;
  }
};

interface CloudProviderTemplate {
  createStackURL: string;
  templateURL: string;
}

const getProviderTemplate = async (): Promise<CloudProviderTemplate | undefined> => {
  try {
    const bridgeToken = await getTokenDetails("tokenID");
    if (!bridgeToken) {
      console.error("Bridge Token missing...");
      return;
    }

    const params = new URLSearchParams({
      features: "beam",
    }).toString();

    const { resp } = await fetchAPI({
      url: `${baseURL}/api/cloudaccounts/aws/templates?${params}`,
      bridgeToken: bridgeToken,
    });

    return {
      createStackURL: resp.createStackURL,
      templateURL: resp.templateURL,
    };
  } catch (errorResp: unknown) {
    // @ts-ignore
    const errorMessage: BridgeApiError = errorResp ? errorResp?.message : errorResp;
    console.error("Error Fetching Bridge Templates: ", errorMessage);
    throw { message: errorMessage };
  }
};

const createProviderCloudAccount = async (
  cloudProvider: string = "aws",
  roleARN: string
): Promise<CloudAccounts[] | undefined> => {
  try {
    const bridgeToken = await getTokenDetails("tokenID");
    if (!bridgeToken) {
      console.error("Bridge Token missing...");
      return;
    }

    const { resp } = await fetchAPI({
      type: "POST",
      url: `${baseURL}/api/cloudaccounts/${cloudProvider}`,
      bridgeToken: bridgeToken,
      body: {
        roleARN: roleARN,
        features: "beam",
      },
    });

    return {
      // @ts-ignore
      cloudAccounts: resp.cloudAccounts,
    };
  } catch (errorResp: unknown) {
    // @ts-ignore
    const errorMessage: BridgeApiError = errorResp ? errorResp?.message : errorResp;
    console.error("Error Creating Cloud Provider: ", errorMessage);
    throw errorMessage;
  }
};

export default {
  getProviderTemplate,
  getProviderCloudAccounts,
  createProviderCloudAccount,
};
