import {
  fetchAPI,
  getBuildStageEndPoint,
  getTokenDetails,
  parseResponse,
} from "~/services/helper.ts";
import { receivedinvitationSchema, sentInvitationSchema } from "~/services/invitation-schema.ts";
import type { ReceivedInvitation, SentInvitation } from "~/services/invitation-schema.ts";
import {
  filterMessage,
  resendInvitationMessageFilter,
  sendInvitationMessageFilter,
  updateInvitationMessageFilter,
} from "~/utils/api-message-filter.ts";

const invitationsPageLimit = 50;
const sendInvitations = async (email: string, roleId: string) => {
  if (!email || !roleId) {
    console.error("Missing required parameters for sending invitation");
    return;
  }

  try {
    const apiUrl = `${getBuildStageEndPoint("accounts")}/api/invitations`;
    const bridgeToken = await getTokenDetails("tokenID");

    const { resp } = await fetchAPI({
      url: apiUrl,
      type: "POST",
      body: { email, roleID: roleId },
      bridgeToken,
    });
    return resp;
  } catch (error) {
    console.error("Error Sending Invitation: ", error);
    const errorMsg = sendInvitationMessageFilter(error as BridgeApiError);
    throw { message: errorMsg };
  }
};

const getAllReceivedInvitations = async () => {
  const receivedInvitations: ReceivedInvitation[] = [];
  const fetchReceivedInvitations = async (cursor = "") => {
    try {
      const params = new URLSearchParams({
        limit: `${invitationsPageLimit}`,
        cursor: cursor,
        rel: "next",
      }).toString();

      const { resp } = await fetchAPI({
        url: `${getBuildStageEndPoint("accounts")}/api/invitations/received?${params}`,
      });

      const isValidResponse = !resp.invitations.length // empty invitation array is a valid response
        ? true
        : resp.invitations && parseResponse(receivedinvitationSchema, resp.invitations[0]);

      if (isValidResponse) {
        const { invitations = [], next = false } = resp;
        receivedInvitations.push(...invitations);
        if (next) {
          await fetchReceivedInvitations(next);
        }

        return {
          invitations: receivedInvitations,
        };
      }
    } catch (error) {
      console.error("Error Fetching Received Invitation: ", error);
      throw { message: filterMessage(error) };
    }
  };

  return fetchReceivedInvitations();
};

const updateReceivedInvitation = async (invitationId: string, state: string) => {
  if (!invitationId || !state) {
    console.error("Missing required parameters for updating received invitation");
    return;
  }
  try {
    const apiUrl = `${getBuildStageEndPoint("accounts")}/api/invitations/received/${invitationId}`;
    const { resp } = await fetchAPI({ url: apiUrl, type: "POST", body: { state } });
    return resp;
  } catch (error) {
    console.error("Error Updating the Invitation state: ", error);
    throw { message: updateInvitationMessageFilter(error as BridgeApiError) };
  }
};

const getAllSentInvitations = async () => {
  const sentInvitations: SentInvitation[] = [];
  const fetchSentInvitations = async (cursor = "") => {
    try {
      const bridgeToken = await getTokenDetails("tokenID");
      const params = new URLSearchParams({
        limit: `${invitationsPageLimit}`,
        cursor: cursor,
        rel: "next",
      }).toString();

      const { resp } = await fetchAPI({
        url: `${getBuildStageEndPoint("accounts")}/api/invitations/sent?${params}`,
        bridgeToken,
      });

      const isValidResponse = !resp.invitations.length // empty invitation array is a valid response
        ? true
        : resp.invitations && parseResponse(sentInvitationSchema, resp.invitations[0]);

      if (isValidResponse) {
        const { invitations = [], next = false } = resp;
        sentInvitations.push(...invitations);
        if (next) {
          await fetchSentInvitations(next);
        }

        return {
          invitations: sentInvitations,
        };
      }
    } catch (error) {
      console.error("Error Fetching Invitation: ", error);
      throw { message: filterMessage(error) };
    }
  };

  return fetchSentInvitations();
};

const revokeInvitation = async (invitationId: string) => {
  if (!invitationId) {
    console.error("Missing required parameters for revoking invitation");
    return;
  }
  try {
    const bridgeToken = await getTokenDetails("tokenID");
    const apiUrl = `${getBuildStageEndPoint("accounts")}/api/invitations/sent/${invitationId}`;
    const { resp } = await fetchAPI({
      url: apiUrl,
      type: "POST",
      body: { state: "revoked" },
      bridgeToken,
    });
    return resp;
  } catch (error) {
    console.error("Error Revoking the Invitation: ", error);
    throw { message: filterMessage(error) };
  }
};

const resendInvitation = async (invitationId: string) => {
  if (!invitationId) {
    console.error("Missing required parameters for revoking invitation");
    return;
  }
  try {
    const bridgeToken = await getTokenDetails("tokenID");
    const apiUrl = `${getBuildStageEndPoint("accounts")}/api/invitations/sent/${invitationId}`;
    const { resp } = await fetchAPI({
      url: apiUrl,
      type: "POST",
      body: {},
      bridgeToken,
    });
    return resp;
  } catch (error) {
    console.error("Error Resending the Invitation: ", error);
    throw { message: resendInvitationMessageFilter(error as BridgeApiError) };
  }
};

export default {
  sendInvitations,
  getAllReceivedInvitations,
  updateReceivedInvitation,
  getAllSentInvitations,
  revokeInvitation,
  resendInvitation,
};
