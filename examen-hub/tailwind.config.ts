import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "ui-serif", "Georgia", "serif"],
      },
      colors: {
        ink: {
          50: "#f5f6f8",
          100: "#eceef2",
          200: "#d6dae2",
          300: "#b2b9c6",
          400: "#8892a4",
          500: "#646f83",
          600: "#4c566a",
          700: "#3a4355",
          800: "#252c3a",
          900: "#171c26",
          950: "#0e121a",
        },
        brand: {
          50: "#eef3ff",
          100: "#dce6ff",
          200: "#b9ccff",
          300: "#8aa9fb",
          400: "#5d82f2",
          500: "#3b5fe0",
          600: "#2c47c4",
          700: "#25399d",
          800: "#22337d",
          900: "#1f2d63",
        },
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,40,.04), 0 1px 3px rgba(16,24,40,.06)",
        lift: "0 8px 24px -8px rgba(16,24,40,.18)",
      },
    },
  },
  plugins: [],
};
export default config;
