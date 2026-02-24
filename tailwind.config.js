// tailwind.config.js
/** @type {import('tailwindcss').config}*/
export default{
content:[
  "./index.html",
  "./src/**/*.{js,ts,jsx,tsx}",
],
theme: {
  extend: {
    colors: {
      bg: "rgb(var(--bg) / <alpha-value>)",
      card: "rgb(var(--card) / <alpha-value>)",
      text: "rgb(var(--text) / <alpha-value>)",
      accent: "rgb(var(--accent) / <alpha-value>)", 
    },
  },
},
plugins: []
}