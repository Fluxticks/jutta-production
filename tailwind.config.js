/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custom: {
          cream: "#F9F6F3",
          blue: "#354569",
          powder: "#47607B",
          coral: "#FE6D73",
          grey: "#2E2D2C",
          ash: "#8B8B8B",
        },
      },
      fontFamily: {
        caveat: ["Caveat", "Cambria", "Segoe UI"],
        barlow: [
          "Barlow Condensed",
          "Bahnschrift",
          ...defaultTheme.fontFamily.sans,
        ],
      },
    },
  },
  plugins: [],
};
