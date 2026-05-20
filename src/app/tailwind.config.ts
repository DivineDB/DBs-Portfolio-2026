import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      colors: {
        bg: "#F8EDD1",
        text_primary: "#2A4756",
        text_muted: "rgba(1, 1, 1, 0.25)",
        accent_highlight: "#A2F991",
        about_body: "#4A5568",
      },
      fontFamily: {
        gilroyRegular: ["var(--font-gilroy-regular)", "sans-serif"],
        gilroyBold: ["var(--font-gilroy-bold)", "sans-serif"],
        satoshi: ["Satoshi", "sans-serif"],
        playfairDisplayItalic: ["var(--font-playfair-display)", "serif"],
      },
    },
  },
};

export default config;
