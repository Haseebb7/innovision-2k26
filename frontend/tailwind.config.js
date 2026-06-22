/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: '#0a0a12',
          card: 'rgba(18, 18, 32, 0.7)',
          border: 'rgba(255, 255, 255, 0.08)',
          neonBlue: '#00f0ff',
          neonPurple: '#a855f7',
          neonPink: '#ec4899',
          accent: '#3b82f6',
          darkBlue: '#0f172a',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'glow-pulse': 'glowPulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: 0.8, boxShadow: '0 0 15px rgba(0, 240, 255, 0.3)' },
          '50%': { opacity: 1, boxShadow: '0 0 25px rgba(0, 240, 255, 0.6)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
