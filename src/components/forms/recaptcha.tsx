import { component$, useContext, useStore, useVisibleTask$ } from "@builder.io/qwik";
import type { FormStore } from "@modular-forms/qwik";
import { setValue } from "@modular-forms/qwik";
import FieldError from "~/components/forms/field-error.tsx";
import { BridgeStoreContext } from "~/context/global-context.tsx";
import { DEPLOYMENT_TARGET, getTheme, recaptchaKey } from "~/utils/helpers.ts";

type RecaptchaProps = {
  id: string;
  form: FormStore<any, undefined>;
  fieldName: string;
  error: string;
};

export default component$(({ id, form, fieldName, error }: RecaptchaProps) => {
  const { getAuthDetails } = useContext(BridgeStoreContext);
  const recaptchaState = useStore({
    theme: "light",
    locale: "en",
  });

  useVisibleTask$(async ({ cleanup }) => {
    recaptchaState.theme = getTheme();
    const {
      user: { locale },
    } = await getAuthDetails();
    recaptchaState.locale = locale ?? recaptchaState.locale;

    // recaptchaCallback needs to be a global function
    window.handleRecaptchaCallback = (recaptcha: string) => {
      setValue(form, fieldName, recaptcha);
    };

    cleanup(() => delete window["handleRecaptchaCallback"]);
  });

  const recaptchaSiteKey = recaptchaKey[DEPLOYMENT_TARGET as DeploymentTarget];
  return (
    <div>
      <div
        // eslint-disable-next-line tailwindcss/no-custom-classname
        class="g-recaptcha"
        data-sitekey={recaptchaSiteKey}
        data-theme={recaptchaState.theme}
        data-callback="handleRecaptchaCallback"
        // @ts-ignore
        hl={recaptchaState.locale}
      />
      <script src="https://www.google.com/recaptcha/api.js" async defer></script>
      {error && <FieldError id={id} error={error} />}
    </div>
  );
});
