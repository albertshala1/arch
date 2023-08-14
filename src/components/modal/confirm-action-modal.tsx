import type { PropFunction, QRL } from "@builder.io/qwik";
import { $, component$ } from "@builder.io/qwik";
import Button from "~/components/forms/button.tsx";
import FormError from "~/components/forms/form-error.tsx";
import Icon from "~/components/icons/icon.tsx";
import Loader from "~/components/loader.tsx";
import Modal from "~/components/modal/modal.tsx";

type ConfirmActionModalProps = {
  id: string;
  backdrop?: "static" | "dynamic";
  actionHandler: PropFunction;
  error?: string; //show in case the operation failed
  enableDynamicToggle?: boolean; // when true modalID from window.bridgeGlobal.flowbite will be used to hide the modal
  isUpdating?: boolean;
  updatingLabel?: string;
  confirmationMessage: string;
  onHideCallback?: QRL<(cb?: () => void) => Promise<void>>;
};

export const CloseIcon = component$(() => {
  return (
    <>
      <svg
        aria-hidden="true"
        class="h-5 w-5"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
          clip-rule="evenodd"
        ></path>
      </svg>
    </>
  );
});
export default component$(
  ({
    id,
    backdrop = "dynamic",
    actionHandler,
    error = "",
    enableDynamicToggle = false,
    isUpdating,
    updatingLabel = "",
    confirmationMessage,
    onHideCallback,
  }: ConfirmActionModalProps) => {
    const handleDismiss = $(() => window?.bridgeGlobal?.flowbite?.[id]?.hide());
    return (
      <Modal
        id={id}
        options={{ backdrop }}
        enableDynamicToggle={enableDynamicToggle}
        hideHeader={true}
        hideFooter={true}
        onHide={onHideCallback}
        modalFooterOptions={{ defaultView: false }}
      >
        <>
          <button
            type="button"
            class="modal-header-close-icon absolute right-2.5 top-3"
            {...(enableDynamicToggle ? { onClick$: handleDismiss } : { "data-modal-hide": id })}
          >
            <Icon name="close-solid" />
            <span class="sr-only">Close modal</span>
          </button>
          <div class="text-center">
            <div class="pt-6">
              <FormError id="disable-mfa-error" message={error} hideError={!error} />
            </div>
            {isUpdating && (
              <div class="flex min-h-[200px] w-full items-center justify-center">
                <Loader label={updatingLabel} size="md" />
              </div>
            )}
            {!error && !isUpdating && (
              <>
                <svg
                  aria-hidden="true"
                  class="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
                <h3 class="mb-8 text-lg font-normal text-gray-500 dark:text-gray-400">
                  {confirmationMessage}
                </h3>
                <div class="inline-flex items-center justify-center gap-4">
                  <Button
                    id={`${id}-action-btn`}
                    customClass="btn-warning-red w-auto"
                    label="Yes, I'm sure"
                    onClick$={actionHandler}
                  />
                  <Button
                    id={`${id}-dismiss-btn`}
                    type="button"
                    variant="outline"
                    customClass="w-auto"
                    onClick$={handleDismiss}
                    label="No, cancel"
                  />
                </div>
              </>
            )}
          </div>
        </>
      </Modal>
    );
  }
);
