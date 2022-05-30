module.exports = {
  content: [
    './src/components/**/*.{ts,tsx,js,jsx}',
    './src/pages/**/*.{ts,tsx,js,jsx}'
  ],
  theme: {  
    extend: {
      height: {
        'screen-85': '85vh',
      },
      brightness: {
        60: '.6',
        65: '.65',
        70: '.7'
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
