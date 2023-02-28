/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: ['"Inter", sans-serif;'],
      },
      colors: {
        primaryBG: "#EDF1F5", //white
        titleTEXT: "#2d2d29", // dark black
        normalTEXT: "#7B8EA1", //gray
        accent: "#3480EA", //blue
      },
    },
  },
  plugins: [],
};
