/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        fiik: {
          orange: '#F26A21',
          orangeDark: '#D95209',
          blue: '#1E40AF',
          green: '#16A34A',
          purple: '#7C3AED',
          teal: '#0D9488',
        },
        navy: {
          900: '#0F172A',
          950: '#0B132B',
        },
        saffron: {
          DEFAULT: '#E65100',
          dark: '#BF360C',
          light: '#FFF3E0',
        },
        indiagreen: {
          DEFAULT: '#138808',
          light: '#E8F5E9',
        },
        status: {
          green: '#2e7d32',
          greenBg: '#e8f5e9',
          amber: '#e65100',
          amberBg: '#fff3e0',
          blue: '#1565c0',
          blueBg: '#e3f2fd',
          red: '#c62828',
          redBg: '#ffebee',
          purple: '#6a1b9a',
          purpleBg: '#f3e5f5',
          grey: '#616161',
          greyBg: '#f5f5f5',
        }
      },
      boxShadow: {
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
      },
    },
  },
  plugins: [],
}
