import { component$, Slot, useSignal } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";

import AuthenticatedHeader from "~/components/header/authenticated-header.tsx";
import Sidebar from "~/components/sidenav/sidenav.tsx";

export const onGet: RequestHandler = async ({ query, json, url, pathname, redirect }) => {
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

  if (pathname === "/redirect") {
    json(200, {
      event,
      url,
      pathname,
      test: event === "SignUp",
      test2: event.includes("SignUp"),
      test3: url.href.includes("SignUp"),
    });

    if (event === "SignUp") {
      throw redirect(307, `/login?eventSignUp`);
    }

    // const obj: Record<string, string> = {};
    // request.headers.forEach((v, k) => (obj[k] = v));
    // json(200, { headers: obj });

    // throw redirect(307, `${redirectURL}?${query}`);
  }
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

// const handleAuthBasedRedirect = async (
//   authState: BridgeStoreContextProps["auth"],
//   bridgeAccounts: BridgeStoreContextProps["accounts"],
//   nav: RouteNavigate,
//   loc: RouteLocation
// ) => {
//   const { accountsList, currentAccountID } = bridgeAccounts;
//   const isAuthenticatedRoute = authenticatedRoutes.some((url) => loc.url.pathname.includes(url));
//   const isRouteAccessible = isRouteAccessibleWithoutCurrentAccount(loc.url.pathname);
//   const { isAuthenticated, isSamlUser, samlTokenExpiry } = authState;
//
//   if (isAuthenticated && accountsList.length === 0) {
//     if (isSamlUser) {
//       return;
//     }
//
//     if (!loc.url.pathname.startsWith("/account-setup")) {
//       await nav("/account-setup");
//     }
//   }
//
//   if (isAuthenticated && accountsList.length > 0) {
//     if (isSamlUser && loc.url.pathname.startsWith("/account-setup")) {
//       await nav("/account-selection");
//     }
//
//     if (isRouteAccessible) {
//       return;
//     } else if (!currentAccountID) {
//       await nav("/account-selection");
//     }
//
//     if (isSamlUser) {
//       await updateSessionState({ isSamlUser, samlTokenExpiry });
//     }
//
//     const hasSourceAccountSetup = window.localStorage.getItem(storageKeys.SOURCE_ACCOUNT_SETUP);
//     if (hasSourceAccountSetup) {
//       await nav("/github/connect");
//     }
//   }
//
//   if (!isAuthenticated && isAuthenticatedRoute) {
//     await updateSessionState({ clearStoredState: true });
//     return await nav("/");
//   }
// };

export default component$(() => {
  const isCentered = useSignal(false);
  const isAuthenticated = useSignal(false);
  // const { setState, getAccountDetails, getAuthDetails } = useContext(BridgeStoreContext);

  const isAuthenticatedRoute = false;

  return (
    <div class="h-full">
      {isAuthenticated.value && isAuthenticatedRoute ? (
        <div class="grid h-full grid-cols-1 grid-rows-[minmax(auto,57px)_1fr] overflow-hidden">
          <header>
            <AuthenticatedHeader isCentered={isCentered.value} />
          </header>

          {!isCentered.value ? (
            <div class="grid h-full grid-cols-[auto_1fr] grid-rows-1 overflow-hidden">
              <aside id="sidebar">
                <Sidebar />
              </aside>

              <main class="w-full flex-1 flex-col space-y-4 overflow-auto bg-gray-50 p-4 dark:bg-gray-900">
                <Slot />
              </main>
            </div>
          ) : (
            <main class="h-full overflow-auto bg-gray-50 p-4 dark:bg-gray-900">
              <div class="mx-auto md:max-w-7xl">
                <Slot />
              </div>
            </main>
          )}
        </div>
      ) : (
        <Slot />
      )}
    </div>
  );
});
