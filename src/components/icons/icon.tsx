import { component$ } from "@builder.io/qwik";
import { getIconSizeClass, iconPaths } from "~/components/icons/helpers.ts";

export type IconProps = {
  name:
    | "user-circle-solid"
    | "user-add-solid"
    | "user-add-outline"
    | "user-remove-solid"
    | "user-remove-outline"
    | "user-edit-outline"
    | "users-group-outline"
    | "close-solid"
    | "arrow-down-tray-outline"
    | "arrow-repeat-outline"
    | "arrow-right-outline"
    | "chevron-down-outline"
    | "chevron-right-outline"
    | "chevron-left-outline"
    | "cog-outline"
    | "github-solid"
    | "window-solid"
    | "chart-mixed-outline"
    | "cloud-development-outline"
    | "check-circle-outline"
    | "close-circle-outline"
    | "plus-outline"
    | "address-book-outline"
    | "profile-card-outline"
    | "clipboard-check-outline"
    | "share-nodes-solid"
    | "envelope-outline"
    | "download-solid"
    | "rectangle-lines-solid"
    | "home-solid";
  size?: "xs" | "sm" | "md" | "lg";
  customClass?: string;
};
export default component$(({ name, size = "sm", customClass = "" }: IconProps) => {
  const sizeClass = getIconSizeClass(size);
  const { dValue, svgProps, pathProps } = iconPaths[name];

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-id={name}
      class={`${sizeClass} ${customClass}`}
      {...svgProps}
    >
      {dValue.map((d, i) => (
        <path key={i} d={d} {...pathProps} />
      ))}
    </svg>
  );
});
