import {
  fetchAPI,
  getBuildStageEndPoint,
  getTokenDetails,
  parseResponse,
} from "~/services/helper.ts";
import type { Role } from "~/services/roles-schema.ts";
import { roleSchema } from "~/services/roles-schema.ts";
import { filterMessage } from "~/utils/api-message-filter.ts";

export const rolesPageLimit = 50;
const getAllRoles = async () => {
  const rolesList: Role[] = [];
  const fetchRoles = async (cursor = "") => {
    const bridgeToken = await getTokenDetails("tokenID");
    const params = new URLSearchParams({
      limit: `${rolesPageLimit}`,
      cursor: cursor,
      rel: "next",
    }).toString();

    try {
      const { resp } = await fetchAPI({
        url: `${getBuildStageEndPoint("accounts")}/api/roles?${params}`,
        bridgeToken,
      });

      const isValidResponse = resp.roles && parseResponse(roleSchema, resp.roles[0]);

      if (isValidResponse) {
        const { roles = [], next = false } = resp;
        rolesList.push(...roles);
        if (next) {
          await fetchRoles(next);
        }

        return {
          roles: rolesList,
        };
      }
    } catch (error) {
      console.error("Error Fetching Roles: ", error);
      throw { message: filterMessage(error) };
    }
  };

  return fetchRoles();
};

export default { getAllRoles };
