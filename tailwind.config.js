/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      padding: {
        '4px': '4px',
        '5px': '5px',
        '6px': '6px',
        '7px': '7px',
        '8px': '8px',
        '9px': '9px',
        '10px': '10px',
      },
      screens: {
        sm: '576px',
        // => @media (min-width: 576px) { ... }

        md: '960px',
        // => @media (min-width: 960px) { ... }

        lg: '1440px',
        // => @media (min-width: 1440px) { ... }
      },
    },
    fontFamily: {
      Libre: 'Libre Baskerville',
      Inter: 'Inter',
    },
    boxShadow: {
      xl: '0px 77.5917px 31.1939px rgba(0, 146, 255, 0.03), 0px 43.7763px 26.2134px rgba(0, 146, 255, 0.1), 0px 19.3979px 19.3979px rgba(0, 146, 255, 0.17), 0px 4.98052px 10.7475px rgba(0, 146, 255, 0.2)',
      '2xl':
        '0px 107.28px 43.0688px rgba(53, 114, 141, 0.01), 0px 60.2963px 36.0212px rgba(53, 114, 141, 0.03), 0px 26.6243px 26.6243px rgba(53, 114, 141, 0.04), 0px 7.04762px 14.8783px rgba(53, 114, 141, 0.05)',
    },
    colors: {
      white: {
        100: '#F7F7F7',
        200: '#F6FBFF',
        300: '#ffffffa6',
      },
      purple: {
        100: '#7B61FF',
      },
      red: {
        100: '#FF5F57',
        200: '#f87171',
      },
      gray: {
        100: '#E8EDF9',
        200: '#B7C0D8',
        300: '#34364C',
        400: '#9ca3af',
        500: '#6b7280',
        600: '#868686',
      },
      green: {
        100: '#1BC47D',
      },
      blue: {
        100: '#1D9BF0',
      },
      card: 'linear-gradient(292.94deg, #DCEEFF 0%, #F1F8FF 0%, #F1F8FF 0%, #FFFFFF 100%)',
      fontFamily: {
        libre: ['Libre Baskerville', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
