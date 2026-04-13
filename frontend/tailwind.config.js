/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'Segoe UI', 'sans-serif'],
        display: ['"Source Serif 4"', 'Georgia', 'serif'],
      },
      boxShadow: {
        soft: '0 18px 40px -24px rgba(15, 23, 42, 0.35)',
      },
    },
  },
  plugins: [],
}
