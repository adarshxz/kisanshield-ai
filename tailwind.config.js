/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F2F8F4',
          100: '#E1EFE7',
          200: '#C2DFCE',
          300: '#94C6A8',
          400: '#5FA67E',
          500: '#38885C',
          600: '#276E48',
          700: '#166534', // Primary forest green
          800: '#15522C',
          900: '#123524', // Deep forest green
          950: '#0A2016',
        },
        fresh: {
          DEFAULT: '#22C55E',
          50: '#ECFDF3',
          100: '#D1FADF',
          500: '#22C55E',
          600: '#16A34A',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          warm: '#F8FAF5', // Warm off-white
          muted: '#F1F5EB',
          subtle: '#EEF3EA',
          border: '#E3E9E1',
        },
        kisan: {
          text: '#17231C',
          muted: '#68756B',
          border: '#E3E9E1',
          amber: '#F59E0B',
          red: '#DC2626',
          blue: '#2563EB',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans Devanagari', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 1px 3px 0 rgba(18, 53, 36, 0.05), 0 1px 2px -1px rgba(18, 53, 36, 0.05)',
        'card': '0 4px 6px -1px rgba(18, 53, 36, 0.04), 0 2px 4px -2px rgba(18, 53, 36, 0.04)',
        'elevated': '0 10px 15px -3px rgba(18, 53, 36, 0.07), 0 4px 6px -4px rgba(18, 53, 36, 0.05)',
      }
    },
  },
  plugins: [],
}
