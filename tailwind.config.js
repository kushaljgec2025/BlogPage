/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        new: '30px 30px 60px #b1b1b1',
        new1: '-30px -30px 60px #ffffff'
      },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        'white': '#f1f5f9',
        'black': '#0f172a',
        'blue': '#0ea5e9',
        'gray': '#475569'
      },
    },
  },
  plugins: [],
}

