import { z } from "@builder.io/qwik-city";

export const stateProps: accountState = "active" || "pending-deletion";
export const accountStateTypes = z.enum(["active", "pending-deletion"]);
export type accountState = z.infer<typeof accountStateTypes>;

export const accountsInterfaceSchema = z.object({
  id: z.string(),
  alias: z.string(),
  locale: z.string(),
  region: z.string(),
  state: accountStateTypes,
  created: z.string(),
  lastModified: z.string(),
  urn: z.string(),
  mfaRequired: z.boolean(),
  links: z.array(
    z.object({
      rel: z.string(),
      href: z.string(),
      method: z.string(),
    })
  ),
  roleID: z.string(),
});

export const createAccountSchema = accountsInterfaceSchema.omit({ roleID: true });

export type AccountSchema = z.infer<typeof accountsInterfaceSchema>;

export const bridgeAccountProps: AccountSchema = {
  id: "",
  alias: "",
  locale: "",
  region: "",
  state: stateProps,
  created: "",
  lastModified: "",
  urn: "",
  mfaRequired: false,
  links: [
    {
      rel: "",
      href: "",
      method: "",
    },
  ],
  roleID: "",
};

export const regionsSchema = z.object({
  type: z.string(),
  state: z.object({
    regions: z.array(
      z.object({
        id: z.string(),
        name: z.string(),
      })
    ),
  }),
  errorMessage: z.string().optional(),
});

export type RegionsSchemaType = z.infer<typeof regionsSchema>;

/**
 * Schema used for the returned getAllAccounts payload
 */
export const accountReturnedState = z.object({
  type: z.string(),
  state: z.object({
    accounts: z.object({
      accountsList: z.array(accountsInterfaceSchema),
      currentAccount: accountsInterfaceSchema,
      previousAccount: accountsInterfaceSchema.optional(),
      currentAccountID: accountsInterfaceSchema.shape.id,
      roleID: accountsInterfaceSchema.shape.roleID,
    }),
    tokens: z.object({
      tokenID: z.string(),
      previousToken: z.string().optional(),
      expires: z.string(),
    }),
    pathTo: z.string(),
  }),
});

export type AccountListSchema = z.infer<typeof accountReturnedState>;
