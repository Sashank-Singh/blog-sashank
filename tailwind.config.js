/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          blue: '#00f5ff',
          purple: '#8b5cf6',
          pink: '#ec4899',
          green: '#00ff88',
          dark: '#0a0a0f',
          darker: '#050508',
        },
        neon: {
          cyan: '#06b6d4',
          magenta: '#f0f',
          yellow: '#ff0',
          lime: '#0f0',
        }
      },
      fontFamily: {
        cyber: ['Orbitron', 'monospace'],
        code: ['Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      typography: {
        cyber: {
          css: {
            maxWidth: 'none',
            color: '#e4e4e7',
            lineHeight: '1.7',
            'h1, h2, h3, h4': {
              color: '#06b6d4',
              fontFamily: 'Orbitron, monospace',
            },
            'code': {
              color: '#ec4899',
              backgroundColor: 'rgba(6, 182, 212, 0.1)',
              padding: '0.25rem 0.5rem',
              borderRadius: '0.25rem',
              fontFamily: 'Fira Code, monospace',
            },
            'a': {
              color: '#06b6d4',
              textDecoration: 'none',
              '&:hover': {
                color: '#ec4899',
                textShadow: '0 0 10px currentColor',
              }
            }
          },
        },
      },
      backgroundImage: {
        'cyber-gradient': 'linear-gradient(135deg, #06b6d4 0%, #8b5cf6 50%, #ec4899 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16213e 100%)',
      },
      animation: {
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        'slide-in-right': 'slideInRight 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
} 