import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { initFlowbite } from "flowbite";

export default component$(() => {
  useVisibleTask$(() => {
    initFlowbite();
  });
  return (
    <nav class="fixed left-0 top-0 z-20 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
      <div class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4 py-2">
        <Link href="/" class="flex items-center">
          <span class="self-center whitespace-nowrap text-2xl font-extralight uppercase text-purple-900 dark:text-white">
            Arch
          </span>
        </Link>
        <div class="flex md:order-2">
          <Link
            href="/login"
            class="mr-3 rounded bg-purple-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 md:mr-0"
          >
            Get started
          </Link>
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            class="inline-flex items-center rounded p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          class="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
          id="navbar-sticky"
        >
          <ul class="mt-4 flex flex-col rounded border border-gray-100 bg-gray-50 p-4 font-medium dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-800">
            <li>
              <a
                href="#"
                class="block rounded bg-purple-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 md:text-purple-700 md:dark:text-purple-500"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-purple-700 md:dark:hover:bg-transparent md:dark:hover:text-purple-500"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-purple-700 md:dark:hover:bg-transparent md:dark:hover:text-purple-500"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                class="block rounded py-2 pl-3 pr-4 text-gray-900 hover:bg-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-purple-700 md:dark:hover:bg-transparent md:dark:hover:text-purple-500"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
});
