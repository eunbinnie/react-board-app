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
    },
  },
  plugins: [],
};
