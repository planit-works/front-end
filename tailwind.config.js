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
        appearToLeft: {
          '0%': {
            opacity: '0',
            transform: 'translateX(100%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0%)',
          },
        },
        appearToRight: {
          '0%': {
            opacity: '0',
            transform: 'translateX(0%)',
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(100%)',
          },
        },
        dissappearToLeft: {
          '0%': {
            opacity: '1',
            transform: 'translateX(100%)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateX(0%)',
          },
        },
        disappearToRight: {
          '0%': {
            opacity: '1',
            transform: 'translateX(0%)',
          },
          '100%': {
            opacity: '0',
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
        intro: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        slipToLeft: 'slipToLeft 500ms ease-in-out both',
        slipToRight: 'slipToRight 500ms, ease-in-out both',
        appearToLeft: 'appearToLeft 500ms ease-in-out both',
        appearToRight: 'appearToRight 500ms ease-in-out both',
        disappearToLeft: 'disappearToLeft 500ms ease-in-out both',
        disappearToRight: 'disappearToRight 500ms ease-in-out both',
        bounceLeft: 'bounceLeft 1.2s infinite',
        intro: 'intro 1.2s ease-in',
        introAfter: 'intro 1.2s ease-in 0.8s forwards',
      },
    },
  },
  plugins: [],
};
