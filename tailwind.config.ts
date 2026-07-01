import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  corePlugins: {
    container: false,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-sans)"],
        heading: ["var(--font-heading)"],
      },
      keyframes: {
        "zoom-out": {
          from: { transform: "scale(1.06)" },
          to: { transform: "scale(1)" },
        },
        "fade-in-up": {
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "badge-pulse": {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "100%": { transform: "scale(1.08, 1.18)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translate(-50%, 0)" },
          "50%": { transform: "translate(-50%, -8px)" },
        },
        "fade-in": {
          to: { opacity: "1" },
        },
        "slide-down": {
          from: { opacity: "0", transform: "translateY(-10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "dropdown-slide": {
          from: { opacity: "0", transform: "translateY(-8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        spin: {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "autocomplete-spin": {
          "0%": { transform: "translateY(-50%) rotate(0deg)" },
          "100%": { transform: "translateY(-50%) rotate(360deg)" },
        },
        "location-fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "location-slide-up": {
          from: { transform: "translateY(32px) scale(0.96)", opacity: "0" },
          to: { transform: "translateY(0) scale(1)", opacity: "1" },
        },
        "location-shake": {
          "0%, 100%": { transform: "translateX(0)" },
          "15%": { transform: "translateX(-6px)" },
          "30%": { transform: "translateX(6px)" },
          "45%": { transform: "translateX(-4px)" },
          "60%": { transform: "translateX(4px)" },
          "75%": { transform: "translateX(-2px)" },
          "90%": { transform: "translateX(2px)" },
        },
      },
      animation: {
        "zoom-out": "zoom-out 16s ease-out forwards",
        "fade-in-up": "fade-in-up 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "badge-pulse": "badge-pulse 3s infinite",
        float: "float 2.5s ease-in-out infinite",
        "fade-in": "fade-in 1.5s ease-in forwards",
        "slide-down": "slide-down 0.3s ease-out",
        "dropdown-slide": "dropdown-slide 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
        spin: "spin 0.8s linear infinite",
        "autocomplete-spin": "autocomplete-spin 1s linear infinite",
        "location-fade-in": "location-fade-in 0.2s ease",
        "location-slide-up": "location-slide-up 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
        "location-shake": "location-shake 0.55s ease",
      },
    },
  },
  plugins: [],
};

export default config;
