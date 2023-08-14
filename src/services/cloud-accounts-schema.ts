import { z } from "@builder.io/qwik-city";

export const cloudAccountsSchema = z.object({
  id: z.string(),
  alias: z.string().optional(),
  roleARN: z.string(),
  created: z.string(),
  lastModified: z.string(),
  state: z.string(),
  parentStackName: z.string(),
  parentStackRegion: z.string(),
});

export type CloudAccounts = z.infer<typeof cloudAccountsSchema>;
