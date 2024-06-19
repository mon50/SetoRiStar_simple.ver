import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          dark: "#0D2C3F",
          main: "#143E53",
          light: "#1A4F67",
        },
        secondary: {
          dark: "#A9E4D7",
          main: "#C5ECD6",
          light: "#DBF4EE",
        },
        tertiary: {
          dark: "#E0E0E0",
          main: "#F4F4F4",
          light: "#FFFFFF",
        },
      },
    },
  },
  plugins: [],
};
export default config;
