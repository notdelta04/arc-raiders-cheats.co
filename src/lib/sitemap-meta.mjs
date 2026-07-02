import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
export const SITE_URL = 'https://arcraiderscheats.co';

/** @type {Record<string, string>} */
export const LEGACY_BLOG_REDIRECTS = {
  '/blog/competitive-settings-guide/': '/blog/arc-raiders-cheats-guide/',
  '/blog/patch-1-2-meta-shift/': '/blog/arc-raiders-spoofer-guide/',
};

/** @type {Record<string, string>} */
export const LEGACY_CHEAT_REDIRECTS = {
  '/cheats/viper/': '/cheats/private/',
};

function parseFrontmatter(content) {
  const match = content.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  return match?.[1] ?? '';
}

function parseYamlValue(block, key) {
  const match = block.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'));
  return match?.[1]?.trim() ?? null;
}

function normalizePath(pathname) {
  if (pathname === '/') return '/';
  return pathname.endsWith('/') ? pathname : `${pathname}/`;
}

const IGDB = 'https://images.igdb.com/igdb/image/upload/t_screenshot_huge';
const IGDB_COVER = 'https://images.igdb.com/igdb/image/upload/t_1080p/co9rk1.jpg';

/** @type {Record<string, { url: string, title: string }>} */
const STATIC_PAGE_SITEMAP_IMAGES = {
  '/': { url: `${IGDB}/scii62.jpg`, title: 'ARC Raiders extraction gameplay' },
  '/cheats/': { url: `${IGDB}/sc11kk7.jpg`, title: 'ARC Raiders cheat tiers' },
  '/cheats/xray/': { url: `${IGDB}/scii62.jpg`, title: 'ARC Raiders Xray cheat' },
  '/cheats/pro/': { url: `${IGDB}/sc11kk8.jpg`, title: 'ARC Raiders Pro cheat' },
  '/cheats/private/': { url: `${IGDB}/sc11kk7.jpg`, title: 'ARC Raiders Private cheat — Viper in-house build' },
  '/products/': { url: `${IGDB}/sc11kka.jpg`, title: 'ARC Raiders products' },
  '/products/ugc/': { url: `${IGDB}/sc11kka.jpg`, title: 'ARC Raiders UGC tools' },
  '/products/cloud-dma/': { url: `${IGDB}/sc11kk9.jpg`, title: 'ARC Raiders Cloud DMA' },
  '/products/hwid-spoofer/': { url: `${IGDB}/sc11kkc.jpg`, title: 'ARC Raiders HWID Spoofer' },
  '/blog/': { url: `${IGDB}/sc11kk7.jpg`, title: 'ARC Raiders blog' },
  '/about/': { url: `${IGDB}/sc11kk8.jpg`, title: 'About Arc Raiders Cheats' },
  '/faq/': { url: `${IGDB}/sc11kka.jpg`, title: 'Arc Raiders Cheats FAQ' },
  '/contact/': { url: `${IGDB}/sc11kk9.jpg`, title: 'Contact Arc Raiders Cheats' },
  '/privacy-policy/': { url: IGDB_COVER, title: 'ARC Raiders official cover art' },
  '/terms/': { url: IGDB_COVER, title: 'ARC Raiders official cover art' },
};

/** @returns {Map<string, { lastmod: string, coverImage?: string, coverImageAlt?: string, title?: string }>} */
export function getBlogSitemapMeta() {
  /** @type {Map<string, { lastmod: string, coverImage?: string, coverImageAlt?: string, title?: string }>} */
  const map = new Map();
  const dir = join(process.cwd(), 'src/content/blog');

  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.mdx') && !file.endsWith('.md')) continue;

    const slug = file.replace(/\.(mdx|md)$/, '');
    const block = parseFrontmatter(readFileSync(join(dir, file), 'utf-8'));
    const updated = parseYamlValue(block, 'updated');
    const pubDate = parseYamlValue(block, 'pubDate');
    const rawDate = updated || pubDate;

    if (!rawDate) continue;

    const lastmod = new Date(rawDate).toISOString();
    const coverImage = parseYamlValue(block, 'coverImage');
    const coverImageAlt = parseYamlValue(block, 'coverImageAlt');
    const title = parseYamlValue(block, 'title');

    map.set(`${SITE_URL}/blog/${slug}/`, {
      lastmod,
      title: title ?? undefined,
      ...(coverImage ? { coverImage, coverImageAlt: coverImageAlt ?? undefined } : {}),
    });
  }

  return map;
}

const blogMeta = getBlogSitemapMeta();

/** Blog post images auto-built from frontmatter — new posts need no manual sitemap entry. */
/** @type {Record<string, { url: string, title: string }>} */
const BLOG_SITEMAP_IMAGES = Object.fromEntries(
  [...blogMeta.entries()].map(([url, entry]) => {
    const path = normalizePath(new URL(url).pathname);
    const imageUrl = entry.coverImage ?? STATIC_PAGE_SITEMAP_IMAGES['/blog/'].url;
    const imageTitle = entry.coverImageAlt ?? entry.title ?? 'ARC Raiders blog article';
    return [path, { url: imageUrl, title: imageTitle }];
  }),
);

export const PAGE_SITEMAP_IMAGES = {
  ...STATIC_PAGE_SITEMAP_IMAGES,
  ...BLOG_SITEMAP_IMAGES,
};

/** All blog URLs for sitemap (index + every published post). */
export const BLOG_SITEMAP_URLS = [
  `${SITE_URL}/blog/`,
  ...[...blogMeta.keys()],
];

/** Latest blog post date — used as lastmod for /blog/ index. */
export const BLOG_INDEX_LASTMOD = [...blogMeta.values()]
  .map((entry) => entry.lastmod)
  .sort()
  .at(-1);

/** @param {string} pathname */
export function getPageSitemapImage(pathname) {
  const path = normalizePath(pathname);
  return PAGE_SITEMAP_IMAGES[path] ?? PAGE_SITEMAP_IMAGES['/'];
}

/** @param {string} pathname */
export function getPagePriority(pathname) {
  const path = normalizePath(pathname);

  if (path === '/') return 1;
  if (path === '/cheats/' || path === '/products/') return 0.9;
  if (path === '/blog/') return 0.85;
  if (path.startsWith('/blog/')) return 0.8;
  if (path.startsWith('/cheats/') || path.startsWith('/products/')) return 0.75;
  return 0.6;
}
