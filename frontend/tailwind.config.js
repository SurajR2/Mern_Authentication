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
        text: "var(--text)",
        background: "var(--background)",
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        "text-contrast": "var(--text-contrast)",
        "background-contrast": "var(--background-contrast)",
        "primary-contrast": "var(--primary-contrast)",
        "secondary-contrast": "var(--secondary-contrast)",
        "accent-contrast": "var(--accent-contrast)",
      },
    },
  },
  plugins: [],
};
