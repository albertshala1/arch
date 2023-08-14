import type { PropFunction } from "@builder.io/qwik";
import { component$, Slot } from "@builder.io/qwik";
import Icon from "~/components/icons/icon.tsx";

type AlertProps = {
  id: string;
  type?: "info" | "error" | "warning" | "success";
  isClosable?: boolean;
  actionLabel?: string;
  actionHandler?: PropFunction;
  hideAlert?: boolean;
  message?: string;
};
export default component$(
  ({
    id,
    type = "info",
    isClosable = true,
    actionLabel,
    actionHandler,
    hideAlert = false,
    message,
  }: AlertProps) => {
    const wrapperClasses = {
      info: "alert-info",
      error: "alert-error",
      warning: "alert-warning",
      success: "alert-success",
    }[type];
    const actionButtonClasses = {
      info: "alert-info-action-btn",
      error: "alert-error-action-btn",
      warning: "alert-warning-action-btn",
      success: "alert-success-action-btn",
    }[type];
    const closeButtonClasses = {
      info: "alert-info-btn",
      error: "alert-error-btn",
      warning: "alert-warning-btn",
      success: "alert-success-btn",
    }[type];

    return (
      <div
        id={id}
        class={`alert ${wrapperClasses} ${hideAlert || !message ? "hidden" : ""}`}
        role="alert"
      >
        <div class="flex w-full flex-wrap justify-between gap-2">
          {/*TODO add (info/error/ warning) icon here*/}
          <span class="sr-only">{type}</span>
          <div class="mr-2 self-center text-sm font-medium">
            {message ? <>{message}</> : <Slot />}
          </div>
          {actionHandler && actionLabel && (
            <button
              type="button"
              class={`alert-action-btn ${actionButtonClasses}`}
              aria-label="Close"
              preventdefault:click={true}
              onClick$={actionHandler}
            >
              {actionLabel}
            </button>
          )}
        </div>
        {isClosable && (
          <button
            type="button"
            class={`alert-btn ${closeButtonClasses} ml-2`}
            data-dismiss-target={`#${id}`}
            aria-label="Close"
          >
            <span class="sr-only">Close</span>
            <Icon name="close-solid" />
          </button>
        )}
      </div>
    );
  }
);
