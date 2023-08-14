import type { PropFunction } from "@builder.io/qwik";
import { component$, useVisibleTask$ } from "@builder.io/qwik";
import FieldError from "~/components/forms/field-error.tsx";

type InputFieldProps = {
  id: string;
  type: string;
  label?: string;
  value: string | number | undefined;
  error: string;
  customClass?: string;
  //below functions when InputField is used without Form as parent
  onInput$?: PropFunction;
  onBlur$?: PropFunction;
} & Partial<
  Pick<
    HTMLInputElement,
    "placeholder" | "required" | "disabled" | "readOnly" | "pattern" | "autocomplete" | "autofocus"
  >
>;

export default component$(
  ({
    id,
    type,
    label,
    placeholder = "",
    required = false,
    disabled = false,
    readOnly = false,
    autofocus,
    value,
    error,
    customClass = "",
    onInput$,
    onBlur$,
    ...props
  }: InputFieldProps) => {
    const customClassStyles = `${
      readOnly ? "input-read-only" : error ? "input-error" : "input-default"
    } ${customClass}`;

    useVisibleTask$(
      () => {
        if (autofocus) {
          setTimeout(() => {
            document?.getElementById(id)?.focus();
          }, 200);
        }
      },
      { strategy: "document-ready" }
    );

    return (
      <div>
        {label && (
          <label for={id} class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
            {label}
          </label>
        )}
        <input
          {...props}
          id={id}
          type={type}
          class={customClassStyles}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          required={required}
          readOnly={readOnly}
          autoFocus={autofocus}
          aria-invalid={!!error}
          aria-errormessage={`${id}-error`}
          onInput$={onInput$}
          onBlur$={onBlur$}
        />
        {error && <FieldError id={id} error={error} />}
      </div>
    );
  }
);
