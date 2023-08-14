interface Window {
  bridgeGlobal: { flowbite: any };
  grecaptcha: { reset: Function };
  handleRecaptchaCallback?: Function;
}

type CognitoErrorResp = { code: string; message: string };

type BridgeApiError = {
  status: number;
  message: string;
  response?: { message: string; fields: Record<string, unknown> };
};

type DeploymentTarget = "development" | "alpha" | "stage" | "prod";
