/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgMain: '#F7F7F5',
        primaryText: '#111111',
        secondaryText: '#6B6B6B',
        cardBg: '#FFFFFF',
        borderColor: '#E6E6E1',
        brandOrange: '#FF5A36',
        darkCard: '#171717',
        brandSuccess: '#1F9D68',
        brandWarning: '#F4A340',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      borderRadius: {
        'card': '18px',
        'btn': '12px',
        'input': '12px',
      },
      maxWidth: {
        'mobile': '390px',
      }
    },
  },
  plugins: [],
}
