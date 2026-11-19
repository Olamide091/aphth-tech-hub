/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#040706', // page background
          900: '#070C0A',
          850: '#0A110E',
          800: '#0E1713', // panels
          700: '#14201B', // cards
          600: '#1C2B24', // raised / hover
        },
        line: 'rgba(214, 236, 224, 0.09)',
        green: {
          DEFAULT: '#008751', // Nigerian flag green
          deep:    '#00663D',
          bright:  '#16B26E',
          glow:    '#3DDC97', // accessible accent on dark
        },
        gold: {
          DEFAULT: '#D4A24C',
          soft:    '#E8C27A',
        },
        paper: '#EEF3EF',     // primary text
        mist:  '#A3B3AA',     // secondary text (AA on ink-950)
        haze:  '#7C8B83',     // tertiary / labels
      },
      fontFamily: {
        display: ['"Inter Tight"', 'system-ui', 'sans-serif'],
        serif:   ['"Instrument Serif"', 'Georgia', 'serif'],
        body:    ['"Inter Tight"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      fontSize: {
        'display-xl': ['clamp(3rem, 8.4vw, 8.5rem)', { lineHeight: '0.92', letterSpacing: '-0.045em' }],
        'display-lg': ['clamp(2.5rem, 5.6vw, 5.25rem)', { lineHeight: '0.98', letterSpacing: '-0.04em' }],
        'display-md': ['clamp(1.9rem, 3.4vw, 3.25rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
      },
      maxWidth: { site: '84rem' },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        float:   { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        pulseDot: { '0%,100%': { opacity: '1' }, '50%': { opacity: '0.35' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        float: 'float 7s ease-in-out infinite',
        'pulse-dot': 'pulseDot 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
