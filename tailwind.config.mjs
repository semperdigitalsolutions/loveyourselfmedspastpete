/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#00c2a2',
          dark: '#00a68a',
          light: '#e6f9f6',
        },
        gold: {
          DEFAULT: '#C9A961',
          light: '#E5C889',
        },
        rose: {
          soft: '#FFF0F2',
          DEFAULT: '#E8B4C0',
        },
        background: {
          light: '#ffffff',
          offwhite: '#f5f8f8',
          dark: '#0f2320',
        },
        text: {
          main: '#1A1A1A',
          body: '#4A4A4A',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 10px 40px -10px rgba(0,0,0,0.05)',
        card: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
        hover: '0 20px 50px -12px rgba(0, 194, 162, 0.25)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
