/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: 'rgb(var(--color-brand) / <alpha-value>)',
        zinc: Object.fromEntries([50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((shade) => [shade, `rgb(var(--color-zinc-${shade}) / <alpha-value>)`])),
        btop: Object.fromEntries(['bg', 'fg', 'border', 'panel', 'panelHeader', 'cpu', 'mem', 'disk', 'net', 'temp', 'dim'].map((name) => [name, `rgb(var(--color-${name}) / <alpha-value>)`])),
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      maxWidth: {
        content: '80rem',
      },
    },
  },
  plugins: [],
};
