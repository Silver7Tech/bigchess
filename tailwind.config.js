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
    fontFamily: {
      'Libre' : 'Libre Baskerville',
      'Inter': 'Inter'
    },
    colors:{
      white: {
        100: '#F7F7F7'
      },
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
        300:'#34364C',
        400:'#9ca3af',
        500: '#6b7280'
      },
      green: {
        100: '#1BC47D'
      },
      blue: {
        100: '#1D9BF0'
      },
      fontFamily:{
        'libre':['Libre Baskerville', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: [],
}

