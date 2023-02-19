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
        primary: "#222435",
        light: "#FAFCFC",
        gray: "#EDF1F5",
        text: "#7B8EA1",
      },
    },
  },
  plugins: [],
};
