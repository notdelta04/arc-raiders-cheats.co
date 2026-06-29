import { ARC_RAIDERS_IGDB } from './igdb';

export const OG_IMAGE_WIDTH = 1280;
export const OG_IMAGE_HEIGHT = 720;

export type SocialImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
};

const shots = ARC_RAIDERS_IGDB.screenshots;

function shot(index: number, alt?: string): SocialImage {
  const image = shots[index] ?? shots[0];
  return {
    src: image.src,
    alt: alt ?? image.alt,
    width: OG_IMAGE_WIDTH,
    height: OG_IMAGE_HEIGHT,
  };
}

export const DEFAULT_SOCIAL_IMAGE: SocialImage = {
  src: ARC_RAIDERS_IGDB.banner,
  alt: 'ARC Raiders official gameplay screenshot',
  width: OG_IMAGE_WIDTH,
  height: OG_IMAGE_HEIGHT,
};

export const ORGANIZATION_SOCIAL_IMAGE: SocialImage = {
  src: ARC_RAIDERS_IGDB.cover,
  alt: 'ARC Raiders official cover art',
  width: 1080,
  height: 1440,
};

const PAGE_SOCIAL_IMAGES: Record<string, SocialImage> = {
  '/': shot(0, 'ARC Raiders extraction gameplay — Arc Raiders Cheats homepage'),
  '/cheats/': shot(1, 'ARC Raiders cheat tiers — ESP and combat tools'),
  '/cheats/xray/': shot(0, 'ARC Raiders Xray cheat — ESP overlay preview'),
  '/cheats/pro/': shot(2, 'ARC Raiders Pro cheat — combat and aim tools'),
  '/cheats/viper/': shot(1, 'ARC Raiders Viper cheat — aimbot, ESP, and radar hack'),
  '/cheats/private/': shot(3, 'ARC Raiders Private cheat — full extraction suite'),
  '/products/': shot(4, 'ARC Raiders products — Cloud DMA, UGC, and HWID Spoofer'),
  '/products/ugc/': shot(4, 'ARC Raiders UGC account recovery tools'),
  '/products/cloud-dma/': shot(3, 'ARC Raiders Cloud DMA single-PC infrastructure'),
  '/products/hwid-spoofer/': shot(5, 'ARC Raiders HWID Spoofer hardware protection'),
  '/blog/': shot(1, 'ARC Raiders blog — guides, meta, and patch updates'),
  '/blog/arc-raiders-cheats-guide/': shot(0, 'ARC Raiders cheats guide — ESP and aimbot breakdown'),
  '/blog/arc-raiders-spoofer-guide/': shot(3, 'ARC Raiders HWID spoofer guide — hardware protection'),
  '/blog/season-1-meta-analysis/': shot(2, 'ARC Raiders Season 1 meta analysis — loadouts and strategy'),
  '/about/': shot(2, 'About Arc Raiders Cheats — player-built guides and tools'),
  '/faq/': shot(4, 'Arc Raiders Cheats FAQ — common questions answered'),
  '/contact/': shot(3, 'Contact Arc Raiders Cheats support team'),
  '/privacy-policy/': DEFAULT_SOCIAL_IMAGE,
  '/terms/': DEFAULT_SOCIAL_IMAGE,
};

function normalizePath(pathname: string): string {
  if (pathname === '/') return '/';
  const trimmed = pathname.replace(/\/+$/, '');
  return `${trimmed}/`;
}

export function resolveSocialImage(pathname: string): SocialImage {
  return PAGE_SOCIAL_IMAGES[normalizePath(pathname)] ?? DEFAULT_SOCIAL_IMAGE;
}

export function resolveOgImageUrl(src: string, siteUrl: string): string {
  return src.startsWith('http') ? src : `${siteUrl}${src}`;
}
