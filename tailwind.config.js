import colors from 'tailwindcss/colors'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    colors: {
      ...colors,
      primary: {
        dark: '#1D1E1F',
      },
      secondary: {
        dark: '#0A0B0B',
      },
      golden: '#FADE4B',
    },
    extend: {},
  },
  plugins: [],
}
