/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: 'var(--bg-primary)',
          secondary: 'var(--bg-secondary)',
          card: 'var(--bg-card)',
          elevated: 'var(--bg-elevated)',
        },
        burgundy: {
          DEFAULT: 'var(--burgundy)',
          deep: 'var(--burgundy-deep)',
          bright: 'var(--burgundy-bright)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          soft: 'var(--accent-soft)',
          warm: 'var(--accent-warm)',
        },
        ink: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        edge: {
          DEFAULT: 'var(--border)',
          strong: 'var(--border-strong)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        /* `--font-display` is set per theme, so headings change face with the
           universe while body copy stays on Inter everywhere. */
        display: ['var(--font-display)', '"Space Grotesk"', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        hand: ['"Caveat"', 'cursive'],
      },
      borderRadius: {
        card: '18px',
        panel: '22px',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(224,50,92,0.18), 0 18px 50px -18px rgba(224,50,92,0.45)',
        card: '0 24px 60px -32px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.03)',
        neon: '0 0 24px -4px rgba(255,61,104,0.55)',
      },
      screens: {
        xs: '480px',
        '3xl': '1600px',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        blink: {
          '0%,49%': { opacity: '1' },
          '50%,100%': { opacity: '0' },
        },
        drift: {
          '0%,100%': { transform: 'translate3d(0,0,0) scale(1)' },
          '50%': { transform: 'translate3d(2%, -3%, 0) scale(1.06)' },
        },
      },
      animation: {
        float: 'float 7s ease-in-out infinite',
        blink: 'blink 1.05s step-end infinite',
        drift: 'drift 24s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
