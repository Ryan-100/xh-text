/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode:'',
  theme: {
   
    extend: { colors: {
      primary: "#FF6604",
      secondary:"#444240",
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#1Ac869',
      'white': '#fff',
      'yellow': '#ffc82c',
      'blue-light': '#78C5FC',
      'red':'#Ff0000',
      'red-1':'#D02847',
      'gray-dark': '#273444',
      'gray': '#868686',
      'gray-light': '#D6D6D6',
      'gray-light-1': '#ECEDEF',
      'bright-ascent': '#FAF8F5',
      'bright-ascent-1': '#FFF7ED',
    },
    fontSize: {
      '2xs': '10px',
      '3xs': '8px',
      '3.5xl':'32px'
    },
    screens: {
      'xs':'360px',
      'md':'767px',
      'sl':'1024px',
      'lg':'1360px',
      'xl': '1440px', 
      '2xl': '1536px', 
      '3xl': '1920px', 
      '4xl': '2560px', 
      '5xl': '3840px', 
    },
  },
  },
            //@ts-ignore   
            plugins: [
              require('tailwind-scrollbar-hide')
              // ...
            ]
}