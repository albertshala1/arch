import { $, component$, Slot } from "@builder.io/qwik";
import Icon from "~/components/icons/icon.tsx";

type ModalHeaderProps = {
  id: string;
  enableDynamicToggle?: boolean; // when true modalID from window.bridgeGlobal.flowbite will be used to hide the modal
};

export default component$(({ id, enableDynamicToggle = false }: ModalHeaderProps) => {
  const handleDismiss = $(() => window?.bridgeGlobal?.flowbite?.[id].hide());

  return (
    <div class="flex items-start justify-between rounded-t border-b px-6 py-4 dark:border-gray-600">
      <Slot />
      <button
        type="button"
        class="modal-header-close-icon"
        {...(enableDynamicToggle ? { onClick$: handleDismiss } : { "data-modal-hide": id })}
      >
        <Icon name="close-solid" />
        <span class="sr-only">Close modal</span>
      </button>
    </div>
  );
});
