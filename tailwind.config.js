/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
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
        },
        opacityUp: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        opacityDown: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
      },
      animation: {
        slipToLeft: 'slipToLeft 500ms ease-in-out both',
        slipToRight: 'slipToRight 500ms, ease-in-out both',
        bounceLeft: 'bounceLeft 1.2s infinite',
        intro: 'opacityUp 1.2s ease-in',
        introAfter: 'opacityUp 1.2s ease-in 0.8s forwards',
        profile: 'opacityDown 7s ease-in-out forwards',
        profileAtter: 'opacityUp 4s 5s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
