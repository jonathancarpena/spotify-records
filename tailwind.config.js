/** @type {import('tailwindcss').Config} */

/* 
 Spotify Color Palette 
 Green - #1ED760
Hover: #2A2A2A
Active: #5A5A5A

Menu: #282828
Menu Hover: #3E3E3E
 
*/


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
        dark: {
          main: '#121212',
          mainHover: '#2A2A2A',
          mainActive: '#5A5A5A',
          menu: '#282828',
          menuHover: '#3e3e3e'
        },

        accent: {
          500: '#1CCC5B'
        }
      }
    },
  },
  plugins: [],
}
