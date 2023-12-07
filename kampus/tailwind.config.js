/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|snippet|code|input).js",
  ],
  theme: {
    screens: {
      'main': '1920px',

      'medium': '1680px',

      'small': '1440px',

    },
    extend: {
      backgroundImage: {
        background: "url('./assets/images/background.jpg')",
        loginPageBackground: "url('./assets/images/login-page-img.jpg')",
      },
      colors: {
        button: "#1f2d91",

        gradStart: "#0a2472",
        gradMiddle: "[#0A2472]/",
        gradEnd: "rgba(10,36,114,0.19931722689075626)",
        Color1: "#00072D",
        Color2: "#001C55",
        Color3: "#0A2472",
        Color4: "#0E6BA8",
        Color5: "#A6E1FA",
        ScaleColor1: {
          100: "#cccdd5",
          200: "#999cab",
          300: "#666a81",
          400: "#333957",
          500: "#00072d",
          600: "#000624",
          700: "#00041b",
          800: "#000312",
          900: "#000109",
        },
        ScaleColor2: {
          100: "#ccd2dd",
          200: "#99a4bb",
          300: "#667799",
          400: "#334977",
          500: "#001c55",
          600: "#001644",
          700: "#001133",
          800: "#000b22",
          900: "#000611",
        },
        ScaleColor3: {
          100: "#ced3e3",
          200: "#9da7c7",
          300: "#6c7caa",
          400: "#3b508e",
          500: "#0a2472",
          600: "#081d5b",
          700: "#061644",
          800: "#040e2e",
          900: "#020717",
        },
        ScaleColor4: {
          100: "#cfe1ee",
          200: "#9fc4dc",
          300: "#6ea6cb",
          400: "#3e89b9",
          500: "#0e6ba8",
          600: "#0b5686",
          700: "#084065",
          800: "#062b43",
          900: "#031522",
        },
        ScaleColor5: {
          100: "#edf9fe",
          200: "#dbf3fd",
          300: "#caedfc",
          400: "#b8e7fb",
          500: "#a6e1fa",
          600: "#85b4c8",
          700: "#648796",
          800: "#425a64",
          900: "#212d32",
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
