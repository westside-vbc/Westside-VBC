import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0D1B2A",
        secondary: "#F4B942",
        accent: "#3A86FF",
        neutral: "#FFFFFF",
        background: "#F6F8FA",
      },
    },
  },
  plugins: [],
};
export default config;