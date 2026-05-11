import { addIconSelectors } from "@iconify/tailwind";

addIconSelectors;
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        casanova: ["Casanova", "sans-serif"],
      },
    },
  },
  plugins: [addIconSelectors(["mdi", "mdi-light"])],
};
