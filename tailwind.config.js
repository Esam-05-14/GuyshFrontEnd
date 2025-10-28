/** @type {import('tailwindcss').Config} */
const rtl = require('tailwindcss-rtl');

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [rtl],
};
