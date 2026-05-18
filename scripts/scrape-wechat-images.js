// Batch download WeChat article images to public/img/
const https = require('https');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const COOKIE = `appmsglist_action_3639363719=card; pgv_pvid=1274816584; RK=gIN8D9mrak; ptcz=13434cc8cf4b33d7ccb443c7b6b02be5256745ebdc6c7b58381b8444ccac235b; pac_uid=0_Gw9sS4tFQ8bih; _qimei_uuid42=197150c0738100347a36400fcd89c4e162947c63ce; _qimei_fingerprint=12db53dc3be5b3c7d3f1c61b362217cf; _qimei_q36=; _qimei_h38=19c504627a36400fcd89c4e102000003a19715; eas_sid=11D7v546z1j0L948S0K6r6C2z7; _uetvid=da04ada0818b11f097ef654a919dc0a8; omgid=0_Gw9sS4tFQ8bih; wxuin=67105074442757; _clck=3639363719|1|g64|0; mm_lang=zh_CN; ETCI=1f5dc7bfbb614418b1026b8b1207ac22; rewardsn=; _clsk=1iybtkc|1779034711992|11|1|mp.weixin.qq.com/weheat-agent/payload/record`;

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'post');
const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'img');
const COVERS_DIR = path.join(PUBLIC_DIR, 'covers');
const CONTENT_IMG_DIR = path.join(PUBLIC_DIR, 'content');

// Ensure directories exist
[COVERS_DIR, CONTENT_IMG_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

function fetchUrl(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'Cookie': COOKIE,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400) {
        // Follow redirect
        fetchUrl(res.headers.location).then(resolve).catch(reject);
        return;
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
    }).on('error', reject);
  });
}

function fetchHtml(url) {
  return fetchUrl(url).then(buf => buf.toString('utf-8'));
}

function downloadFile(url, filePath) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://mp.weixin.qq.com/',
      }
    }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        downloadFile(res.headers.location, filePath).then(resolve).catch(reject);
        return;
      }
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => {
        fs.writeFileSync(filePath, Buffer.concat(chunks));
        resolve(Buffer.concat(chunks).length);
      });
    }).on('error', reject);
  });
}

async function scrapeArticle(wechatUrl) {
  const html = await fetchHtml(wechatUrl);

  // Extract cover image from JS variables
  let coverUrl = null;
  const coverMatch = html.match(/var\s+msg_cdn_url\s*=\s*"([^"]+)"/);
  if (coverMatch) {
    coverUrl = coverMatch[1].replace(/&amp;/g, '&');
  }

  // Extract inline images from rich_media_content
  const contentMatch = html.match(/<div[^>]*rich_media_content[^>]*>([\s\S]*?)<\/div>\s*<div[^>]*rich_media_area_extra/);
  const inlineImages = [];
  if (contentMatch) {
    const contentHtml = contentMatch[1];
    // Find all mmbiz.qpic.cn image URLs
    const imgMatches = contentHtml.matchAll(/https?:\/\/mmbiz\.qpic\.cn\/mmbiz_(?:jpg|png|jpeg|gif|svg)[^"'\s<>()]+/g);
    for (const m of imgMatches) {
      const url = m[0].replace(/&amp;/g, '&');
      if (!inlineImages.includes(url)) inlineImages.push(url);
    }
  }

  return { coverUrl, inlineImages };
}

async function main() {
  // Get all markdown files
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));

  let coverSuccess = 0;
  let coverFail = 0;
  let inlineTotal = 0;
  let failed = 0;

  for (const file of files) {
    const filePath = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = matter(raw);
    const wechatLink = parsed.data.wechat_link;

    if (!wechatLink) {
      console.log(`  SKIP (no wechat_link): ${file}`);
      continue;
    }

    const slug = file.replace(/\.md$/, '');
    console.log(`\n📄 ${file}`);

    try {
      const { coverUrl, inlineImages } = await scrapeArticle(wechatLink);

      // Download cover image
      if (coverUrl && parsed.data.cover) {
        const coverFilename = path.basename(parsed.data.cover);
        const coverPath = path.join(COVERS_DIR, coverFilename);
        try {
          const size = await downloadFile(coverUrl, coverPath);
          console.log(`  ✅ cover: ${coverFilename} (${(size / 1024).toFixed(1)} KB)`);
          coverSuccess++;
        } catch (e) {
          console.log(`  ❌ cover download failed: ${e.message}`);
          coverFail++;
        }
      } else if (!coverUrl) {
        console.log(`  ⚠️  no cover image found on page`);
        coverFail++;
      } else if (!parsed.data.cover) {
        console.log(`  ⚠️  no cover field in front matter`);
      }

      // Download inline images
      if (inlineImages.length > 0) {
        const slugDir = path.join(CONTENT_IMG_DIR, slug);
        if (!fs.existsSync(slugDir)) fs.mkdirSync(slugDir, { recursive: true });

        for (let i = 0; i < inlineImages.length; i++) {
          const ext = inlineImages[i].match(/wx_fmt=(\w+)/)?.[1] || 'jpg';
          const imgPath = path.join(slugDir, `${String(i + 1).padStart(2, '0')}.${ext}`);
          try {
            const size = await downloadFile(inlineImages[i], imgPath);
            console.log(`  ✅ inline ${i + 1}/${inlineImages.length}: ${size} bytes`);
            inlineTotal++;
          } catch (e) {
            console.log(`  ❌ inline ${i + 1} failed: ${e.message}`);
          }
        }
      } else {
        console.log(`  ℹ️  no inline images`);
      }

      // Be polite to the server
      await new Promise(r => setTimeout(r, 1000));

    } catch (e) {
      console.log(`  ❌ FAILED: ${e.message}`);
      failed++;
    }
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`Done: ${coverSuccess} covers downloaded, ${coverFail} cover misses`);
  console.log(`      ${inlineTotal} inline images downloaded`);
  console.log(`      ${failed} articles failed`);
}

main().catch(console.error);
