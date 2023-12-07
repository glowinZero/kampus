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
        mainColor: {
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
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
