/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
      colors: {
        slate: {
          350: '#cbd5e1', // Same as 300
          450: '#94a3b8', // Same as 400
          650: '#475569', // Same as 600
          850: '#1e293b', // slate-800 equivalent for good contrast
        },
        pga: {
          blue: '#01359a', // Corporate Blue
          'blue-hover': '#012873',
          'blue-light': '#e6edfa',
          gray: '#97a3ac', // Corporate Gray
          'gray-light': '#eef1f4',
          dark: '#0f172a', // Slate-900 for dark mode background
          'dark-card': '#1e293b', // Slate-800 for dark mode cards
          teal: '#0d9488', // Emerald/Teal for highlights (sustainability / GRS)
        }
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
