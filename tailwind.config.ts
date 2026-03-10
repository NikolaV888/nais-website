import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        ink: '#0c0c16',
      },
      fontFamily: {
        display: ['var(--font-display)', 'Space Grotesk', 'Inter', 'sans-serif'],
        body: ['var(--font-body)', 'Manrope', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 15px 80px rgba(255,126,94,0.25), 0 10px 40px rgba(86,214,255,0.15)',
        'glass-strong': '0 20px 70px rgba(0,0,0,0.35)',
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        marquee: 'marquee 18s linear infinite',
        'gradient-move': 'gradientMove 16s ease-in-out infinite',
        blob: 'blob 14s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        gradientMove: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        blob: {
          '0%': { transform: 'translate3d(0,0,0) scale(1)' },
          '33%': { transform: 'translate3d(30px,-20px,0) scale(1.06)' },
          '66%': { transform: 'translate3d(-20px,20px,0) scale(0.98)' },
          '100%': { transform: 'translate3d(0,0,0) scale(1)' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
