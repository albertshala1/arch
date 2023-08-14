import { component$ } from "@builder.io/qwik";

type RadioProps = {
  id: string;
  name: string;
  label?: string;
};
export default component$(({ id, name, label }: RadioProps) => {
  return (
    <>
      <input
        id={id}
        type="radio"
        value=""
        name={name}
        class="h-4 w-4 border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600"
      />
      <label
        for={id}
        class="ml-2 w-full py-4 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </>
  );
});
