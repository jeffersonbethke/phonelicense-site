import { defineConfig } from 'astro/config';

// Static output. Vercel auto-detects Astro and serves dist/.
// The apex/www redirect stays in vercel.json.
export default defineConfig({
  site: 'https://phonelicense.co',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory', // /quiz -> /quiz/index.html (clean URLs)
    // Inline all CSS into each page's <head> so there's no render-blocking
    // stylesheet round-trip on the CDN (per-page CSS is only ~15KB).
    inlineStylesheets: 'always',
  },
});
