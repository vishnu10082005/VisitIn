/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          50: '#F5F7F8',
          100: '#E6EAED',
          200: '#C9D3D8',
          300: '#A4B4BD',
          400: '#738A96',
          500: '#4F6370',
          600: '#3A4B56',
          700: '#2A373F',
          800: '#1F2930',
          900: '#182126', // Primary Ink
          950: '#0F1519',
          DEFAULT: '#182126',
        },
        warm: {
          50: '#FDFCFA',
          100: '#FAF8F5',
          200: '#F7F4EE', // Warm Background
          300: '#EFECE4',
          400: '#E4DFC8',
          500: '#CEC8BD',
          600: '#A8A196',
          700: '#7E786F',
          800: '#54504A',
          900: '#2D2B27',
          DEFAULT: '#F7F4EE',
        },
        coral: {
          50: '#FDF5F3',
          100: '#FCEBE7',
          200: '#F9D4CB',
          300: '#F3B5A6',
          400: '#E78E77',
          500: '#D96C50', // Coral Accent
          600: '#C25439',
          700: '#A34027',
          800: '#843522',
          900: '#6C2F20',
          DEFAULT: '#D96C50',
        },
        sage: {
          50: '#F2F8F5',
          100: '#E3F0EA',
          200: '#C7E1D4',
          300: '#A3CCB9',
          400: '#5BA387',
          500: '#2F7A64', // Sage
          600: '#24614F',
          700: '#1E4E40',
          800: '#1A3F34',
          900: '#16352C',
          DEFAULT: '#2F7A64',
        },
        gold: {
          50: '#FDFBF4',
          100: '#FAF4E4',
          200: '#F4E5BD',
          300: '#EBCF8A',
          400: '#DFB453',
          500: '#C78A27', // Warm Gold
          600: '#A8701B',
          700: '#835417',
          800: '#6B4318',
          900: '#583717',
          DEFAULT: '#C78A27',
        },
        lavender: {
          50: '#F7F6FA',
          100: '#EEEBF4',
          200: '#DDD8E7',
          300: '#C4BCD6',
          400: '#9488B2',
          500: '#6D648C', // Soft Lavender
          600: '#584F73',
          700: '#463F5C',
          800: '#39334B',
          900: '#312C3F',
          DEFAULT: '#6D648C',
        },
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        'xs': '4px',
        'sm': '6px',
        'DEFAULT': '8px',
        'md': '10px',
        'lg': '14px',
        'xl': '18px',
        '2xl': '24px',
        '3xl': '32px',
      },
      boxShadow: {
        'subtle': '0 1px 2px 0 rgba(24, 33, 38, 0.04)',
        'warm-sm': '0 1px 3px 0 rgba(24, 33, 38, 0.06), 0 1px 2px -1px rgba(24, 33, 38, 0.04)',
        'warm-md': '0 4px 12px -2px rgba(24, 33, 38, 0.06), 0 2px 6px -2px rgba(24, 33, 38, 0.04)',
        'warm-lg': '0 12px 24px -4px rgba(24, 33, 38, 0.08), 0 4px 12px -3px rgba(24, 33, 38, 0.03)',
        'warm-xl': '0 20px 32px -8px rgba(24, 33, 38, 0.12), 0 8px 16px -4px rgba(24, 33, 38, 0.04)',
      },
    },
  },
  plugins: [],
};
