import { component$ } from "@builder.io/qwik";
import type { IconProps } from "~/components/icons/icon.tsx";
import Icon from "~/components/icons/icon.tsx";

export type StepperStep = {
  step: number;
  iconSize: IconProps["size"];
  iconName: IconProps["name"];
  completed: boolean;
  title: string;
  description: string;
};
export default component$(({ stepperState }: { stepperState: { steps: StepperStep[] } }) => {
  return (
    <ol class="relative ml-8 mt-10 border-l border-gray-200 text-gray-500 dark:border-gray-700 dark:text-gray-400">
      {stepperState.steps.map(({ step, iconSize, iconName, title, description, completed }) => {
        return (
          <li class="mb-16 ml-6" key={step}>
            <span
              class={`${
                completed
                  ? "bg-green-200 ring-4 ring-white dark:bg-green-900 dark:ring-gray-900"
                  : "bg-gray-100 ring-4 ring-white dark:bg-gray-700 dark:ring-gray-900"
              } absolute -left-4 flex h-8 w-8 items-center justify-center rounded-full`}
            >
              {completed ? (
                <Icon
                  name="check-circle-outline"
                  size={iconSize}
                  customClass="text-green-500 dark:text-green-400"
                />
              ) : (
                <Icon
                  name={iconName}
                  size={iconSize}
                  customClass="text-gray-500 dark:text-gray-500"
                />
              )}
            </span>
            <h4 class="font-medium leading-tight">{title}</h4>
            {description && <p class="text-sm">{description}</p>}
          </li>
        );
      })}
    </ol>
  );
});
