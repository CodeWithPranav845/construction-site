/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Blueprint navy: text, hero, footer, admin sidebar
        blueprint: { DEFAULT: '#17324D', dark: '#0F2338', light: '#24486B' },
        // Survey orange: the single accent colour (buttons, active states)
        survey: { DEFAULT: '#E0561F', dark: '#BF4515' },
        // Drafting paper: alternate section background
        paper: '#F5F7F8',
        // Muted text and hairlines
        steel: '#5B6B7A',
        line: '#D5DCE2',
        concrete: { DEFAULT: '#E9ECEE', dark: '#D5DADD' },
      },
      fontFamily: {
        display: ['Archivo', 'system-ui', 'sans-serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};
