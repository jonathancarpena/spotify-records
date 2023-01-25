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
  darkMode: "class",
  theme: {
    extend: {

      fontFamily: {
        main: ['Plus Jakarta Sans', 'ui-sans-serif', 'system-ui']
      },
      fontSize: {
        '2xs': ['0.65rem', {
          lineHeight: '0.75rem',
        }],
      },
      colors: {
        dark: {
          main: '#121212',
          mainHover: '#2A2A2A',
          mainActive: '#5A5A5A',
          menu: '#282828',
          menuHover: '#3e3e3e',
          secondary: '#a7a7a7'
        },
        light: {
          main: '#F6F6F6',
          mainHover: '#D6D6D6',
          mainActive: '#A5A5A5',
          menu: '#D7D7D7',
          menuHover: '#C3C3C3',
          secondary: '#595959'
        },

        accent: {
          500: '#1CCC5B'
        }
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true })
  ],

}
