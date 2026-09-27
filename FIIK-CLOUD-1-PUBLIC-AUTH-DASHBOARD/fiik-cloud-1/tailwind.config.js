/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#0B1F3A',
          900: '#0E2A4D',
          800: '#123564'
        },
        saffron: '#FF9933',
        indiagreen: '#138808',
        fiik: {
          orange: '#F5760A',
          orangeDark: '#D9640A',
          blue: '#2563EB',
          green: '#0F9D58',
          purple: '#7C3AED',
          teal: '#0D9488'
        }
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 24, 40, 0.06), 0 1px 3px rgba(16, 24, 40, 0.08)'
      }
    }
  },
  plugins: []
}
