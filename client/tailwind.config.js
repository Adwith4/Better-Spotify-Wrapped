/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        'spotify-black': '#191414',
        'spotify-green': '#1DB954',
        'spotify-white': '#FFFFFF',
        'spotify-gray': '#535353',
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-spotify': 'linear-gradient(to bottom, #191414, #000000)',
      },
    },
  },
  plugins: [],
}
