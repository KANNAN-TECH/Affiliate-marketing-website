import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dealsData } from '../src/data/dealsData.js';
import { allPosts } from '../src/data/blogData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://devkart.in';

const staticRoutes = [
  '/',
  '/blog',
  '/about',
  '/contact',
  '/affiliate-disclosure',
  '/privacy'
];

function generateSitemap() {
  const dynamicDeals = dealsData.map(deal => `/blog/${deal.id}`);
  
  // Exclude /articles from staticRoutes if previously there, allPosts aren't mapped individually now since we deleted the Articles page. Wait, allPosts might still exist in blogData.js, but we deleted Articles routes. Let's keep deals.

  const allRoutes = [...staticRoutes, ...dynamicDeals];

  const sitemapXML = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(route => {
    return `  <url>
    <loc>${BASE_URL}${route}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`;
  })
  .join('\n')}
</urlset>
`;

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXML, 'utf8');
  console.log('✅ sitemap.xml successfully generated!');
}

generateSitemap();
