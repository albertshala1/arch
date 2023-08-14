import { z } from "@builder.io/qwik-city";

const invitationStates = ["accepted", "rejected", "invited", "revoked"] as const;

export const sentInvitationSchema = z.object({
  id: z.string(),
  email: z.string(),
  roleID: z.string(),
  state: z.enum(invitationStates),
  created: z.string(),
  lastModified: z.string(),
  lastSent: z.string(),
  expiry: z.string(),
  urn: z.string(),
});
export type SentInvitation = z.infer<typeof sentInvitationSchema>;

export const receivedinvitationSchema = sentInvitationSchema.extend({
  accountID: z.string(),
  accountAlias: z.string(),
  accountRegion: z.string(),
});

export type ReceivedInvitation = z.infer<typeof receivedinvitationSchema>;
