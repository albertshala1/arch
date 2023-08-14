import { component$ } from "@builder.io/qwik";
import Icon from "~/components/icons/icon.tsx";

type DownloadFileLink = {
  payload: Record<string, unknown> | string;
  linkName?: string;
  fileName?: string;
  fileType?: string;
  customClass?: string;
};
export default component$(
  ({
    payload = {},
    linkName = "Download",
    fileName,
    fileType = "text/plain",
    customClass = "",
  }: DownloadFileLink) => {
    if (!Object.keys(payload).length) {
      console.error("Missing payload parameter");
      return null;
    }

    const ext: string = fileType.split("/")[1] === "plain" ? "txt" : fileType.split("/")[1];
    const formattedPayload =
      ext === "json" ? encodeURIComponent(JSON.stringify(payload)) : (payload as string);

    return (
      <a
        href={`data: ${fileType};charset=utf-8,${formattedPayload}`}
        download={`${fileName || Date.now()}.${ext}`}
        class={`btn-link ${customClass}`}
      >
        <div class="mr-4">
          <Icon name="arrow-down-tray-outline" size="sm" />
        </div>
        {linkName}
      </a>
    );
  }
);
