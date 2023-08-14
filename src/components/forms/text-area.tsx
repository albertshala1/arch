import type { PropFunction } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import FieldError from "~/components/forms/field-error.tsx";

type TextAreaProps = {
  id: string;
  label: string;
  value: string | number | undefined;
  error: string;
  customClass?: string;
  //below functions when TextArea is used without Form as parent
  onInput$?: PropFunction;
} & Partial<
  Pick<HTMLTextAreaElement, "rows" | "placeholder" | "required" | "disabled" | "readOnly">
>;
export default component$(
  ({
    id,
    label,
    rows = 4,
    placeholder = "",
    required = false,
    disabled = false,
    readOnly = false,
    value,
    error,
    customClass = "",
    onInput$,
    ...props
  }: TextAreaProps) => {
    return (
      <div>
        <label for={id} class="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
          {label}
        </label>
        <textarea
          {...props}
          id={id}
          rows={rows}
          class={`${customClass} focus:outline-none ${
            readOnly ? "input-read-only" : error ? "input-error" : "input-default"
          }`}
          placeholder={placeholder}
          disabled={disabled}
          value={value}
          required={required}
          readOnly={true}
          aria-invalid={!!error}
          aria-errormessage={`${id}-error`}
          onInput$={onInput$}
        />
        {error && <FieldError id={id} error={error} />}
      </div>
    );
  }
);
