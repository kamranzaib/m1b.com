module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      screens: {
        'xs': '320px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      colors: {
        'light-gray': '#D0D0D0',
        'cream': '#E8E6DF',
        'glass-primary': '#1a2e44',
      },
      backdropBlur: {
        'glass': '8px',
        'glass-lg': '16px',
        'glass-xl': '24px',
      },
      boxShadow: {
        'glass': '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        'glass-md': '0 10px 25px -5px rgba(0, 0, 0, 0.2)',
        'glass-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.25), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
        'glass-glow': '0 4px 15px -3px rgba(99, 102, 241, 0.5)',
      },
      animation: {
        'conic-spin': 'rotate-conic 4s linear infinite',
        'conic-spin-slow': 'rotate-conic 8s linear infinite',
        'sheen': 'sheen-sweep 0.8s ease-out',
        'glass-float': 'float 3s ease-in-out infinite',
        'glass-pulse': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'rotate-conic': {
          '0%': { '--angle-1': '0deg' },
          '100%': { '--angle-1': '360deg' },
        },
        'sheen-sweep': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(200%)' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        'pulse-glow': {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
      },
      borderRadius: {
        'glass': '16px',
        'glass-lg': '24px',
      },
    },
  },
  plugins: [],
}