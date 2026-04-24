import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg: '#F8F6F2',
        surface: '#FFFFFF',
        border: '#E8E3DC',
        primary: {
          DEFAULT: '#2563EB',
          dark: '#1D4ED8',
        },
        accent: '#F59E0B',
        success: '#10B981',
        danger: '#EF4444',
        text: '#1E293B',
        muted: '#64748B',
      },
      fontFamily: {
        heading: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '2xl': '1rem',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgb(0 0 0 / 0.03), 0 1px 3px 0 rgb(0 0 0 / 0.05)',
      },
    },
  },
  plugins: [],
}

export default config
