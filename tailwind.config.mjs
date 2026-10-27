/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#D4AF37",
          50: "#FBF5DD",
          100: "#F6EAB6",
          200: "#EBD37C",
          300: "#E0BD51",
          400: "#D4AF37",
          500: "#B8962B",
          600: "#8E7421",
        },
        ink: {
          900: "#000000",
          800: "#08080A",
          700: "#0E0E11",
          600: "#16161A",
          500: "#1C1C21",
        },
        bone: "#F4EFE6",
        // Light theme palette — warm porcelain & ink.
        porcelain: "#FAF8F3", // page base
        linen: "#FFFFFF", // pure white cards
        mist: "#F1ECE3", // alternating / card surface
        noir: "#1A1611", // warm near-black text
        line: "#E3DCCF", // hairline borders on light
      },
      fontFamily: {
        // Both resolve to the tokens in app/globals.css.
        display: ["var(--font-heading)"],
        sans: ["var(--font-text)"],
        brand: ["var(--font-brand)"],
      },
      letterSpacing: {
        widest2: "0.32em",
      },
    },
  },
  plugins: [],
};
