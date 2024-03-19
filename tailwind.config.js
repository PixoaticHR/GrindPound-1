/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'banner1': "url('./Banner.png')",
       }),
      fontFamily: {
         'articulat': ['Articulat CF', 'sans-serif'],
      },
      backgroundColor:{
        'banner': ['#1C1243'],
      },
      colors: {
        'header': ['#1C1243'],
      },
      borderColor:{
        'backgroundB':['#A29EB6'],
        'backgroundF': ['#643FDB'],
      }
    }
  },
  plugins: [],
}