import { z } from "@builder.io/qwik-city";

const userStates = ["enabled"] as const;

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  roleID: z.string(),
  locale: z.string(),
  state: z.enum(userStates),
  mfaEnabled: z.boolean(),
  created: z.string(),
  lastModified: z.string(),
  lastActivity: z.string(),
  urn: z.string(),
});
export type User = z.infer<typeof userSchema>;
