import type { RequestHandler } from "@builder.io/qwik-city";

export const onGet: RequestHandler = async ({ query, url, pathname, redirect }) => {
  const event = query.get("event") || "";
  const path = pathname || "";

  // eslint-disable-next-line no-console
  console.log("searchParams: ", url);

  // @ts-ignore
  // if (url.href.includes("SignUp")) {
  //   // json(200, { event, url, pathname });
  //   throw redirect(307, `/login?urlHrefInclucdes`);
  // }

  if (event === "test") {
    // json(200, { event, url, pathname });
    throw redirect(307, `/login?eventSignUp`);
  }

  if (event.includes("SignUp")) {
    // json(200, { event, url, pathname });
    throw redirect(307, `/login?${query}`);
  }

  // if (pathname === "/") {
  //   // json(200, {
  //   //   event,
  //   //   url,
  //   //   pathname,
  //   //   test: event === "SignUp",
  //   //   test2: event.includes("SignUp"),
  //   //   test3: url.href.includes("SignUp"),
  //   // });
  //
  //   if (event === "SignUp") {
  //     throw redirect(307, `/login?eventSignUp`);
  //   }
  //
  //   // const obj: Record<string, string> = {};
  //   // request.headers.forEach((v, k) => (obj[k] = v));
  //   // json(200, { headers: obj });
  //
  //   // throw redirect(307, `${redirectURL}?${query}`);
  // }
  // cacheControl({
  //   // Always serve a cached response by default, up to a week stale
  //   staleWhileRevalidate: 60 * 60 * 24 * 7,
  //   // Max once every 5 seconds, revalidate on the server to get a fresh version of this page
  //   maxAge: 5,
  // });

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
