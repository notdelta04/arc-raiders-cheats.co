// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import {
  LEGACY_BLOG_REDIRECTS,
  LEGACY_CHEAT_REDIRECTS,
  SITE_URL,
} from './src/lib/sitemap-meta.mjs';

const legacyRedirectsMap = { ...LEGACY_BLOG_REDIRECTS, ...LEGACY_CHEAT_REDIRECTS };

/** @type {Record<string, import('astro').RedirectConfig>} */
const legacyRedirects = Object.fromEntries(
  Object.entries(legacyRedirectsMap).map(([source, destination]) => [
    source,
    { status: 301, destination },
  ]),
);

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  prefetch: false,
  integrations: [
    mdx(),
    react(),
  ],
  redirects: legacyRedirects,
  compressHTML: true,
  build: {
    inlineStylesheets: 'always',
  },
});
