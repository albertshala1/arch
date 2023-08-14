import type { PropFunction } from "@builder.io/qwik";
import { $, component$, useStore, useVisibleTask$ } from "@builder.io/qwik";
import { initDropdowns } from "flowbite";
import Button from "~/components/forms/button.tsx";
import FieldError from "~/components/forms/field-error.tsx";
import Icon from "~/components/icons/icon.tsx";

type DropdownMenuOption = { name: string; id: string };
type DropDownMenuProps = {
  id: string;
  label?: string;
  placeholder?: string;
  selectedItem?: DropdownMenuOption;
  error: string;
  options: Array<DropdownMenuOption>;
  onChange$: PropFunction;
  toggleCustomClass?: string;
  optionsCustomClass?: string;
  disabled?: boolean;
};

export default component$(
  ({
    id = "",
    label = "",
    options = [{ name: "", id: "" }],
    onChange$,
    placeholder = "",
    selectedItem,
    error,
    disabled = false,
    toggleCustomClass = "",
    optionsCustomClass = "",
  }: DropDownMenuProps) => {
    const selectedMenuOption = useStore<DropdownMenuOption>({ name: "", id: "" });

    useVisibleTask$(() => {
      initDropdowns();
    });

    const handleChange = $(async (selectedOption: DropdownMenuOption) => {
      if (!selectedItem?.id) {
        // use internal state if selectedItem is not passed
        selectedMenuOption.name = selectedOption.name;
        selectedMenuOption.id = selectedOption.id;
      }
      return onChange$(selectedOption);
    });

    return (
      <div>
        {label && (
          <label
            for={`${id}-toggle`}
            class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >
            {label}
          </label>
        )}
        <button
          id={`${id}-toggle`}
          data-dropdown-toggle={`${id}-menu`}
          disabled={disabled}
          class={`dropdown-toggle ${toggleCustomClass}`}
          type="button"
        >
          <div class="mr-auto">{selectedItem?.name || selectedMenuOption.name || placeholder}</div>
          <Icon size="xs" name="chevron-down-outline" />
        </button>
        <div id={`${id}-menu`} class={`dropdown-menu hidden ${optionsCustomClass}`}>
          <ul
            class={`w-full py-2 text-sm text-gray-700 dark:text-gray-200 `}
            aria-labelledby={`${id}-toggle`}
          >
            {options.map((value) => (
              <li key={`${value.name}-menu-item`}>
                <Button
                  id={`${id}-btn`}
                  label={value.name}
                  disabled={disabled}
                  variant="link"
                  onClick$={() => handleChange(value)}
                />
              </li>
            ))}
          </ul>
        </div>
        {error && <FieldError id={id} error={error} />}
      </div>
    );
  }
);
