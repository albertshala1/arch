import { z } from "@builder.io/qwik-city";

export const roleSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  serviceRoleURNs: z.array(z.string()),
  created: z.string(),
  lastModified: z.string(),
  urn: z.string(),
});

export type Role = z.infer<typeof roleSchema>;
