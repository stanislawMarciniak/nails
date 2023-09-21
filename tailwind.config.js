/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        xs: "380px",
      },
      colors: {
        firstColor: "#E1DDDD",
        secoundColor: "#927979",
        thirdColor: "#F4F4F4",
        fourthColor: "#C49494",
      },
    },
  },
  plugins: [],
};
