/**
 * Generate Atom feed from all posts.
 * Usage: node server/utils/generate-feed.js
 * Output: public/index.xml
 */
const fs = require('fs');
const path = require('path');
const { listContent } = require('./markdown-parser');

const SITE_URL = 'https://le-moulin-aleatoire.netlify.app';
const SITE_TITLE = 'Le Moulin Aleatoire';
const SITE_DESC = '阿尔都塞、拉图尔与 ANT/STS 的翻译与研究';

const posts = listContent('post').slice(0, 30); // Latest 30

const entries = posts.map(p => {
  const url = `${SITE_URL}/post/${p.slug}`;
  return `  <entry>
    <title>${escapeXml(p.title)}</title>
    <link href="${escapeXml(url)}"/>
    <id>${escapeXml(url)}</id>
    <published>${p.date || ''}</published>
    <updated>${p.lastmod || p.date || ''}</updated>
    <author><name>${escapeXml(p.author || '随机轮编辑部')}</name></author>
    <category term="${escapeXml(p.type || 'post')}"/>
    ${(p.tags || []).map(t => `<category term="${escapeXml(t)}"/>`).join('\n    ')}
    <summary type="text">${escapeXml(p.excerpt || '')}</summary>
  </entry>`;
}).join('\n');

const feed = `<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${escapeXml(SITE_TITLE)}</title>
  <subtitle>${escapeXml(SITE_DESC)}</subtitle>
  <link href="${SITE_URL}" rel="alternate" type="text/html"/>
  <link href="${SITE_URL}/index.xml" rel="self"/>
  <id>${SITE_URL}/</id>
  <updated>${new Date().toISOString()}</updated>
${entries}
</feed>
`;

function escapeXml(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

const outPath = path.join(__dirname, '..', '..', 'public', 'index.xml');
fs.writeFileSync(outPath, feed, 'utf-8');
console.log(`Atom feed written to public/index.xml (${posts.length} entries)`);
