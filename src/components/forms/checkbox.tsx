import { component$, Slot } from "@builder.io/qwik";
import FieldError from "~/components/forms/field-error.tsx";

type CheckboxProps = {
  id: string;
  value: boolean | undefined;
  error: string;
  required?: boolean;
};
export default component$(({ id, value, error, required = false, ...props }: CheckboxProps) => {
  return (
    <div>
      <div class="flex items-start">
        <div class="flex h-5 items-center">
          <input
            {...props}
            id={id}
            type="checkbox"
            checked={value}
            required={required}
            class="h-4 w-4 rounded border border-gray-300 bg-gray-50 focus:ring-primary-300 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-primary-600"
          />
        </div>
        <div class="ml-3 text-sm">
          <label for={id} class="font-light text-gray-500 dark:text-gray-300">
            <Slot />
          </label>
        </div>
      </div>
      {error && <FieldError id={id} error={error} />}
    </div>
  );
});
