/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      keyframes: {
        'modal-appear': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        'fadeIn': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'float': {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-20px)' }
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' }
        }
      },
      animation: {
        'modal-appear': 'modal-appear 0.2s ease-out',
        'fadeIn': 'fadeIn 0.6s ease-out',
        'float': 'float 7s ease-in-out infinite alternate',
        'pulse-slow': 'pulse-slow 3s cubic-bezier(0.4, 0, 0.6, 1) infinite'
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}