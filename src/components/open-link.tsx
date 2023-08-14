export const openLink = (url: string, openInNewTab = false) => {
  const newWindow = window.open(url, openInNewTab ? "_blank" : "_self", "noopener,noreferrer");
  if (newWindow?.opener) {
    newWindow.opener = null;
  }
};
