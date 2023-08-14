import type { PropFunction } from "@builder.io/qwik";
import { component$, Slot, useVisibleTask$ } from "@builder.io/qwik";
import type { ModalInterface, ModalOptions } from "flowbite";
import { Modal } from "flowbite";
import ModalBody from "~/components/modal/modal-body.tsx";
import type { ModalFooterOptions } from "~/components/modal/modal-footer.tsx";
import ModalFooter from "~/components/modal/modal-footer.tsx";
import ModalHeader from "~/components/modal/modal-header.tsx";

type ModalProps = {
  id: string;
  enableDynamicToggle?: boolean; // when true modalID from window.bridgeGlobal.flowbite will be used to hide the modal
  hideHeader?: boolean;
  hideFooter?: boolean;
  modalFooterOptions?: ModalFooterOptions;
  options?: Omit<ModalOptions, "onShow" | "onHide" | "onToggle">;
  onHide?: PropFunction;
  onShow?: PropFunction;
  onToggle?: PropFunction;
};

const initModal = ({ id, options, onHide, onToggle, onShow }: ModalProps) => {
  // Ref: https://flowbite.com/docs/components/modal/#javascript-behaviour
  const $modalElement: HTMLElement | null = document.querySelector(`#${id}`);

  if ($modalElement) {
    const modalOptions: ModalOptions = {
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
    };

    const modal: ModalInterface = new Modal($modalElement, modalOptions);
    if (window?.bridgeGlobal?.flowbite) {
      window["bridgeGlobal"]["flowbite"] = {
        ...window.bridgeGlobal.flowbite,
        [id]: modal,
      };
    } else {
      window["bridgeGlobal"] = {
        flowbite: { [id]: modal },
      };
    }
  } else {
    console.error(`Cannot find modal with id: ${id}`);
  }
};

export default component$(
  ({
    id,
    enableDynamicToggle = false,
    hideHeader = false,
    hideFooter = false,
    modalFooterOptions,
    options = { backdrop: "dynamic" },
    onHide,
    onToggle,
    onShow,
  }: ModalProps) => {
    useVisibleTask$(
      () => {
        initModal({ id, options, onHide, onToggle, onShow });
      },
      { strategy: "document-ready" }
    );

    return (
      <div
        id={id}
        tabIndex={-1}
        data-modal-backdrop={options.backdrop}
        aria-hidden="true"
        class="fixed inset-x-0 top-0 z-50 hidden h-[calc(100%-1rem)] max-h-full w-full overflow-y-auto overflow-x-hidden p-4 md:inset-0"
      >
        <div class="relative max-h-full w-full max-w-2xl">
          <div class="relative rounded bg-white shadow dark:bg-gray-700">
            {!hideHeader && (
              <ModalHeader id={id} enableDynamicToggle={enableDynamicToggle}>
                <Slot name="modal-header" />
              </ModalHeader>
            )}
            <ModalBody>
              <Slot />
            </ModalBody>
            {!hideFooter && (
              <ModalFooter
                id={id}
                enableDynamicToggle={enableDynamicToggle}
                options={modalFooterOptions}
              >
                <Slot name="modal-footer" />
              </ModalFooter>
            )}
          </div>
        </div>
      </div>
    );
  }
);
