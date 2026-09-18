/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: '#13ce66',
        btop: {
          bg: '#0a0a0a',
          fg: '#e0e0e0',
          border: '#333333',
          panel: '#111111',
          panelHeader: '#1a1a1a',
          cpu: '#00d4ff',
          mem: '#13ce66',
          disk: '#f59e0b',
          net: '#d946ef',
          temp: '#ef4444',
          dim: '#666666',
        },
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
