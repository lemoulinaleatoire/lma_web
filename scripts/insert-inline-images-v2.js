// V2: Proportional position mapping — map image positions from WeChat to markdown
const https = require('https');
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const COOKIE = `appmsglist_action_3639363719=card; pgv_pvid=1274816584; RK=gIN8D9mrak; ptcz=13434cc8cf4b33d7ccb443c7b6b02be5256745ebdc6c7b58381b8444ccac235b; pac_uid=0_Gw9sS4tFQ8bih; _qimei_uuid42=197150c0738100347a36400fcd89c4e162947c63ce; _qimei_fingerprint=12db53dc3be5b3c7d3f1c61b362217cf; _qimei_q36=; _qimei_h38=19c504627a36400fcd89c4e102000003a19715; eas_sid=11D7v546z1j0L948S0K6r6C2z7; _uetvid=da04ada0818b11f097ef654a919dc0a8; omgid=0_Gw9sS4tFQ8bih; wxuin=67105074442757; _clck=3639363719|1|g64|0; mm_lang=zh_CN; ETCI=1f5dc7bfbb614418b1026b8b1207ac22; rewardsn=; _clsk=1iybtkc|1779034711992|11|1|mp.weixin.qq.com/weheat-agent/payload/record`;

const CONTENT_DIR = path.join(__dirname, '..', 'content', 'post');
const CONTENT_IMG_DIR = path.join(__dirname, '..', 'public', 'img', 'content');
const IMG_PATH = '/img/content';

function fetchHtml(url) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'Cookie': COOKIE,
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
      }
    }, (res) => {
      const chunks = [];
      res.on('data', c => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks).toString('utf-8')));
    }).on('error', reject);
  });
}

function stripTags(html) {
  return html.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim();
}

function parseBlocks(html) {
  html = html.replace(/<style[\s\S]*?<\/style>/gi, '');
  html = html.replace(/<script[\s\S]*?<\/script>/gi, '');
  const blocks = [];
  const imgRegex = /(<img[^>]*\/?>)/gi;
  const parts = html.split(imgRegex);
  for (const part of parts) {
    if (!part) continue;
    if (part.match(/^<img/i)) {
      const srcMatch = part.match(/data-src="([^"]+)"/) || part.match(/src="([^"]+)"/);
      if (srcMatch && srcMatch[1].includes('mmbiz.qpic.cn')) {
        blocks.push({ type: 'image', src: srcMatch[1] });
      }
    } else {
      const text = stripTags(part);
      if (text.length > 10) blocks.push({ type: 'text', text });
    }
  }
  return blocks;
}

async function insertImages(mdFile, wechatUrl) {
  const filePath = path.join(CONTENT_DIR, mdFile);
  const slug = mdFile.replace(/\.md$/, '');
  const imgDir = path.join(CONTENT_IMG_DIR, slug);

  // Must have image files on disk
  if (!fs.existsSync(imgDir)) return { status: 'no_img_dir' };
  const imageFiles = fs.readdirSync(imgDir).sort();
  if (imageFiles.length === 0) return { status: 'no_files' };

  // Read markdown
  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(raw);

  // Fetch WeChat article
  const html = await fetchHtml(wechatUrl);
  const contentMatch = html.match(/<div[^>]*rich_media_content[^>]*>([\s\S]*?)<\/div>\s*<div[^>]*rich_media_area_extra/);
  if (!contentMatch) return { status: 'no_content_div' };

  const blocks = parseBlocks(contentMatch[1]);

  // Calculate total text chars and image positions (as ratio 0-1 of total text)
  let totalTextLen = 0;
  for (const b of blocks) {
    if (b.type === 'text') totalTextLen += b.text.length;
  }
  if (totalTextLen === 0) return { status: 'no_text' };

  const imageRatios = [];
  let textSoFar = 0;
  for (const b of blocks) {
    if (b.type === 'text') textSoFar += b.text.length;
    if (b.type === 'image') {
      imageRatios.push(textSoFar / totalTextLen);
    }
  }

  console.log(`  WeChat: ${totalTextLen} chars, ${imageRatios.length} imgs, disk: ${imageFiles.length} files`);

  // Use min(wechat images, disk files) images
  const numImages = Math.min(imageRatios.length, imageFiles.length);
  const usedRatios = imageRatios.slice(0, numImages);

  // Split markdown body into paragraphs (handle both \r\n and \n)
  const mdBody = parsed.content.replace(/\r\n/g, '\n');
  const paras = mdBody.split(/\n\n+/);

  // Calculate cumulative paragraph lengths for position mapping
  const paraEndPositions = [];
  let cum = 0;
  for (const p of paras) {
    cum += p.length; // Approximate position after this paragraph
    paraEndPositions.push(cum);
  }
  const mdTotal = cum;

  // Map each image ratio to a paragraph insertion point
  const insertAfter = []; // [{ paraIndex, imageFile }]
  for (let i = 0; i < usedRatios.length; i++) {
    const targetPos = usedRatios[i] * mdTotal;
    let paraIdx = 0;
    for (let j = 0; j < paraEndPositions.length; j++) {
      if (paraEndPositions[j] >= targetPos) {
        paraIdx = j;
        break;
      }
    }
    insertAfter.push({ paraIdx, imageFile: imageFiles[i] });
    console.log(`    Image ${i+1}: ratio ${usedRatios[i].toFixed(3)} → after para ${paraIdx}/${paras.length}`);
  }

  // Apply insertions in reverse order to preserve indices
  insertAfter.sort((a, b) => b.paraIdx - a.paraIdx);
  for (const ins of insertAfter) {
    const imgMd = `![](${IMG_PATH}/${slug}/${ins.imageFile})`;
    paras.splice(ins.paraIdx + 1, 0, imgMd);
  }

  const newBody = paras.join('\n\n');
  const newRaw = matter.stringify(newBody, parsed.data);
  fs.writeFileSync(filePath, newRaw, 'utf-8');

  return { status: 'updated', inserted: insertAfter.length };
}

async function main() {
  const files = fs.readdirSync(CONTENT_DIR).filter(f => f.endsWith('.md'));
  let updated = 0, skipped = 0, errors = 0;

  for (const file of files) {
    const slug = file.replace(/\.md$/, '');
    const imgDir = path.join(CONTENT_IMG_DIR, slug);
    if (!fs.existsSync(imgDir)) continue;

    const filePath = path.join(CONTENT_DIR, file);
    const raw = fs.readFileSync(filePath, 'utf-8');
    const parsed = matter(raw);
    if (!parsed.data.wechat_link) continue;

    console.log(`\n📄 ${file}`);
    try {
      const result = await insertImages(file, parsed.data.wechat_link);
      if (result.status === 'updated') {
        console.log(`  ✅ ${result.inserted} images inserted`);
        updated++;
      } else {
        console.log(`  ⏭️  ${result.status}`);
        skipped++;
      }
    } catch (e) {
      console.log(`  ❌ ${e.message}`);
      errors++;
    }
    await new Promise(r => setTimeout(r, 800));
  }

  console.log(`\n${'='.repeat(50)}`);
  console.log(`Updated: ${updated}  Skipped: ${skipped}  Errors: ${errors}`);
}

main().catch(console.error);
