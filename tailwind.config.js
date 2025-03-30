/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#ffab9b',
        secondary: '#ff876f',
        gray: {
          100: '#f7f9fe',
          200: '#ebeef4',
          300: '#d7dae1',
          400: '#bdc0c8',
          500: '#898c93',
        },
        white: '#fff',
        black: '#000',
        red: '#ff4949',
      },
      fontFamily: {
        pretendard: [
          'Pretendard',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          '"Noto Sans"',
          'sans-serif',
        ],
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-in-out forwards',
        'fade-out': 'fade-out 0.3s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
