/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes:{
        slipToLeft: {
          '0%': {
            transform: 'translateX(100%)',
          },
          '100%': {
            transform: 'translateX(0%)',
          },
        },
        slipToRight: {
          '0%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            transform: 'translateX(100%)',
          },
        },
        bounceLeft: {
          '40%, 60%': {
            transform: 'translateX(0%)',
          },
          '50%, 70%': {
            transform: 'translateX(-10%)',
          },
        }
      },
      animation:{
        slipToLeft: 'slipToLeft 500ms ease-in-out both',
        slipToRight: 'slipToRight 500ms, ease-in-out both',
        bounceLeft: 'bounceLeft 1.2s infinite',
      }
    },
  },
  plugins: [],
}
