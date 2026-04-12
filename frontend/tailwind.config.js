/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        apple: {
          black:  '#1d1d1f',
          gray:   '#6e6e73',
          silver: '#86868b',
          light:  '#f5f5f7',
          white:  '#ffffff',
          blue:   '#0071e3',
          'blue-hover': '#0077ed',
          'blue-dark':  '#004f9e',
        },
        brand: {
          50:  '#f0f0ff',
          100: '#e0e0ff',
          200: '#c4b5fd',
          300: '#a78bfa',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
        },
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"SF Pro Display"',
          '"SF Pro Text"',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif',
        ],
      },
      letterSpacing: {
        tighter: '-0.022em',
        tight:   '-0.015em',
        normal:  '0em',
      },
      fontSize: {
        'hero-lg': ['80px', { lineHeight: '1.05', letterSpacing: '-0.022em' }],
        'hero-md': ['56px', { lineHeight: '1.07', letterSpacing: '-0.022em' }],
        'hero-sm': ['40px', { lineHeight: '1.1',  letterSpacing: '-0.018em' }],
      },
      animation: {
        'bounce-dot': 'bounceDot 1.2s infinite ease-in-out',
        'fade-in':    'fadeIn 0.4s ease-out',
        'slide-up':   'slideUp 0.4s ease-out',
      },
      keyframes: {
        bounceDot: {
          '0%, 80%, 100%': { transform: 'scale(0.6)', opacity: '0.4' },
          '40%':            { transform: 'scale(1)',   opacity: '1' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
