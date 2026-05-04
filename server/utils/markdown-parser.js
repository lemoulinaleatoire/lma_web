const matter = require('gray-matter');
const { marked } = require('marked');
const fs = require('fs');
const path = require('path');

// In-memory cache with TTL (ms)
const _cache = {};
const CACHE_TTL = 5000;

function cached(key, fn) {
  const entry = _cache[key];
  if (entry && Date.now() - entry.ts < CACHE_TTL) return entry.val;
  const val = fn();
  _cache[key] = { val, ts: Date.now() };
  return val;
}

// Custom shortcode processing
function processShortcodes(html, meta = {}) {
  // {{< article-download >}}
  html = html.replace(/\{\{<\s*article-download\s*>\}\}/g, () => {
    const pdfLink = meta.pdf ? `<p><a href="${meta.pdf}">📄 下载 PDF</a></p>` : '';
    const bibLink = meta.bibtex ? `<p><a href="/bib/${meta.bibtex}">📚 BibTeX 引用文件</a></p>` : '';
    const license = meta.license || 'CC BY-NC-SA 4.0';
    const wordcount = meta.wordcount || '';
    return `<div class="article-download-card">
      <h4>下载与引用</h4>
      ${pdfLink}${bibLink}
      <p>许可：${license}</p>
      ${wordcount ? `<p>字数：约 ${wordcount} 字</p>` : ''}
    </div>`;
  });

  // {{< friends >}}
  html = html.replace(/\{\{<\s*friends\s*>\}\}/g, () => {
    try {
      const friends = JSON.parse(
        fs.readFileSync(path.join(__dirname, '..', '..', 'content', 'data', 'friends.json'), 'utf-8')
      );
      return friends.map(f =>
        `<div class="friend-card">
          <img src="${f.avatar}" alt="${f.name}" class="friend-avatar" />
          <div>
            <a href="${f.url}" target="_blank" rel="noopener"><strong>${f.name}</strong></a>
            <p>${f.description}</p>
          </div>
        </div>`
      ).join('');
    } catch {
      return '<p>暂无友链</p>';
    }
  });

  return html;
}

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: false
});

function stripTags(html) {
  return html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").replace(/&mdash;/g, '—').trim();
}

function parseMarkdownFile(filePath) {
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(raw);
    let html = marked.parse(content);
    html = processShortcodes(html, data);
    return { meta: data, html };
  } catch (err) {
    console.error(`[markdown-parser] Failed to parse ${filePath}: ${err.message}`);
    return { meta: {}, html: '' };
  }
}

function listContent(dir) {
  const dirPath = path.join(__dirname, '..', '..', 'content', dir);

  return cached(`list_${dir}`, () => {
    if (!fs.existsSync(dirPath)) return [];
    return fs.readdirSync(dirPath)
      .filter(f => f.endsWith('.md'))
      .map(f => {
        const filePath = path.join(dirPath, f);
        const { meta, html } = parseMarkdownFile(filePath);
        if (!meta.title) return null; // skip corrupted files
        const slug = f.replace('.md', '');
        const plainText = stripTags(html);
        const excerpt = plainText.length > 200 ? plainText.slice(0, 200) + '...' : plainText;
        return { slug, ...meta, excerpt };
      })
      .filter(Boolean)
      .sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0));
  });
}

function getContent(dir, slug) {
  const filePath = path.join(__dirname, '..', '..', 'content', dir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  return cached(`get_${dir}_${slug}`, () => {
    const { meta, html } = parseMarkdownFile(filePath);
    if (!meta.title) return null;
    return { slug, ...meta, html };
  });
}

module.exports = { listContent, getContent, parseMarkdownFile };
