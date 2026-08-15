// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import pagefind from 'astro-pagefind';

// https://astro.build/config
export default defineConfig({
  site: 'https://lmoyasans.github.io',
  base: '/MokuPonaRecipes',
  integrations: [pagefind()],
  vite: {
    plugins: [tailwindcss()],
  },
});
