/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'link-card': 'repeat(auto-fit, minmax(24ch, 1fr))',
      },
      boxShadow: {
        'border-toggle-dark':
          'inset 0 0 10px rgb(76 29 149), 0 0 10px rgb(76 29 149)',
        'border-toggle-light':
          'inset 0 0 10px rgb(254 240 138), 0 0 10px rgb(254 240 138)',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
