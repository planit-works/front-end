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
        intro: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        intro: 'intro 1.2s ease-in',
        introAfter:  'intro 1.2s ease-in 0.8s forwards',
      },
    },
  },
  plugins: [],
};
