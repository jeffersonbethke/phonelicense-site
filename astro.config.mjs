import { defineConfig } from 'astro/config';

// Static output. Vercel auto-detects Astro and serves dist/.
// The apex/www redirect stays in vercel.json.
export default defineConfig({
  site: 'https://phonelicense.co',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory', // /quiz -> /quiz/index.html (clean URLs)
  },
});
