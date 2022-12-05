/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        main: ['Signika', 'sans-serif']
      },
      colors: {
        light: {
          100: '#fbfbf7',
          200: '#f7f6ef',
          300: '#f4f2e7',
          400: '#f0eddf',
          500: '#ece9d7',
          600: '#bdbaac',
          700: '#8e8c81',
          800: '#5e5d56',
          900: '#2f2f2b',
        },
        accent: {
          500: '#1CCC5B'
        }
      }
    },
  },
  plugins: [],
}
