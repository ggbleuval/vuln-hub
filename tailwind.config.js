/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#0a0a0f',
        panel: '#12121a',
        border: '#1e1e2e',
        accent: '#7c3aed',
        accent2: '#06b6d4',
        danger: '#ef4444',
        warn: '#f59e0b',
        ok: '#22c55e',
        muted: '#64748b',
        text: '#e2e8f0',
        dim: '#94a3b8'
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 20px rgba(124, 58, 237, 0.25)',
        'glow-cyan': '0 0 20px rgba(6, 182, 212, 0.2)'
      }
    }
  },
  plugins: []
}