/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: { colors: {
      primary: "#FF6604",
      secondary:"#444240",
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'white': '#fff',
      'yellow': '#ffc82c',
      'red':'#Ff0000',
      'gray-dark': '#273444',
      'gray': '#868686',
      'gray-light': '#D6D6D6',
      'gray-light-1': '#ECEDEF',
      'bright-ascent': '#FAF8F5',
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
    },
  },
  },
            //@ts-ignore   
            plugins: [
              require('tailwind-scrollbar-hide')
              // ...
            ]
}