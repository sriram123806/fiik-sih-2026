/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // FIIK shared brand tokens — keep in sync with the other
        // three FIIK cloud modules when this gets merged.
        navy: {
          DEFAULT: '#0B1F3A',
          light: '#132A4D',
          dark: '#081527',
        },
        saffron: {
          DEFAULT: '#F26A21',
          light: '#FDECE1',
          dark: '#D4570F',
        },
        status: {
          green: '#1B8A4A',
          greenBg: '#E7F6EC',
          blue: '#1E5FBF',
          blueBg: '#E8F0FE',
          amber: '#B8730B',
          amberBg: '#FEF3E0',
          purple: '#6B3FA0',
          purpleBg: '#F1EAFA',
          teal: '#0E8A82',
          tealBg: '#E4F6F4',
          grey: '#6B7280',
          greyBg: '#F1F2F4',
        },
      },
      fontFamily: {
        sans: ['"Inter"', '"Segoe UI"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(16, 24, 40, 0.04), 0 1px 3px rgba(16, 24, 40, 0.06)',
      },
      borderRadius: {
        card: '10px',
      },
    },
  },
  plugins: [],
}
