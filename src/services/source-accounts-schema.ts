import { z } from "@builder.io/qwik-city";

const integrationStates = ["managed", "failed", "outdated", "suspended"] as const;
export const integrationSchema = z.object({
  integrationID: z.string(),
  alias: z.string(),
  provider: z.string(),
  created: z.string(),
  lastModified: z.string(),
  state: z.enum(integrationStates),
  owner: z.string(),
  installationTarget: z.string(),
});

export type Integration = z.infer<typeof integrationSchema>;

export const repositorySchema = z.object({
  provider: z.string(),
  name: z.string(),
  owner: z.string(),
  repoURL: z.string(),
  description: z.string(),
  topics: z.array(z.string()),
});

export type Repository = z.infer<typeof repositorySchema>;
