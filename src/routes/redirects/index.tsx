import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ redirect, query, pathname }) => {
  const event = query.get("event") || "";
  const path = pathname || "";

  const redirectURL =
    {
      SignUp: "/login",
      ResendCode: "/login",
      ForgotPassword: "/reset-password",
      SAML: `/login`,
      InvitationSignUp: `/register`,
      InvitationRequest: "/login",
      GithubInstallation: "/github/connect",
    }[event] || "";

  if (!path.includes(redirectURL)) {
    throw redirect(307, `${redirectURL}?${query}`);
  }
};
