/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          600: '#1D4ED8', 
          700: '#1E40AF', 
          800: '#1E3A8A',
        },
        secondary: {
          600: '#D97706', 
          700: '#B45309', 
          800: '#92400E', 
        },
      },
    },
  },
  plugins: [],
}
