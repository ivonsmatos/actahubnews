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
        "primary-blue": "#2C5273",
        "accent-yellow": "#F29F05",
        "accent-orange": "#D93D04",
        "neutral-light": "#D9D9D9",
        "neutral-dark": "#0D0D0D",
        "bg-white": "#FFFFFF",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Merriweather", "Georgia", "serif"],
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "#0D0D0D",
            "--tw-prose-headings": "#2C5273",
            "--tw-prose-links": "#2C5273",
            "--tw-prose-bold": "#0D0D0D",
            "--tw-prose-counters": "#2C5273",
            "--tw-prose-bullets": "#2C5273",
            "--tw-prose-quotes": "#2C5273",
            "--tw-prose-quote-borders": "#F29F05",
            "--tw-prose-captions": "#6B7280",
            "--tw-prose-code": "#D93D04",
            "--tw-prose-th-borders": "#D9D9D9",
            "--tw-prose-td-borders": "#D9D9D9",
            maxWidth: "75ch",
            h2: {
              scrollMarginTop: "5rem",
            },
            h3: {
              scrollMarginTop: "5rem",
            },
            a: {
              textDecoration: "underline",
              textUnderlineOffset: "3px",
              "&:hover": {
                color: "#F29F05",
              },
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
