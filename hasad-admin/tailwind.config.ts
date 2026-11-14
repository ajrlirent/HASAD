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
        hasad: {
          50: "#EAF6EC",
          100: "#CFEBD6",
          200: "#B9E3C6",
          300: "#8FD5A6",
          400: "#5DBB46",
          500: "#0A6B3A",
          600: "#01341D",
          700: "#0A5C33",
          800: "#024225",
          900: "#011F11",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
export default config;
