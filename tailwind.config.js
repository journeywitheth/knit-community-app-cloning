/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#FEF2F2',
          100: '#FEE2E2',
          200: '#FECACA',
          300: '#FCA5A5',
          400: '#F87171',
          500: '#F97066',  // 메인 브랜드 컬러 (따뜻한 코랄)
          600: '#DC2626',
          700: '#B91C1C',
          800: '#991B1B',
          900: '#7F1D1D',
        },
        surface: '#F9FAFB',
        elevated: '#F3F4F6',
      },
      fontFamily: {
        sans: ['System'],
      },
    },
  },
  plugins: [],
};
