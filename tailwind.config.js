/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ECECEC',
        customGreen: '#10b981',
        'pale-gray': '#5A5A5A',
        'light-gray': '#8F8F8F',
        'dark-gray': '#D9D9D9',
        'green': '#14AE5C',
        'gray': '#B3B3B3',
        'gray-2': '#F5F5F5',
        'dark': '#1E1E1E',
        'whiter': 'rgb(245 247 253)'
      },
      borderColor: {
        'black-translucent': 'rgba(0, 0, 0, 0.3)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif']
      },
      animation: {
        slideDown: 'slideDown 0.3s ease-out',
      },
      keyframes: {
        slideDown: {
          from: { transform: 'translateY(-20px)', opacity: 0 },
          to: { transform: 'translateY(0)', opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}