// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import react from '@astrojs/react';
import {
  BLOG_INDEX_LASTMOD,
  BLOG_SITEMAP_URLS,
  getBlogSitemapMeta,
  getPagePriority,
  getPageSitemapImage,
  LEGACY_BLOG_REDIRECTS,
  SITE_URL,
} from './src/lib/sitemap-meta.mjs';

const blogMeta = getBlogSitemapMeta();

/** @type {Record<string, import('astro').RedirectConfig>} */
const legacyRedirects = Object.fromEntries(
  Object.entries(LEGACY_BLOG_REDIRECTS).map(([source, destination]) => [
    source,
    { status: 301, destination },
  ]),
);

const legacyRedirectUrls = new Set(Object.keys(LEGACY_BLOG_REDIRECTS).map((path) => `${SITE_URL}${path}`));

export default defineConfig({
  site: SITE_URL,
  trailingSlash: 'always',
  integrations: [
    mdx(),
    sitemap({
      namespaces: {
        news: false,
        xhtml: false,
        video: false,
      },
      filter: (page) => !legacyRedirectUrls.has(page),
      customPages: BLOG_SITEMAP_URLS,
      serialize(item) {
        const url = item.url.endsWith('/') ? item.url : `${item.url}/`;
        const pathname = new URL(url).pathname;
        const blogEntry = blogMeta.get(url) ?? blogMeta.get(item.url);
        const pageImage = getPageSitemapImage(pathname);

        item.url = url;
        item.priority = getPagePriority(pathname);
        item.img = [{ url: pageImage.url, title: pageImage.title, caption: pageImage.title }];

        if (blogEntry) {
          item.lastmod = blogEntry.lastmod;
          return item;
        }

        if (pathname === '/blog/' && BLOG_INDEX_LASTMOD) {
          item.lastmod = BLOG_INDEX_LASTMOD;
          return item;
        }

        item.lastmod = new Date().toISOString();
        return item;
      },
    }),
    react(),
  ],
  redirects: legacyRedirects,
  compressHTML: true,
});
