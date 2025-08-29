/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@material-tailwind/react/components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@material-tailwind/react/theme/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pcea: {
          blue: '#232c67', // Deep blue
          red: '#e53935',  // Flame red
          gold: '#ffb300', // Gold/yellow
          black: '#222',
          white: '#fff',
        },
      },
    },
  },
  plugins: [],
};