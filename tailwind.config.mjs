/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      gridTemplateColumns: {
        'link-card': 'repeat(auto-fit, minmax(24ch, 1fr))',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};
