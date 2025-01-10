import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1f2031",
        secondary: "#e0ff5d",
        tertiary: "#7545db",
      },
      fontFamily: {
        lex: ["Lexend", "sans-serif"],
        ter: ["'Playwrite IS'", "serif"], // Add your font here
      },
    },
  },
  plugins: [],
} satisfies Config;
