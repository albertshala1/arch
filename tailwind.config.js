/** @type {import("tailwindcss").Config} */

const bridgeColors = {
  purple: {
    50: "#F1EBFF",
    100: "#DFD0FF",
    200: "#CDB6FE",
    300: "#B392F8",
    400: "#966CEF",
    500: "#8253E5",
    600: "#6F43CC",
    700: "#553599",
    800: "#3A2665",
    900: "#29203C",
  },
  blue: {
    50: "#DDF1FF",
    100: "#B6E0FF",
    200: "#A2D7FF",
    300: "#7BC6FF",
    400: "#54B6FF",
    500: "#199CFF",
    600: "#007EDD",
    700: "#0068B6",
    800: "#00528F",
    900: "#003B68",
  },
  orange: {
    50: "#FFE6CB",
    100: "#FFD9AF",
    200: "#FFC27D",
    300: "#FFB460",
    400: "#FFA139",
    500: "#FB8400",
    600: "#E97B00",
    700: "#C26600",
    800: "#AB5200",
    900: "#8E4400",
  },
  yellow: {
    50: "#FFF7E3",
    100: "#FFEFC7",
    200: "#FFDE8C",
    300: "#FFD365",
    400: "#FFC83E",
    500: "#FFB703",
    600: "#E2A202",
    700: "#C58E02",
    800: "#A97901",
    900: "#8C6400",
  },
};

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}", "./node_modules/flowbite/**/*.js"],
  theme: {
    colors: {
      ...bridgeColors,
      primary: bridgeColors["purple"],
    },
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
  darkMode: "class",
};
