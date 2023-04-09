/* eslint-disable */

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
    theme: {
      screens: {
        sm: '380px',
        md: '700px',
        lg: '900px',
        xl: '1440px',
      },
      colors: {
        'black':'#000000',
        'white':'#ffffff',
        'blue': '#1fb6ff',
        'red': '#f03207',
        'purple': '#7e5bef',
        'pink': '#ff49db',
        'orange': '#ff7849',
        'green': '#13ce66',
        'light-green' : '#a3ffcc',
        'yellow': '#ffc82c',
        'gray-dark': '#273444',
        'gray': '#8492a6',
        'gray-light': '#d3dce6',
      },
      fontFamily: {
        mono:['ui-monospace'],
        Hacker: ["hacker"],
        Pixel: ["pixel"],
        PixelLarge :["pixel_large"]
      },
    extend: {

      },
  },
  plugins: [],
}
