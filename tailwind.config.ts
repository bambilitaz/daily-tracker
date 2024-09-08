/** @type {import('tailwindcss').Config} */
export default {
  content: [
    'app.vue',
    'error.vue',
    './constants/**/*.{js,vue,ts}',
    './components/**/*.{js,vue,ts}',
    './features/**/*.{js,vue,ts}',
    './containers/**/*.{js,vue,ts}',
    './layouts/**/*.{js,vue,ts}',
    './pages/**/*.{js,vue,ts}',
    './error.{js,vue,ts}',
    './utils/**/*.{js,vue,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['IBM Plex Sans ThaiPrompt', 'sans-serif'],
        ibm: ['IBM Plex Sans Thai', 'sans-serif'],
      },
      colors: {
        main: {
          DEFAULT: '#2A669F',
          50: '#E4F7F8',
          100: '#CCEEF2',
          200: '#9CD7E5',
          300: '#6CB9D8',
          400: '#3B94CB',
          500: '#2A669F',
          600: '#234B83',
          700: '#1B3366',
          800: '#14204A',
          900: '#0C102E',
          950: '#080A20',
        },
        cool: {
          DEFAULT: '#667084',
          50: '#F9FAFB',
          100: '#F7F7F7',
          200: '#D0D5DD',
          300: '#C2C6CE',
          400: '#858D9D',
          500: '#667084',
          600: '#525A6A',
          700: '#3D434F',
          800: '#101828',
          900: '#0A0B0D',
        },
      },
    },
  },
}
