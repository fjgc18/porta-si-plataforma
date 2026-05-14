/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: { 50:'#f0f5f9',100:'#dbe8f1',500:'#266b96',600:'#1b5276',700:'#15415f',800:'#10344c',900:'#0A2F45' },
        accent: { 50:'#f2f9eb',100:'#e1f1ce',500:'#8dc563',600:'#79b94a',700:'#609935',800:'#4b7a29',900:'#3a5e20' }
      },
      fontFamily: { sans: ['Inter', 'system-ui', 'sans-serif'] }
    }
  },
  plugins: []
}
