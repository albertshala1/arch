import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import type { IconProps } from "~/components/icons/icon.tsx";
import Icon from "~/components/icons/icon.tsx";

export type SidenavItemType = {
  label: string;
  icon: IconProps["name"];
  link: string;
  subItems?: Omit<SidenavItemType, "subItems">[];
};

type SidenavItemProps = {
  item: SidenavItemType;
};
export default component$(({ item: { link, icon, label, subItems } }: SidenavItemProps) => {
  const isCollapsed = useSignal(false);
  const loc = useLocation();

  useVisibleTask$(({ track }) => {
    track(() => loc.url.pathname);

    if (subItems && subItems.length > 0) {
      isCollapsed.value = subItems.some(({ link }) => loc.url.pathname.startsWith(link));
    } else {
      isCollapsed.value = false;
    }
  });

  return (
    <li
      id={link}
      class={`${loc.url.pathname.startsWith(link) && !isCollapsed.value ? "active" : ""}`}
      key={`${label}-sidenav-item`}
      preventdefault:click={true}
    >
      {subItems ? (
        <>
          <button
            type="button"
            class="sidenav-item"
            aria-controls={`${label}-subitems`}
            data-collapse-toggle={`${label}-subitems`}
            preventdefault:click={true}
          >
            <Icon name={icon} size="md" />
            <span class="ml-3">{label}</span>
            <Icon name="chevron-down-outline" size="xs" customClass="ml-2" />
          </button>
          <ul
            id={`${label}-subitems`}
            class={`${isCollapsed.value ? "" : "hidden"} space-y-2 py-2`}
          >
            {subItems.map((subItem) => {
              const { label: subItemLabel, link: subItemLink, icon: subItemIcon } = subItem;

              return (
                <li
                  class={`${loc.url.pathname.startsWith(subItemLink) ? "active" : ""}`}
                  key={`${subItemLabel}-sidenav-item`}
                >
                  <Link href={subItemLink} class="sidenav-item pl-10">
                    <Icon name={subItemIcon} size="sm" />
                    <span class="ml-3">{subItemLabel}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </>
      ) : (
        <Link href={link} class="sidenav-item">
          <Icon name={icon} size="md" />
          <span class="ml-3">{label}</span>
        </Link>
      )}
    </li>
  );
});
