import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./sections/**/*.{ts,tsx}",
    "./pages/**/*.{ts,tsx}",
  ],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1280px",
      "2xl": "1536px",
      "3xl": "1920px",
    },
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
