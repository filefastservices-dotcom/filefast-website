/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0A1F3D",
          dark: "#06142A",
          light: "#15335C"
        },
        gold: {
          DEFAULT: "#C9A24B",
          light: "#E0C27E",
          dark: "#9E7C32"
        },
        silver: {
          DEFAULT: "#C7CCD3",
          light: "#F1F2F4",
          dark: "#8A929D"
        }
      },
      fontFamily: {
        display: ["var(--font-fraunces)", "serif"],
        body: ["var(--font-inter)", "sans-serif"]
      },
      backgroundImage: {
        "ledger-line": "linear-gradient(90deg, transparent, #C9A24B 20%, #C9A24B 80%, transparent)"
      }
    }
  },
  plugins: []
};
