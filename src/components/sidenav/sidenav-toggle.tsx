import { $, component$, useOn, useSignal } from "@builder.io/qwik";
import Icon from "~/components/icons/icon.tsx";

export default component$(() => {
  const isExpanded = useSignal(true);

  useOn(
    "click",
    $(() => {
      const sidenav = document.getElementById("sidenav");
      if (isExpanded.value) {
        sidenav?.classList.add("collapsed");
        sidenav?.classList.remove("expanded");
      } else {
        sidenav?.classList.add("expanded");
        sidenav?.classList.remove("collapsed");
      }
      isExpanded.value = !isExpanded.value;
    })
  );

  const positionClass = isExpanded.value ? "right-2" : "left-2";

  return (
    <button
      id="toggle-sidenav-button"
      aria-controls="sidenav"
      type="button"
      class={`${positionClass} absolute bottom-2 inline-flex cursor-pointer rounded-full bg-white p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-900 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
    >
      {isExpanded.value ? (
        <Icon name="chevron-left-outline" />
      ) : (
        <Icon name="chevron-right-outline" />
      )}
    </button>
  );
});
