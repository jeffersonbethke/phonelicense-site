import { defineConfig } from 'astro/config';

// Static output. Vercel auto-detects Astro and serves dist/.
// The apex/www redirect stays in vercel.json.
export default defineConfig({
  site: 'https://phonelicense.co',
  output: 'static',
  trailingSlash: 'ignore',
  // The fall summit became the Summer Reset (2027 season). vercel.json carries
  // the real 308; this keeps the old URL resolving in dev/preview too.
  redirects: {
    '/summit-fall': '/summit-summer',
  },
  build: {
    format: 'directory', // /quiz -> /quiz/index.html (clean URLs)
    // Inline all CSS into each page's <head> so there's no render-blocking
    // stylesheet round-trip on the CDN (per-page CSS is only ~15KB).
    inlineStylesheets: 'always',
  },
});
