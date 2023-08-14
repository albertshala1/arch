import type { PropFunction } from "@builder.io/qwik";
import { component$, Slot, useVisibleTask$ } from "@builder.io/qwik";
import { Drawer } from "flowbite";
import type { DrawerOptions } from "flowbite";
import Icon from "~/components/icons/icon.tsx";

type DrawerProps = {
  id: string;
  heading: string; //used to set aria-labelledby
  customClass?: string;
  options?: Omit<DrawerOptions, "onShow" | "onHide" | "onToggle">;
  onHide?: PropFunction;
  onShow?: PropFunction;
  onToggle?: PropFunction;
};

export default component$(
  ({ id, heading, customClass = "", options, onHide, onShow, onToggle }: DrawerProps) => {
    useVisibleTask$(
      () => {
        //Ref: https://flowbite.com/docs/components/drawer/#javascript-behaviour
        const $drawerElement = document.getElementById(id);
        if ($drawerElement) {
          const drawer = new Drawer($drawerElement, {
            ...options,
            onHide: () => {
              onHide && onHide();
            },
            onShow: () => {
              onShow && onShow();
            },
            onToggle: () => {
              onToggle && onToggle();
            },
          });

          if (window?.bridgeGlobal?.flowbite) {
            window["bridgeGlobal"]["flowbite"] = {
              ...window?.bridgeGlobal?.flowbite,
              [id]: drawer,
            };
          } else {
            window["bridgeGlobal"] = {
              flowbite: { [id]: drawer },
            };
          }
        } else {
          console.error(`Drawer #${$drawerElement} not rendered`);
        }
      },
      { strategy: "document-ready" }
    );

    return (
      <aside
        id={id}
        class={`fixed z-40 h-screen translate-x-full overflow-y-auto bg-white p-4 transition-transform dark:bg-gray-800 ${customClass}`}
        tabIndex={-1}
        aria-labelledby={`${id}-heading`}
      >
        <div class="inline-flex w-full items-center justify-between gap-12">
          <h4 id={`${id}-heading`}>{heading}</h4>
          <div
            class="cursor-pointer text-gray-500"
            onClick$={() => window?.bridgeGlobal?.flowbite?.[id].hide()}
          >
            <Icon name="close-solid" />
            <span class="sr-only">Close drawer</span>
          </div>
        </div>
        <Slot />
      </aside>
    );
  }
);
