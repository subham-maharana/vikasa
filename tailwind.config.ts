import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif:  ['Instrument Serif', 'serif'],
        sans:   ['Satoshi', 'sans-serif'],
      },
      colors: {
        ink:    '#09102b',
        muted:  '#6b7490',
        dim:    '#b0b8d0',
        blue:   '#1840ff',
        blue2:  '#4b80ff',
        blue3:  '#93bbff',
        surface:'#f8faff',
      },
      keyframes: {
        blueFlow: {
          '0%':   { backgroundPosition: '100% 0' },
          '100%': { backgroundPosition: '-100% 0' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.3' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(18px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        bob: {
          '0%, 100%': { opacity: '0.4' },
          '50%':      { opacity: '1' },
        },
      },
      animation: {
        blueFlow: 'blueFlow 3.8s ease-in-out infinite',
        blink:    'blink 2.2s ease infinite',
        fadeUp:   'fadeUp 0.7s ease both',
        fadeUp1:  'fadeUp 0.7s 0.1s ease both',
        fadeUp2:  'fadeUp 0.7s 0.2s ease both',
        fadeUp3:  'fadeUp 0.7s 0.3s ease both',
        fadeUp5:  'fadeUp 0.7s 0.55s ease both',
        bob:      'bob 2s ease infinite',
      },
    },
  },
  plugins: [],
}
export default config
