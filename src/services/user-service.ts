import {
  fetchAPI,
  getBuildStageEndPoint,
  getTokenDetails,
  parseResponse,
} from "~/services/helper.ts";
import type { User } from "~/services/user-schema.ts";
import { userSchema } from "~/services/user-schema.ts";
import { filterMessage } from "~/utils/api-message-filter.ts";

const usersPageLimit = 50;
const getAllUsers = async () => {
  const usersList: User[] = [];
  const fetchUsers = async (cursor = "") => {
    try {
      const bridgeToken = await getTokenDetails("tokenID");
      const params = new URLSearchParams({
        limit: `${usersPageLimit}`,
        cursor: cursor,
        rel: "next",
      }).toString();

      const { resp } = await fetchAPI({
        url: `${getBuildStageEndPoint("accounts")}/api/users?${params}`,
        bridgeToken,
      });

      const isValidResponse = resp.users && parseResponse(userSchema, resp.users[0]);

      if (isValidResponse) {
        const { users = [], next = false } = resp;
        usersList.push(...users);
        if (next) {
          await fetchUsers(next);
        }

        return {
          users: usersList,
        };
      }
    } catch (error) {
      console.error("Error Fetching Users: ", error);
      throw { message: filterMessage(error) };
    }
  };

  return fetchUsers();
};

const updateUser = async (userId: string, roleId: string) => {
  if (!userId || !roleId) {
    console.error("Missing required parameters for deleting user");
    return;
  }
  try {
    const bridgeToken = await getTokenDetails("tokenID");
    const apiUrl = `${getBuildStageEndPoint("accounts")}/api/users/${userId}`;
    const { resp } = await fetchAPI({
      url: apiUrl,
      type: "POST",
      body: { roleID: roleId },
      bridgeToken,
    });
    return resp;
  } catch (error) {
    console.error("Error Updating the User: ", error);
    throw { message: filterMessage(error) };
  }
};

const deleteUser = async (userId: string) => {
  if (!userId) {
    console.error("Missing required parameters for deleting user");
    return;
  }
  try {
    const bridgeToken = await getTokenDetails("tokenID");
    const apiUrl = `${getBuildStageEndPoint("accounts")}/api/users/${userId}`;
    const { resp } = await fetchAPI({
      url: apiUrl,
      type: "DELETE",
      bridgeToken,
    });
    return resp;
  } catch (error) {
    console.error("Error Deleting the User: ", error);
    throw { message: filterMessage(error) };
  }
};

export default { getAllUsers, updateUser, deleteUser };
