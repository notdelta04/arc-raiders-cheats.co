import type { APIRoute } from 'astro';
import { buildSitemapXml } from '../lib/build-sitemap.mjs';

export const GET: APIRoute = () => {
  return new Response(buildSitemapXml(), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
};
