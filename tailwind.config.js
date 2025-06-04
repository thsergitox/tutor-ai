/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#2A6CC8',   // Azul oscuro
          secondary: '#63B3ED', // Azul claro
          success: '#48BB78',   // Verde
          warning: '#ED8936',   // Naranja
          danger:  '#F56565',   // Rojo
        },
      },
    },
  },
  safelist: [
    'text-brand-primary',
    'text-brand-secondary', 
    'text-brand-success',
    'text-brand-warning',
    'text-brand-danger',
    'bg-brand-primary',
    'bg-brand-secondary',
    'bg-brand-success',
    'bg-brand-warning',
    'bg-brand-danger',
  ],
  plugins: [],
} 