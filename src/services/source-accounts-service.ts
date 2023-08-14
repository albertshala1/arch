import {
  fetchAPI,
  getAccountRegion,
  getBuildStageEndPoint,
  getRequestSearchParams,
  getTokenDetails,
  parseResponse,
} from "~/services/helper.ts";
import { integrationSchema, repositorySchema } from "~/services/source-accounts-schema.ts";
import type { Integration, Repository } from "~/services/source-accounts-schema.ts";
import {
  createIntegrationMessageFilter,
  filterMessage,
  getRepositoriesMessageFilter,
} from "~/utils/api-message-filter.ts";

const sourceAccountsPageLimit = 25;
const getAllIntegrations = async (provider: string) => {
  const integrationsList: Integration[] = [];
  const fetchIntegrations = async (provider = "github", cursor = "") => {
    try {
      const bridgeToken = await getTokenDetails("tokenID");
      const region = getAccountRegion();
      const baseUrl = getBuildStageEndPoint(`sourceaccounts.${region}`);
      const params = getRequestSearchParams(sourceAccountsPageLimit, cursor);

      const { resp } = await fetchAPI({
        url: `${baseUrl}/api/integrations/${provider}?${params}`,
        bridgeToken,
      });

      const isValidResponse = !resp.integrations.length // empty source accounts array is a valid response
        ? true
        : resp.integrations && parseResponse(integrationSchema, resp.integrations[0]);

      if (isValidResponse) {
        const { integrations = [], next = false } = resp;
        integrationsList.push(...integrations);
        if (next) {
          await fetchIntegrations(provider, next);
        }

        return {
          integrations: integrationsList,
        };
      }
    } catch (error) {
      console.error("Error Fetching Integrations: ", error);
      throw { message: filterMessage(error) };
    }
  };

  return fetchIntegrations(provider);
};

type CreateIntegrationParams = { provider?: string; installationId: string; alias: string };
const createIntegration = async ({
  provider = "github",
  installationId,
  alias,
}: CreateIntegrationParams) => {
  if (!provider || !installationId || !alias) {
    console.error("Missing required parameters for creating integration");
    return;
  }

  try {
    const bridgeToken = await getTokenDetails("tokenID");
    const region = getAccountRegion();
    const baseUrl = getBuildStageEndPoint(`sourceaccounts.${region}`);

    const { resp } = await fetchAPI({
      url: `${baseUrl}/api/integrations/${provider}`,
      type: "POST",
      body: { alias, installationID: installationId },
      bridgeToken,
    });
    return resp;
  } catch (error) {
    console.error("Error setting up integration: ", error);
    const errorMsg = createIntegrationMessageFilter(error as BridgeApiError);
    throw { message: errorMsg };
  }
};

const deleteIntegration = async (integrationId: string) => {
  if (!integrationId) {
    console.error("Missing required parameters for deleting integration");
    return;
  }

  try {
    const bridgeToken = await getTokenDetails("tokenID");
    const region = getAccountRegion();
    const baseUrl = getBuildStageEndPoint(`sourceaccounts.${region}`);

    const { resp } = await fetchAPI({
      url: `${baseUrl}/api/integrations/${integrationId}`,
      type: "DELETE",
      bridgeToken,
    });
    return resp;
  } catch (error) {
    console.error("Error setting up integration: ", error);
    const errorMsg = filterMessage(error as BridgeApiError);
    throw { message: errorMsg };
  }
};

const getAllRepositories = async (integrationId: string) => {
  if (!integrationId) {
    console.error("Missing required parameters for getting repositories");
    return;
  }
  const repositoriesList: Repository[] = [];
  const fetchRepositories = async (integrationId: string, cursor = "") => {
    try {
      const bridgeToken = await getTokenDetails("tokenID");
      const region = getAccountRegion();
      const baseUrl = getBuildStageEndPoint(`sourceaccounts.${region}`);
      const params = getRequestSearchParams(sourceAccountsPageLimit, cursor);

      const { resp } = await fetchAPI({
        url: `${baseUrl}/api/integrations/${integrationId}/repositories?${params}`,
        bridgeToken,
      });

      const isValidResponse = !resp.repositories.length // empty source accounts array is a valid response
        ? true
        : resp.repositories && parseResponse(repositorySchema, resp.repositories[0]);

      if (isValidResponse) {
        const { repositories = [], next = false } = resp;
        repositoriesList.push(...repositories);
        if (next) {
          await fetchRepositories(integrationId, next);
        }

        return {
          repositories: repositoriesList,
        };
      }
    } catch (error) {
      console.error("Error Fetching Integrations: ", error);
      throw { message: getRepositoriesMessageFilter(error as BridgeApiError) };
    }
  };

  return fetchRepositories(integrationId);
};

export default { getAllIntegrations, createIntegration, deleteIntegration, getAllRepositories };
