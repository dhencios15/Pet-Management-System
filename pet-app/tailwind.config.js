const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        fucshia: colors.fuchsia,
        navy: {
          base: '#0a192f',
          light: '#172a45',
          lighter: '#303C55',
        },
        slate: {
          base: '#8892b0',
          light: '#a8b2d1',
          lighter: '#ccd6f6',
        },
        white: '#e6f1ff',
        green: {
          custom: '#64ffda',
        },
        'hot-pink': '#fd2d78',
      },
      rotate: {
        '-180': '-180deg',
        '-90': '-90deg',
        '-45': '-45deg',
        '-10': '-10deg',
        '-9': '-9deg',
        '-8': '-8deg',
        '-7': '-7deg',
        '-6': '-6deg',
        '-5': '-5deg',
        '-4': '-4deg',
        '-3': '-3deg',
        '-2': '-2deg',
        '-1': '-1deg',
        0: '0',
        1: '1deg',
        2: '2deg',
        3: '3deg',
        4: '4deg',
        5: '5deg',
        6: '6deg',
        7: '7deg',
        8: '8deg',
        9: '9deg',
        10: '10deg',
        45: '45deg',
        90: '90deg',
        180: '180deg',
      },
      screens: {
        ip5: '320px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
