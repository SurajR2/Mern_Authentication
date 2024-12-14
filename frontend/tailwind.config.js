/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sawer: ["Sawer", "sans-serif"],
        kaisei: ["Kaisei Decol", "serif"],
      },
      colors: {
        primary: "var(--primary)",
        "primary-hover": "var(--primary-hover)",
        secondary: "var(--secondary)",
        "secondary-hover": "var(--secondary-hover)",
        "text-contrast": "var(--text-contrast)",
        "dark-text-contrast": "var(--dark-text-contrast)",
        background: "var(--background)",
        "dark-background": "var(--dark-background)",
      },
    },
  },
  plugins: [],
};
