/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
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
      }
    },
    colors:{
      purple:{
        100: '#7B61FF'
      },
      red:{
        100:'#FF5F57',
        200: '#f87171'
      },
      gray:{
        100:'#E8EDF9',
        200:'#B7C0D8',
        300:'#34364C'
      },
      fontFamily:{
        'libre':['Libre Baskerville', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [],
}

