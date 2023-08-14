import type { PropFunction } from "@builder.io/qwik";
import { component$ } from "@builder.io/qwik";
import Alert from "~/components/alert.tsx";

type FormErrorProps = {
  id: string;
  message: string;
  actionLabel?: string;
  actionHandler?: PropFunction;
  hideError: boolean;
};
export default component$(
  ({
    id,
    message,
    actionLabel,
    actionHandler,
    hideError = true,
  }: FormErrorProps) => {
    return (
      <Alert
        id={id}
        type="error"
        isClosable={false}
        actionLabel={actionLabel}
        actionHandler={actionHandler}
        hideAlert={hideError}
        message={message}
      />
    );
  }
);
