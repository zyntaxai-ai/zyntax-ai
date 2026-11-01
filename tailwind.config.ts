import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: "#0B0F19",
        navy: {
          800: "#1F2937",
          900: "#111827",
        },
        emerald: {
          500: "#10B981",
        },
        cyan: {
          500: "#06B6D4",
        },
        amber: {
          500: "#F59E0B",
        },
      },
    },
  },
  plugins: [],
};
export default config;
