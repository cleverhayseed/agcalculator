import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://agcalculator.com',
  integrations: [
    // Thank-you pages are noindex, so keep them out of the sitemap.
    sitemap({ filter: (page) => !page.includes('/get/') }),
  ],
});
