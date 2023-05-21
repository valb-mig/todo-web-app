module.exports = {

  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors:{
      'white':      '#ffffff',
      'foreground': '#393939',
      'light-gray': '#2F2F2F',
      'gray':       '#242424',
      'gray-alt':   '#212121',
      'dark':       '#171717',
    },
    extend: {
      borderRadius: {
        'br-d': '5px',
      }
    }
  },

}