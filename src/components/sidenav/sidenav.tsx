import { component$, useVisibleTask$ } from "@builder.io/qwik";
import { initFlowbite } from "flowbite";
import type { SidenavItemType } from "~/components/sidenav/sidenav-item.tsx";
import SidenavItem from "~/components/sidenav/sidenav-item.tsx";
import SideNavToggle from "~/components/sidenav/sidenav-toggle.tsx";

const sideNavMainItems: SidenavItemType[] = [
  {
    label: "Dashboard",
    icon: "chart-mixed-outline",
    link: "/dashboard",
  },
  {
    label: "Explorer",
    icon: "share-nodes-solid",
    link: "/explorer",
  },
  {
    label: "Applications",
    icon: "window-solid",
    link: "/applications",
  },
  {
    label: "Integrations",
    icon: "arrow-repeat-outline",
    link: "/aws/accounts",
    subItems: [
      { label: "AWS", icon: "cloud-development-outline", link: "/aws/accounts" },
      { label: "GitHub", icon: "github-solid", link: "/github/integrations" },
    ],
  },
];

const sideNavSecondaryItems: SidenavItemType[] = [
  {
    label: "Administration",
    icon: "cog-outline",
    link: "/admin",
    subItems: [
      { label: "Users", icon: "users-group-outline", link: "/admin/users" },
      { label: "Invitations", icon: "envelope-outline", link: "/admin/invitations" },
    ],
  },
];

export default component$(() => {
  useVisibleTask$(() => {
    initFlowbite();
  });

  return (
    <aside
      id="sidenav-wrapper"
      aria-label="sidenav"
      class="flex h-full -translate-x-full transition-transform lg:translate-x-0"
    >
      <div id="sidenav" class="sidenav">
        <ul class="space-y-2">
          {sideNavMainItems.map((item, i) => (
            <SidenavItem key={`main-sidenav-item-${i}`} item={item} />
          ))}
        </ul>
        <ul class="mt-5 space-y-2 border-t border-gray-200 pt-5 dark:border-gray-700">
          {sideNavSecondaryItems.map((item, i) => (
            <SidenavItem key={`secondary-sidenav-item-${i}`} item={item} />
          ))}
        </ul>
      </div>
      <SideNavToggle />
    </aside>
  );
});
