export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'ping-once': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '75%': { transform: 'scale(1.5)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '0' },
        },
      },
      animation: {
        wiggle: 'wiggle 0.5s ease-in-out',
        'fade-in': 'fade-in 0.5s ease-in forwards',
        'fade-in-up': 'fade-in-up 0.5s ease-in-out forwards',
        'ping-once': 'ping-once 1s ease-out',
      },
    },
  },
  plugins: [],
}
