// import-wechat.js — 一行命令导入公众号文章
// Usage: node scripts/import-wechat.js <url1> [url2] ...
//        node scripts/import-wechat.js --file urls.txt
//        cat urls.txt | node scripts/import-wechat.js --stdin
//
// 自动抓取文章、提取元数据、下载封面与内嵌图片、生成 Markdown 到 content/post/

const https = require('https');
const fs = require('fs');
const path = require('path');

// ── Config ──────────────────────────────────────────────
const CONTENT_DIR = path.join(__dirname, '..', 'content', 'post');
const IMG_DIR = path.join(__dirname, '..', 'public', 'img');
const COVERS_DIR = path.join(IMG_DIR, 'covers');
const CONTENT_IMG_DIR = path.join(IMG_DIR, 'content');
const CONCURRENCY = 5; // parallel image downloads

const COOKIE = `appmsglist_action_3639363719=card; pgv_pvid=1274816584; RK=gIN8D9mrak; ptcz=13434cc8cf4b33d7ccb443c7b6b02be5256745ebdc6c7b58381b8444ccac235b; pac_uid=0_Gw9sS4tFQ8bih; _qimei_uuid42=197150c0738100347a36400fcd89c4e162947c63ce; _qimei_fingerprint=12db53dc3be5b3c7d3f1c61b362217cf; _qimei_h38=19c504627a36400fcd89c4e102000003a19715; eas_sid=11D7v546z1j0L948S0K6r6C2z7; wxuin=67105074442757; _clck=3639363719|1|g64|0; mm_lang=zh_CN; ETCI=1f5dc7bfbb614418b1026b8b1207ac22`;

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

// ── Utilities ───────────────────────────────────────────
function fetch(url, opts = {}) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { Cookie: COOKIE, 'User-Agent': UA, Accept: 'text/html,*/*', 'Accept-Language': 'zh-CN,zh;q=0.9', ...opts.headers } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetch(res.headers.location, opts).then(resolve, reject);
      }
      const bufs = [];
      res.on('data', c => bufs.push(c));
      res.on('end', () => resolve(Buffer.concat(bufs)));
    }).on('error', reject);
  });
}

function downloadToFile(url, filePath) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': UA, Referer: 'https://mp.weixin.qq.com/' } }, res => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadToFile(res.headers.location, filePath).then(resolve, reject);
      }
      const bufs = [];
      res.on('data', c => bufs.push(c));
      res.on('end', () => { fs.writeFileSync(filePath, Buffer.concat(bufs)); resolve(bufs.reduce((s, b) => s + b.length, 0)); });
    }).on('error', reject);
  });
}

async function parallelMap(items, fn, concurrency = CONCURRENCY) {
  const results = [];
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency).map((item, j) => fn(item, i + j));
    results.push(...await Promise.all(batch));
  }
  return results;
}

// ── HTML Extraction ─────────────────────────────────────
function extractTitle(html) {
  const m = html.match(/var msg_title\s*=\s*'([^']+)'/);
  return m ? m[1].trim() : 'Untitled';
}

function extractDate(html) {
  const m = html.match(/var ct\s*=\s*"([^"]+)"/);
  return m ? new Date(parseInt(m[1]) * 1000).toISOString() : new Date().toISOString();
}

function extractCoverUrl(html) {
  const m = html.match(/var msg_cdn_url\s*=\s*"([^"]+)"/);
  return m ? m[1].replace(/&amp;/g, '&') : null;
}

function extractContentHtml(html) {
  const patterns = [
    /<div id="js_content"[^>]*>([\s\S]*?)<\/div>\s*<div[^>]*rich_media_area_extra/,
    /<div class="rich_media_content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<div[^>]*rich_media_area_extra/,
    /<div id="js_content"[^>]*>([\s\S]*)<\/div>/,
    /<div class="rich_media_content[^"]*"[^>]*>([\s\S]*)<\/div>/,
  ];
  for (const p of patterns) {
    const m = html.match(p);
    if (m) return m[1];
  }
  return '';
}

function extractInlineImages(contentHtml) {
  const urls = [];
  const re = /https?:\/\/mmbiz\.qpic\.cn\/[^"'\s<>()]+/g;
  let m;
  while ((m = re.exec(contentHtml)) !== null) {
    const u = m[0].replace(/&amp;/g, '&');
    if (!urls.includes(u)) urls.push(u);
  }
  return urls;
}

// ── HTML → Markdown ─────────────────────────────────────
function htmlToMd(html, slug, inlineImages) {
  let out = html;

  // Replace images with markdown refs
  const imgRegex = /<img[^>]*?(?:data-src|src)="(https?:\/\/mmbiz\.qpic\.cn\/[^"]+)"[^>]*\/?>/g;
  out = out.replace(imgRegex, (_, url) => {
    url = url.replace(/&amp;/g, '&');
    const idx = inlineImages.indexOf(url);
    if (idx >= 0) {
      const ext = url.match(/wx_fmt=(\w+)/)?.[1] || 'jpeg';
      return `\n\n![](/img/content/${slug}/${String(idx + 1).padStart(2, '0')}.${ext})\n\n`;
    }
    return '';
  });

  // Structural conversions
  out = out.replace(/<section[^>]*>/g, '\n').replace(/<\/section>/g, '\n');
  out = out.replace(/<br\s*\/?>/g, '\n');
  out = out.replace(/<\/p>/g, '\n\n');
  out = out.replace(/<\/div>/g, '\n');
  out = out.replace(/<h([1-6])[^>]*>/g, (_, n) => '\n\n' + '#'.repeat(parseInt(n)) + ' ');
  out = out.replace(/<\/h[1-6]>/g, '\n\n');
  out = out.replace(/<strong[^>]*>/g, '**').replace(/<\/strong>/g, '**');
  out = out.replace(/<em[^>]*>/g, '*').replace(/<\/em>/g, '*');
  out = out.replace(/<[^>]+>/g, '');

  // Entity decode
  const entities = {
    '&nbsp;': ' ', '&amp;': '&', '&lt;': '<', '&gt;': '>', '&quot;': '"',
    '&#39;': "'", '&apos;': "'", '&mdash;': '—', '&ndash;': '–', '&hellip;': '…',
    '&ldquo;': '"', '&rdquo;': '"', '&lsquo;': "'", '&rsquo;': "'", '&middot;': '·',
  };
  for (const [e, c] of Object.entries(entities)) out = out.replaceAll(e, c);

  // Cleanup
  out = out.split('\n').map(l => l.trim()).join('\n');
  out = out.replace(/\n{3,}/g, '\n\n');
  out = out.replace(/var\s+first_sceen__time[\s\S]*$/, '');
  out = out.replace(/预览时标签不可点\s*/g, '');
  return out.trim() + '\n';
}

// ── Slug / Tags / Type inference ────────────────────────
const TAG_RULES = [
  [/阿尔都塞/g, '阿尔都塞'], [/斯宾诺莎/g, '斯宾诺莎'], [/福柯/g, '福柯'],
  [/马克思/g, '马克思主义'], [/列宁/g, '列宁'], [/毛泽东|毛主义/g, '毛泽东'],
  [/资本主义|资本批判/g, '资本主义批判'], [/剥削/g, '剥削与阶级'],
  [/分析马克思主义|罗默/g, '分析马克思主义'], [/博弈论/g, '博弈论'],
  [/意识形态/g, '意识形态理论'], [/阶级斗争/g, '阶级斗争'],
  [/意大利|马乔奇/g, '意大利'], [/五月风暴/g, '五月风暴'],
  [/认识论|充分观念/g, '认识论'], [/形而上学/g, '形而上学'],
  [/伦理学/g, '伦理学'], [/妇女|女性/g, '妇女'],
  [/现象学/g, '现象学'], [/帝国主义|殖民/g, '帝国主义与殖民'],
];

function inferTags(text) {
  const tags = new Set();
  for (const [re, tag] of TAG_RULES) {
    if (re.test(text)) tags.add(tag);
  }
  return [...tags].slice(0, 8);
}

function slugify(title) {
  return title
    .replace(/[|｜]/g, '-').replace(/[：:]/g, '-')
    .replace(/[\/\\*?"<>]/g, '').replace(/\s+/g, '-')
    .replace(/-+/g, '-').replace(/^-|-$/g, '')
    .replace(/^译坊-/, '译坊-i-');
}

// ── Main Pipeline ───────────────────────────────────────
async function importOne(url) {
  console.log(`\n📥 ${url}`);

  // 1. Fetch HTML
  const html = (await fetch(url)).toString('utf-8');

  // 2. Extract
  const title = extractTitle(html);
  const date = extractDate(html);
  const coverUrl = extractCoverUrl(html);
  const contentHtml = extractContentHtml(html);
  if (!contentHtml) throw new Error('Could not extract content');

  const inlineImages = extractInlineImages(contentHtml);
  const slug = slugify(title);

  // Determine type
  const type = title.startsWith('译坊') ? 'translation' : 'post';
  const author = type === 'translation' ? '随机轮编辑部' : '随机轮编辑部';

  // 3. Convert to markdown
  const mdBody = htmlToMd(contentHtml, slug, inlineImages);
  const wordcount = (mdBody.match(/[一-鿿㐀-䶿]/g) || []).length;
  const tags = inferTags(mdBody);

  // Build front matter
  const coverRef = `/img/covers/${slug}.jpg`;
  const frontMatter = [
    '---',
    `title: '${title.replace(/'/g, "''")}'`,
    `date: ${date}`,
    `lastmod: ${date}`,
    `type: ${type}`,
    `author: ${author}`,
    `tags:`,
    ...tags.map(t => `  - ${t}`),
    `cover: ${coverRef}`,
    `wordcount: ${wordcount}`,
    `license: CC BY-NC 4.0`,
    `wechat_link: '${url}'`,
    '---',
    '',
  ].join('\n');

  // 4. Check for existing article (by wechat_link)
  for (const f of fs.readdirSync(CONTENT_DIR)) {
    if (!f.endsWith('.md')) continue;
    const raw = fs.readFileSync(path.join(CONTENT_DIR, f), 'utf-8');
    if (raw.includes(url)) {
      console.log(`  ⏭  Already exists: ${f}`);
      return { slug, skipped: true };
    }
  }

  // 5. Download images (in parallel)
  console.log(`  Title : ${title}`);
  console.log(`  Slug  : ${slug}`);
  console.log(`  Tags  : ${tags.join(', ')}`);

  const downloads = [];
  // Cover
  if (coverUrl) {
    downloads.push({ url: coverUrl, file: path.join(COVERS_DIR, `${slug}.jpg`), label: 'cover' });
  }
  // Inline
  if (inlineImages.length > 0) {
    const dir = path.join(CONTENT_IMG_DIR, slug);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    for (let i = 0; i < inlineImages.length; i++) {
      const ext = inlineImages[i].match(/wx_fmt=(\w+)/)?.[1] || 'jpeg';
      downloads.push({
        url: inlineImages[i],
        file: path.join(dir, `${String(i + 1).padStart(2, '0')}.${ext}`),
        label: `img ${i + 1}/${inlineImages.length}`,
      });
    }
  }

  const results = await parallelMap(downloads, async (d) => {
    try {
      const size = await downloadToFile(d.url, d.file);
      return { ok: true, label: d.label, size };
    } catch (e) {
      return { ok: false, label: d.label, error: e.message };
    }
  });

  for (const r of results) {
    if (r.ok) console.log(`  ✅ ${r.label} (${(r.size / 1024).toFixed(1)} KB)`);
    else console.log(`  ❌ ${r.label}: ${r.error}`);
  }

  // 6. Write markdown
  const mdPath = path.join(CONTENT_DIR, `${slug}.md`);
  fs.writeFileSync(mdPath, frontMatter + '\n' + mdBody, 'utf-8');
  console.log(`  📄 -> ${slug}.md (${wordcount} chars)`);

  return { slug, wordcount, tags };
}

// ── CLI ─────────────────────────────────────────────────
async function main() {
  const urls = [];

  if (process.argv.includes('--stdin')) {
    // Read from stdin
    const chunks = [];
    process.stdin.on('data', c => chunks.push(c));
    await new Promise(resolve => process.stdin.on('end', resolve));
    const text = Buffer.concat(chunks).toString('utf-8');
    for (const m of text.matchAll(/https?:\/\/mp\.weixin\.qq\.com\/s\/[^\s"'<>]+/g)) {
      urls.push(m[0]);
    }
  } else if (process.argv.includes('--file')) {
    const idx = process.argv.indexOf('--file');
    const filePath = process.argv[idx + 1];
    const text = fs.readFileSync(filePath, 'utf-8');
    for (const m of text.matchAll(/https?:\/\/mp\.weixin\.qq\.com\/s\/[^\s"'<>]+/g)) {
      urls.push(m[0]);
    }
  } else {
    urls.push(...process.argv.slice(2).filter(a => a.startsWith('https://')));
  }

  if (urls.length === 0) {
    console.log('Usage: node scripts/import-wechat.js <url1> [url2] ...');
    console.log('       node scripts/import-wechat.js --file urls.txt');
    console.log('       echo "https://..." | node scripts/import-wechat.js --stdin');
    process.exit(1);
  }

  console.log(`Importing ${urls.length} article(s)...`);

  let ok = 0, fail = 0;
  for (const url of urls) {
    try {
      const result = await importOne(url);
      if (!result.skipped) ok++;
    } catch (e) {
      console.error(`  ❌ ${e.message}`);
      fail++;
    }
  }

  console.log(`\nDone: ${ok} imported, ${fail} failed.`);
}

main().catch(e => { console.error(e); process.exit(1); });
