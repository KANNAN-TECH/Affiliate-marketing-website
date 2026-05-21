import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dealsData } from '../src/data/dealsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://devkart.in';

function generateRSS() {
  const rssXML = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>DevKart - Developer Tools &amp; Resources</title>
  <link>${BASE_URL}</link>
  <description>The ultimate resource for developer tools, hosting, AI, and SaaS reviews.</description>
  <language>en-us</language>
  <atom:link href="${BASE_URL}/rss.xml" rel="self" type="application/rss+xml" />
  ${dealsData.map(deal => {
    return `
  <item>
    <title><![CDATA[${deal.name} Review 2026: The Ultimate ${deal.category} Guide For Developers]]></title>
    <link>${BASE_URL}/blog/${deal.id}</link>
    <guid>${BASE_URL}/blog/${deal.id}</guid>
    <description><![CDATA[Read our comprehensive ${deal.name} review. We evaluate ${deal.name}'s performance, pricing, use-cases, and compare it against top ${deal.category} alternatives to see if it fits your tech stack.]]></description>
    <pubDate>${new Date().toUTCString()}</pubDate>
  </item>`;
  }).join('')}
</channel>
</rss>`;

  const publicDir = path.resolve(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir);
  }

  fs.writeFileSync(path.join(publicDir, 'rss.xml'), rssXML, 'utf8');
  console.log('✅ rss.xml successfully generated!');
}

generateRSS();
