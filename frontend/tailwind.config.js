/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          dark: '#0a0e27',
          darker: '#000000',
          accent: '#9333ea',
          accentDark: '#7c3aed',
          purple: '#9333ea',
          purpleDark: '#6b21a8',
          black: '#000000',
        }
      }
    },
  },
  plugins: [],
}

