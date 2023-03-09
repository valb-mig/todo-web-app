/** @type {import('tailwindcss').Config} **/

module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      colors:{
        'white':      '#ffffff',
        'foreground': '#393939',
        'light-gray': '#2F2F2F',
        'gray':       '#242424',
        'dark':       '#171717',
      },
      radius: {
        '4xl': '5px',
      }
    },
    plugins: [],
  }