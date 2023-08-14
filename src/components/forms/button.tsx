import type { PropFunction } from "@builder.io/qwik";
import { component$, Slot } from "@builder.io/qwik";

export type ButtonProps = {
  id: string;
  label: string;
  type?: "submit" | "button";
  size?: "xs" | "sm" | "md";
  variant?: "primary" | "link" | "outline";
  disabled?: boolean;
  customClass?: string;
  showIcon?: boolean;
  iconPlacement?: "left" | "right";
  preventDefaultClick?: boolean;
  onClick$?: PropFunction<() => unknown>;
};

export default component$(
  ({
    id,
    label,
    type = "button",
    size = "md",
    variant = "primary",
    disabled,
    customClass = "",
    showIcon = false,
    iconPlacement = "left",
    preventDefaultClick = false,
    onClick$,
    ...rest
  }: ButtonProps) => {
    const variantClass = {
      link: "btn-link",
      outline: "btn-outline",
      primary: "btn-default",
    }[variant];

    const sizeClass = {
      xs: "btn-xs",
      sm: "btn-sm",
      md: "btn-md",
    }[size];

    return (
      <button
        {...rest}
        id={id}
        type={type}
        disabled={disabled}
        class={`${variantClass} ${
          showIcon ? "inline-flex items-center justify-center" : ""
        } ${sizeClass} ${disabled ? "btn-disabled" : ""} ${customClass}`}
        preventdefault:click={preventDefaultClick}
        {...(onClick$ && {
          onClick$,
        })}
      >
        {showIcon && iconPlacement === "left" && (
          <div class="mr-2">
            <Slot />
          </div>
        )}
        {label}
        {showIcon && iconPlacement === "right" && (
          <div class="ml-2">
            <Slot />
          </div>
        )}
      </button>
    );
  }
);
