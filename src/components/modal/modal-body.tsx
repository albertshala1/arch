import { component$, Slot } from "@builder.io/qwik";

export default component$(() => {
  return (
    <div class="p-6 text-gray-900 dark:text-white">
      <Slot />
    </div>
  );
});
