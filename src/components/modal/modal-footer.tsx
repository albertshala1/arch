import type { PropFunction } from "@builder.io/qwik";
import { $, component$, Slot } from "@builder.io/qwik";
import type { ButtonProps } from "~/components/forms/button.tsx";
import Button from "~/components/forms/button.tsx";

export type ModalFooterOptions = {
  defaultView?: boolean; // show primary button & dismiss button
  primaryBtn?: {
    label: string;
    type?: ButtonProps["type"];
    form?: string;
    disabled?: boolean;
    clickHandler?: PropFunction;
  };
  dismissBtnLabel?: string;
};

type ModalFooterProps = {
  id: string;
  enableDynamicToggle?: boolean; // when true modalID from window.bridgeGlobal.flowbite will be used to hide the modal
  options?: ModalFooterOptions;
};

export default component$(({ id, options, enableDynamicToggle = false }: ModalFooterProps) => {
  const handleDismiss = $(() => window?.bridgeGlobal?.flowbite?.[id]?.hide());
  const primaryBtn = options?.primaryBtn;
  const isDefaultView = options?.defaultView ?? true;

  return (
    <>
      {isDefaultView ? (
        <div class="flex items-center justify-end space-x-2 rounded-b border-t border-gray-200 px-6 py-2 dark:border-gray-600">
          <Button
            id={`${id}-primary-btn`}
            customClass="w-fit"
            label={primaryBtn?.label || ""}
            type={primaryBtn?.type}
            disabled={primaryBtn?.disabled}
            onClick$={primaryBtn?.clickHandler}
            {...{ form: primaryBtn?.form }}
          />
          {enableDynamicToggle ? (
            <Button
              id={`${id}-dismiss-btn`}
              variant="outline"
              label={options?.dismissBtnLabel || "Close"}
              onClick$={handleDismiss}
            />
          ) : (
            <Button
              id={`${id}-dismiss-btn`}
              data-modal-hide={id}
              variant="outline"
              label={options?.dismissBtnLabel || "Close"}
            />
          )}
        </div>
      ) : (
        <Slot />
      )}
    </>
  );
});
