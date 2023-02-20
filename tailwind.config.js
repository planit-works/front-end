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
      colors: {
        'col-calendar': 'rgb(14 165 233)'
      },
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
        appearToLeft: 'appearToLeft 500ms ease-in-out both',
        appearToRight: 'appearToRight 500ms ease-in-out both',
        disappearToLeft: 'disappearToLeft 500ms ease-in-out both',
        disappearToRight: 'disappearToRight 500ms ease-in-out both',
        bounceLeft: 'bounceLeft 1.2s infinite',
        intro: 'opacityUp 1.2s ease-in',
        introAfter: 'opacityUp 1.2s ease-in 0.8s forwards',
        profile: 'opacityDown 2s ease-in-out forwards',
        profileSecond: 'opacityDown 2s 2s ease-in-out forwards',
        profileAtter: 'opacityUp 3s 3s ease-in-out forwards',
      },
    },
  },
  plugins: [],
};
