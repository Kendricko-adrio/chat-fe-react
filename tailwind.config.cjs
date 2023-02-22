/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,css,scss,sass,html}",
  ],
  theme: {
    colors: {
      'primary': '#F7F7F7',
      'secondary': '#FFB72B',
      'tertiary': '#FFE61B',
      'quaternary': '#B5FE83',
      'white': '#FFFFFF',
    },
    // colors: {
    //   'primary': '#FF7B54',
    //   'secondary': '#FFB26B',
    //   'tertiary': '#FFD56F',
    //   'quaternary': '#939B62',
    //   'white': '#FFFFFF',
    // },
    
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {},
  },
  plugins: [require('tailwind-scrollbar')],
}
