/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          indigo: '#4F46E5',
          emerald: '#10B981',
          rose: '#E11D48',
          amber: '#F59E0B',
          violet: '#7C3AED',
          cyan: '#06B6D4'
        },
        'trade-primary': 'var(--color-primary)',
        'trade-secondary': 'var(--color-secondary)',
        'dark-bg': '#0B0E14',
        'glass-border': 'rgba(255, 255, 255, 0.08)',
        'glass-bg': 'rgba(17, 19, 24, 0.7)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(-100%)' },
        },
        glow: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
      },
      opacity: {
        '85': '0.85',
        '95': '0.95',
      },
      spacing: {
        'compact': 'var(--spacing-base, 1rem)',
      },
      fontSize: {
        'sm-compact': ['0.875rem', { lineHeight: '1.25rem' }],
        'base-compact': ['1rem', { lineHeight: '1.5rem' }],
        'lg-compact': ['1.125rem', { lineHeight: '1.75rem' }],
      },
      transitionProperty: {
        'settings': 'color, background-color, border-color, font-size, padding, margin',
      },
      transitionDuration: {
        'settings': '200ms',
      },
    },
  },
  plugins: [],
};