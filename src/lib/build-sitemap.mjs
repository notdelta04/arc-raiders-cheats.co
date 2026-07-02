import {
  BLOG_INDEX_LASTMOD,
  BLOG_SITEMAP_URLS,
  getBlogSitemapMeta,
  getPagePriority,
  getPageSitemapImage,
  LEGACY_BLOG_REDIRECTS,
  LEGACY_CHEAT_REDIRECTS,
  SITE_URL,
} from './sitemap-meta.mjs';

const STATIC_SITEMAP_PATHS = [
  '/',
  '/about/',
  '/cheats/',
  '/products/',
  '/contact/',
  '/faq/',
  '/privacy-policy/',
  '/terms/',
];

const CHEAT_DETAIL_PATHS = ['/cheats/xray/', '/cheats/pro/', '/cheats/private/'];

const PRODUCT_DETAIL_PATHS = [
  '/products/ugc/',
  '/products/cloud-dma/',
  '/products/hwid-spoofer/',
];

const LEGACY_PATHS = new Set([
  ...Object.keys(LEGACY_BLOG_REDIRECTS),
  ...Object.keys(LEGACY_CHEAT_REDIRECTS),
]);

function normalizePath(pathname) {
  if (pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

function escapeXml(value) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/** @returns {string[]} */
export function getAllSitemapPaths() {
  const paths = new Set([
    ...STATIC_SITEMAP_PATHS,
    ...BLOG_SITEMAP_URLS.map((url) => normalizePath(new URL(url).pathname)),
    ...CHEAT_DETAIL_PATHS,
    ...PRODUCT_DETAIL_PATHS,
  ]);

  return [...paths].filter((path) => !LEGACY_PATHS.has(path));
}

/** @param {string} pathname */
function getLastmod(pathname, blogMeta, buildTime) {
  const path = normalizePath(pathname);
  const blogUrl = `${SITE_URL}${path === '/' ? '/' : path}`;
  const blogEntry = blogMeta.get(blogUrl);

  if (blogEntry) return blogEntry.lastmod;
  if (path === '/blog/' && BLOG_INDEX_LASTMOD) return BLOG_INDEX_LASTMOD;
  return buildTime;
}

/** @param {string} [buildTime] */
export function buildSitemapXml(buildTime = new Date().toISOString()) {
  const blogMeta = getBlogSitemapMeta();
  const paths = getAllSitemapPaths();

  const urlNodes = paths.map((pathname) => {
    const path = normalizePath(pathname);
    const loc = `${SITE_URL}${path === '/' ? '/' : path}`;
    const lastmod = getLastmod(path, blogMeta, buildTime);
    const priority = getPagePriority(path);
    const image = getPageSitemapImage(path);

    return [
      '  <url>',
      `    <loc>${escapeXml(loc)}</loc>`,
      `    <lastmod>${escapeXml(lastmod)}</lastmod>`,
      `    <priority>${priority.toFixed(1)}</priority>`,
      '    <image:image>',
      `      <image:loc>${escapeXml(image.url)}</image:loc>`,
      `      <image:title>${escapeXml(image.title)}</image:title>`,
      `      <image:caption>${escapeXml(image.title)}</image:caption>`,
      '    </image:image>',
      '  </url>',
    ].join('\n');
  });

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">',
    ...urlNodes,
    '</urlset>',
  ].join('\n');
}
