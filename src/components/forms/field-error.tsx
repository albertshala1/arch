import { component$ } from "@builder.io/qwik";

type FieldErrorProps = {
  id: string;
  error: string;
};
export default component$(({ id, error }: FieldErrorProps) => {
  return (
    <>
      <p id={`${id}-error}`} class="error-text mt-2 text-sm">
        {error}
      </p>
    </>
  );
});
