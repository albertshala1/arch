export const getIconSizeClass = (size = "sm") => {
  const height = {
    xs: "h-3",
    sm: "h-5",
    md: "h-6",
    lg: "h-8",
    xl: "h-10",
  }[size];
  const width = {
    xs: "w-3",
    sm: "w-5",
    md: "w-6",
    lg: "w-8",
    xl: "w-10",
  }[size];

  return `${height} ${width}`;
};

const defaultSvgProps = {
  solid: {
    fill: "currentColor",
  },
  outline: { fill: "none" },
};
const defaultPathProps = {
  solid: {},
  outline: {
    stroke: "currentColor",
    "stroke-width": "2",
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
  },
};

export const iconPaths = {
  "user-circle-solid": {
    dValue: [
      "M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z",
    ],
    svgProps: { ...defaultSvgProps.solid, viewBox: "0 0 20 20" },
    pathProps: defaultPathProps.solid,
  },
  "user-add-solid": {
    dValue: [
      "M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z",
    ],
    svgProps: { ...defaultSvgProps.solid, viewBox: "0 0 20 18" },
    pathProps: defaultPathProps.solid,
  },
  "user-add-outline": {
    dValue: [
      "M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-2V5a1 1 0 0 0-2 0v2h-2a1 1 0 1 0 0 2h2v2a1 1 0 0 0 2 0V9h2a1 1 0 1 0 0-2Z",
    ],
    svgProps: { ...defaultSvgProps.outline, viewBox: "0 0 20 18" },
    pathProps: defaultPathProps.outline,
  },
  "user-remove-solid": {
    dValue: [
      "M6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Zm11-3h-6a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2Z",
    ],
    svgProps: { ...defaultSvgProps.solid, viewBox: "0 0 20 18" },
    pathProps: defaultPathProps.solid,
  },
  "user-remove-outline": {
    dValue: [
      "M13 8h6m-9-3.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5 11h3a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z",
    ],
    svgProps: { ...defaultSvgProps.outline, viewBox: "0 0 20 18" },
    pathProps: defaultPathProps.outline,
  },
  "user-edit-outline": {
    dValue: [
      "M4.109 17H1v-2a4 4 0 0 1 4-4h.87M10 4.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm7.95 2.55a2 2 0 0 1 0 2.829l-6.364 6.364-3.536.707.707-3.536 6.364-6.364a2 2 0 0 1 2.829 0Z",
    ],
    svgProps: { ...defaultSvgProps.outline, viewBox: "0 0 20 18" },
    pathProps: defaultPathProps.outline,
  },
  "users-group-outline": {
    dValue: [
      "M4.333 6.764a3 3 0 1 1 3.141-5.023M2.5 16H1v-2a4 4 0 0 1 4-4m7.379-8.121a3 3 0 1 1 2.976 5M15 10a4 4 0 0 1 4 4v2h-1.761M13 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-4 6h2a4 4 0 0 1 4 4v2H5v-2a4 4 0 0 1 4-4Z",
    ],
    svgProps: { ...defaultSvgProps.outline, viewBox: "0 0 20 20" },
    pathProps: defaultPathProps.outline,
  },
  "close-solid": {
    dValue: [
      "m9.414 8 5.293-5.293a1 1 0 1 0-1.414-1.414L8 6.586 2.707 1.293a1 1 0 0 0-1.414 1.414L6.586 8l-5.293 5.293a1 1 0 1 0 1.414 1.414L8 9.414l5.293 5.293a1 1 0 0 0 1.414-1.414L9.414 8Z",
    ],
    svgProps: { ...defaultSvgProps.solid, viewBox: "0 0 16 16" },
    pathProps: defaultPathProps.solid,
  },
  "arrow-down-tray-outline": {
    dValue: ["M8 1v11m0 0 4-4m-4 4L4 8m11 4v3a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-3"],
    svgProps: { ...defaultSvgProps.outline, viewBox: "0 0 16 18" },
    pathProps: defaultPathProps.outline,
  },
  "arrow-repeat-outline": {
    dValue: ["m1 14 3-3m-3 3 3 3m-3-3h16v-3m2-7-3 3m3-3-3-3m3 3H3v3"],
    svgProps: { ...defaultSvgProps.outline, viewBox: "0 0 20 18" },
    pathProps: defaultPathProps.outline,
  },
  "arrow-right-outline": {
    dValue: ["M1 5h12m0 0L9 1m4 4L9 9"],
    svgProps: { ...defaultSvgProps.outline, viewBox: "0 0 14 10" },
    pathProps: defaultPathProps.outline,
  },
  "chevron-down-outline": {
    dValue: ["m1 1 4 4 4-4"],
    svgProps: { ...defaultSvgProps.outline, viewBox: "0 0 10 6" },
    pathProps: defaultPathProps.outline,
  },
  "chevron-right-outline": {
    dValue: ["m1 9 4-4-4-4"],
    svgProps: { ...defaultSvgProps.outline, viewBox: "0 0 6 10" },
    pathProps: defaultPathProps.outline,
  },
  "chevron-left-outline": {
    dValue: ["M5 1 1 5l4 4"],
    svgProps: { ...defaultSvgProps.outline, viewBox: "0 0 6 10" },
    pathProps: defaultPathProps.outline,
  },
  "cog-outline": {
    dValue: [
      "M19 11V9a1 1 0 0 0-1-1h-.757l-.707-1.707.535-.536a1 1 0 0 0 0-1.414l-1.414-1.414a1 1 0 0 0-1.414 0l-.536.535L12 2.757V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v.757l-1.707.707-.536-.535a1 1 0 0 0-1.414 0L2.929 4.343a1 1 0 0 0 0 1.414l.536.536L2.757 8H2a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h.757l.707 1.707-.535.536a1 1 0 0 0 0 1.414l1.414 1.414a1 1 0 0 0 1.414 0l.536-.535L8 17.243V18a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-.757l1.707-.708.536.536a1 1 0 0 0 1.414 0l1.414-1.414a1 1 0 0 0 0-1.414l-.535-.536.707-1.707H18a1 1 0 0 0 1-1Z",
      "M10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z",
    ],
    svgProps: { ...defaultSvgProps.outline, viewBox: "0 0 20 20" },
    pathProps: defaultPathProps.outline,
  },
  "github-solid": {
    dValue: [
      "M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z",
    ],
    svgProps: { ...defaultSvgProps.solid, viewBox: "0 0 20 20" },
    pathProps: { "fill-rule": "evenodd", "clip-rule": "evenodd" },
  },
  "window-solid": {
    dValue: [
      "M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-7.5 3a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2Zm-3 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2ZM2 16V8h16v8H2Z",
    ],
    svgProps: { ...defaultSvgProps.solid, viewBox: "0 0 20 18" },
    pathProps: {},
  },
  "chart-mixed-outline": {
    dValue: ["M1 12v5m5-9v9m5-5v5m5-9v9M1 7l5-6 5 6 5-6"],
    svgProps: { ...defaultSvgProps.outline, viewBox: "0 0 17 18" },
    pathProps: defaultPathProps.outline,
  },
  "cloud-development-outline": {
    dValue: [
      "M34 19.836c0 3.382-2.368 4.624-3.78 5.063l-.302-.94c1.404-.437 3.08-1.506 3.08-4.123 0-3.308-2.777-4.134-3.97-4.336a.494.494 0 01-.41-.564c-.102-1.477-.823-2.582-1.927-2.898-.91-.262-1.88.084-2.476.879a.51.51 0 01-.477.195.503.503 0 01-.4-.323c-.41-1.147-1.007-2.11-1.773-2.864-.94-.926-3.52-2.915-7.153-1.403-2.103.876-3.75 3.396-3.75 5.74 0 .264.016.525.046.78a.492.492 0 01-.373.537c-1.244.311-3.332 1.274-3.332 4.216 0 .096.003.191.007.284.094 1.891 1.513 3.519 3.45 3.956l-.224.96c-2.374-.534-4.113-2.538-4.227-4.869A5.978 5.978 0 016 19.795c0-3.369 2.316-4.614 3.674-5.053a6.938 6.938 0 01-.015-.48c0-2.755 1.875-5.612 4.36-6.648 2.914-1.211 6.002-.61 8.258 1.615a8.267 8.267 0 011.71 2.496 3.264 3.264 0 012.986-.634c1.44.414 2.404 1.718 2.618 3.517 1.412.324 4.409 1.46 4.409 5.228zm-5.503 11.352l-3.508 1.555.01-4.83 3.498-1.524v4.799zm-8.998-.046l-3.496 1.593V27.93l3.496-1.545v4.757zm-4-4.07l-3.301-1.438L15.5 24.15l3.284 1.469-3.285 1.452zm-4.021-.674L15 27.932v4.811l-3.522-1.565v-4.78zm8.507-10.106l3.276 1.435L20 19.175l-3.283-1.45 3.268-1.433zm1.234 9.338l3.268-1.48 3.29 1.475-3.278 1.428-3.28-1.423zm-.718.767l3.495 1.516-.01 4.821-3.485-1.592v-4.745zm3.483-3.107l-3.483 1.58v-4.837l3.483-1.545v4.802zm-7.983.002l-.01-4.805 3.508 1.547v4.823L16 23.292zm13.201 1.903l.005-.012-4.22-1.894v-5.565a.49.49 0 00-.23-.414c-.021-.014-.05-.014-.073-.024l.005-.012-4.5-1.971a.51.51 0 00-.409 0l-4.496 1.971.006.012c-.026.01-.053.01-.075.025a.491.491 0 00-.228.414l.01 5.568-4.23 1.899.006.012c-.023.01-.05.01-.07.024a.49.49 0 00-.228.413v5.855c0 .193.115.369.295.449l4.525 2.01.006-.012c.065.027.13.057.2.057a.495.495 0 00.21-.046L20 32l4.275 1.954.007-.013c.065.03.133.059.205.059a.51.51 0 00.206-.044l4.513-2.002a.492.492 0 00.295-.448v-5.874a.49.49 0 00-.229-.413c-.02-.014-.047-.014-.069-.024z",
    ],
    svgProps: { ...defaultSvgProps.outline, viewBox: "0 0 40 40" },
    pathProps: defaultPathProps.outline,
  },
  "check-circle-outline": {
    dValue: ["m7 10 2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"],
    svgProps: { ...defaultSvgProps.outline, viewBox: "0 0 20 20" },
    pathProps: defaultPathProps.outline,
  },
  "close-circle-outline": {
    dValue: ["m13 7-6 6m0-6 6 6m6-3a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"],
    svgProps: { ...defaultSvgProps.outline, viewBox: "0 0 20 20" },
    pathProps: defaultPathProps.outline,
  },
  "plus-outline": {
    dValue: ["M9 1v16M1 9h16"],
    svgProps: { ...defaultSvgProps.outline, viewBox: "0 0 18 18" },
    pathProps: defaultPathProps.outline,
  },
  "address-book-outline": {
    dValue: [
      "M4 4H1m3 4H1m3 4H1m3 4H1m6.071.286a3.429 3.429 0 1 1 6.858 0M4 1h12a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm9 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z",
    ],
    svgProps: { ...defaultSvgProps.outline, viewBox: "0 0 18 20" },
    pathProps: defaultPathProps.outline,
  },
  "profile-card-outline": {
    dValue: [
      "M3.656 12.115a3 3 0 0 1 5.682-.015M13 5h3m-3 3h3m-3 3h3M2 1h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1Zm6.5 4.5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z",
    ],
    svgProps: { ...defaultSvgProps.outline, viewBox: "0 0 20 16" },
    pathProps: defaultPathProps.outline,
  },
  "clipboard-check-outline": {
    dValue: [
      "M5 5h8m-1-3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1m6 0v3H6V2m6 0h4a1 1 0 0 1 1 1v15a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1h4m0 9.464 2.025 1.965L12 9.571",
    ],
    svgProps: { ...defaultSvgProps.outline, viewBox: "0 0 18 20" },
    pathProps: defaultPathProps.outline,
  },
  "share-nodes-solid": {
    dValue: [
      "M14.419 10.581a3.564 3.564 0 0 0-2.574 1.1l-4.756-2.49a3.54 3.54 0 0 0 .072-.71 3.55 3.55 0 0 0-.043-.428L11.67 6.1a3.56 3.56 0 1 0-.831-2.265c.006.143.02.286.043.428L6.33 6.218a3.573 3.573 0 1 0-.175 4.743l4.756 2.491a3.58 3.58 0 1 0 3.508-2.871Z",
    ],
    svgProps: { ...defaultSvgProps.solid, viewBox: "0 0 18 18" },
    pathProps: defaultPathProps.solid,
  },
  "envelope-outline": {
    dValue: [
      "m19 2-8.4 7.05a1 1 0 0 1-1.2 0L1 2m18 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1m18 0v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2",
    ],
    svgProps: { ...defaultSvgProps.outline, viewBox: "0 0 20 16" },
    pathProps: defaultPathProps.outline,
  },
  "download-solid": {
    dValue: [
      "M14.707 7.793a1 1 0 0 0-1.414 0L11 10.086V1.5a1 1 0 0 0-2 0v8.586L6.707 7.793a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 1.416 0l4-4a1 1 0 0 0-.002-1.414Z",
      "M18 12h-2.55l-2.975 2.975a3.5 3.5 0 0 1-4.95 0L4.55 12H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2Zm-3 5a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z",
    ],
    svgProps: { ...defaultSvgProps.solid, viewBox: "0 0 20 20" },
    pathProps: defaultPathProps.solid,
  },
  "rectangle-lines-solid": {
    dValue: [
      "M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM5 12a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0-3a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm10 6H9a1 1 0 0 1 0-2h6a1 1 0 0 1 0 2Zm0-3H9a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Zm0-3H9a1 1 0 0 1 0-2h6a1 1 0 1 1 0 2Z",
    ],
    svgProps: { ...defaultSvgProps.solid, viewBox: "0 0 20 16" },
    pathProps: defaultPathProps.solid,
  },
  "home-solid": {
    dValue: [
      "m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z",
    ],
    svgProps: { ...defaultSvgProps.solid, viewBox: "0 0 20 20" },
    pathProps: defaultPathProps.solid,
  },
};
