/** @type {import('tailwindcss').Config} */
const flowbite = require('flowbite-react/tailwind');
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    flowbite.content(),
  ],
  theme: {
    extend: {},
  },
  plugins: [flowbite.plugin()],
    
  images: {
    unoptimized: true,
  },
}

