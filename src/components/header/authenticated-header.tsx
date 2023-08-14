import { $, component$, useContext, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Link, useNavigate } from "@builder.io/qwik-city";
import { Auth } from "@aws-amplify/auth";
import { initFlowbite } from "flowbite";
import Button from "~/components/forms/button.tsx";
import Alert from "~/components/alert.tsx";
import Icon from "~/components/icons/icon.tsx";
import { BridgeStoreContext } from "~/context/global-context.tsx";
import BridgeDashboardLogo from "~/components/icons/bridge-logo-dashboard.svg";
import { revokeBridgeToken } from "~/services/tokens-service.ts";

type AuthenticateHeaderProps = {
  isCentered?: boolean;
};
export default component$(({ isCentered = false }: AuthenticateHeaderProps) => {
  const { getAuthDetails } = useContext(BridgeStoreContext);
  const {
    store: {
      auth: { user },
      accounts: { currentAccount, currentAccountID },
      tokens: { tokenID },
    },
    setState,
  } = useContext(BridgeStoreContext);
  const nav = useNavigate();
  const pageError = useSignal("");
  const isSamlUser = useSignal(false);

  useVisibleTask$(async () => {
    initFlowbite();

    const { isSamlUser: isSamlLogin } = await getAuthDetails();
    isSamlUser.value = isSamlLogin ?? false;
  });

  const handleLogOut = $(async () => {
    try {
      await Auth.signOut();
      await revokeBridgeToken(currentAccount, tokenID);
    } catch (error) {
      console.error("error signing out: ", error);
      pageError.value = `Error signing out: ${error}`;
    } finally {
      await setState("auth", { signOff: true }, async () => {
        await nav("/login");
      });
    }
  });

  return (
    <>
      <nav class="border-b border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
        <div
          class={`flex flex-wrap items-center justify-between ${
            isCentered ? "mx-auto max-w-7xl" : ""
          }`}
        >
          <div class="flex items-center justify-start">
            <Link href="/dashboard" class="flex items-center">
              <img src={BridgeDashboardLogo} class="h-10" alt="Bridgelogo" width="32" height="32" />
              <span class="self-center whitespace-nowrap text-2xl font-semibold uppercase text-gray-900 dark:text-white">
                Bridge
              </span>
            </Link>
          </div>
          <div class="flex items-center lg:order-2">
            <button
              type="button"
              class="mx-3 flex rounded-full dark:bg-gray-500 md:mr-0"
              id="user-menu-button"
              aria-expanded="false"
              data-dropdown-toggle="dropdown"
            >
              <span class="sr-only">Open user menu</span>
              <Icon name="user-circle-solid" size="md" />
            </button>
            {/*Dropdown menu */}
            <div
              class="z-50 my-4 hidden w-56 list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700"
              id="dropdown"
            >
              <section class="mb-2 block break-words px-4 py-3 text-sm text-gray-900 dark:text-white">
                {!isSamlUser.value && (
                  <>
                    <p class="font-semibold">Email:</p>
                    <span class="font-light">{user.email}</span>
                  </>
                )}
                {currentAccountID && (
                  <>
                    <p class="mt-3 font-semibold">Account ID:</p>
                    <span class="mb-2 font-light">{currentAccountID}</span>
                  </>
                )}
              </section>
              {currentAccountID && (
                <ul
                  class="py-1 font-light text-gray-500 dark:text-gray-400"
                  aria-labelledby="dropdown"
                >
                  <li>
                    <Link
                      href="/get-started"
                      class="block px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Get Started
                    </Link>
                  </li>
                </ul>
              )}
              <ul
                class="py-1 font-light text-gray-500 dark:text-gray-400"
                aria-labelledby="dropdown"
              >
                <li>
                  <Link
                    href="/profile"
                    class="block px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    My profile
                  </Link>
                </li>
                <li>
                  <Link
                    href="/account-selection"
                    class="block px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Account Selection
                  </Link>
                </li>
                {!isSamlUser.value && (
                  <li>
                    <Link
                      href="/account-setup"
                      class="block px-4 py-2 text-sm hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Account Setup
                    </Link>
                  </li>
                )}
              </ul>
              <ul
                class="py-1 font-light text-gray-500 dark:text-gray-400"
                aria-labelledby="dropdown"
              >
                <li>
                  <Button
                    id="log-out-link"
                    type="button"
                    variant="link"
                    label="Log out"
                    onClick$={handleLogOut}
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      {pageError.value && (
        <Alert id="authenticated-header-alert" type="error" hideAlert={!pageError.value}>
          {pageError.value}
        </Alert>
      )}
    </>
  );
});
