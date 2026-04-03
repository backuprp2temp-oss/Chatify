/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // WhatsApp-inspired color palette
        wa: {
          green: '#00a884',
          'green-dark': '#008069',
          'green-light': '#d9fdd3',
          'teal': '#008069',
          'teal-dark': '#005c4b',
          'bg-deep': '#0b141a',
          'bg-panel': '#111b21',
          'bg-chat': '#0b141a',
          'bg-sidebar': '#111b21',
          'bg-header': '#1f2c34',
          'bg-input': '#2a3942',
          'bg-hover': '#202c33',
          'bg-active': '#2a3942',
          'msg-out': '#005c4b',
          'msg-in': '#1f2c34',
          'text-primary': '#e9edef',
          'text-secondary': '#8696a0',
          'border': '#2a3942',
          'icon': '#aebac1',
          'search-bg': '#202c33',
          'unread': '#00a884',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Segoe UI', 'Helvetica Neue', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-in-left': 'slideInLeft 0.3s ease-out',
        'slide-in-right': 'slideInRight 0.3s ease-out',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'bounce-in': 'bounceIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInLeft: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        bounceIn: {
          '0%': { opacity: '0', transform: 'scale(0.3)' },
          '50%': { transform: 'scale(1.05)' },
          '70%': { transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
