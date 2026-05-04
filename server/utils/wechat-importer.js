/**
 * WeChat 文章导入器 v2
 * 两阶段：PowerShell抓取 → Node.js清洗生成
 */
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const CONTENT_DIR = path.join(__dirname, '..', '..', 'content', 'post');
const TEMP_DIR = path.join(require('os').tmpdir(), 'wechat_import');

// 关键词 → 标签 (concrete, discriminative tags only)
// Design principle: each tag should appear on 1-25 articles, never 30+
const TAG_KEYWORDS = [
  // === 人物 ===
  ['阿尔都塞', ['阿尔都塞', 'Althusser', 'althusser']],
  ['拉图尔', ['拉图尔', 'Latour', 'latour']],
  ['斯宾诺莎', ['斯宾诺莎', 'Spinoza', 'spinoza']],
  ['福柯', ['福柯', 'Foucault', 'foucault']],
  ['布尔迪厄', ['布尔迪厄', 'Bourdieu', 'bourdieu']],
  ['德勒兹', ['德勒兹', 'Deleuze', 'deleuze']],
  ['鲍德里亚', ['鲍德里亚', 'Baudrillard']],
  ['吉登斯', ['吉登斯', 'Giddens']],
  ['斯皮瓦克', ['斯皮瓦克', 'Spivak']],
  ['卡隆', ['卡隆', 'Callon', 'callon']],

  // === 理论与方法 ===
  ['ANT', ['ANT', 'actor-network', 'actant', '行动者网络', '行动元', '铭写']],
  ['STS', ['STS', '科学技术研究', '科学技术学', 'SSK', '社会建构']],
  ['分析马克思主义', ['分析马克思主义', 'Analytical Marxism', 'Roemer', 'G\\.A\\. Cohen', 'Elster', 'Kalecki', 'CECP']],
  ['相遇唯物主义', ['相遇唯物主义', 'aleatory materialism', '偶然唯物主义', '偶然相遇']],
  ['意识形态理论', ['意识形态国家机器', 'ideological state apparatus', '意识形态批判', '质询', 'interpellation']],
  ['生命政治', ['生命政治', 'biopolitic', '生命权力', 'biopower']],
  ['控制社会', ['控制社会', '规训社会', 'society of control', 'disciplinary society']],
  ['后结构主义', ['后结构主义', 'poststructural', '解构', 'deconstruction']],
  ['现象学', ['现象学', 'phenomenology', '身体现象学']],
  ['认识论', ['认识论断裂', 'epistemological break', 'epistemology', '问题式', 'problematic']],

  // === 研究领域与议题 ===
  ['剥削与阶级', ['剥削理论', '剩余榨取', '阶级斗争', '小布尔乔亚', '无产者', '阶级结构', 'class struggle', 'exploitation theory']],
  ['资本主义批判', ['资本主义批判', '资本批判', '资本积累', '新自由主义', 'neoliberalism', '金融化']],
  ['帝国主义与殖民', ['帝国主义', 'imperialism', '殖民主义', '不平等交换', '后殖民', 'postcolonial']],
  ['数字方法', ['数字方法', '计算社会学', '数据化', '数字治理', '数字人文', 'digital method']],
  ['翻译研究', ['译法', '术语学', '汉语转译', '翻译策略', '翻译理论', '不可译']],
  ['生态学', ['盖娅', '生态学', '气候危机', '人类世', 'anthropocene', 'ecology']],
  ['女性主义', ['女性主义', 'feminism', 'feminist', '性别', 'gender']],
  ['媒介研究', ['新媒体', '媒介研究', '数字媒介', '媒体理论', '传播学']],
  ['组织理论', ['组织理论', 'organization theory', '组织研究']],
  ['技术哲学', ['技术哲学', 'philosophy of technology', '技术决定论', '技术物']],
  ['日本研究', ['战后日本', '天皇制', '日语研究', '日本思想史']],
  ['人工智能', ['人工智能', 'AI ethics', '机器学习', '神经网络', 'deep learning']],

  // === 特殊 ===
  ['发刊词', ['发刊词', '创刊', '开场白']],
];

// Check if keyword matches — uses word boundary for English, substring for Chinese
function matchKeyword(text, kw) {
  const lower = text.toLowerCase();
  const kl = kw.toLowerCase();
  // Chinese or multi-word English: use includes
  if (/[一-鿿]/.test(kw) || kw.includes(' ')) {
    return lower.includes(kl);
  }
  // Short English: use word boundary to avoid substring matches (ANT in "participant")
  const re = new RegExp('\\b' + kl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '\\b', 'i');
  return re.test(text);
}

function autoTags(title, text) {
  const combined = title + ' ' + text;
  const tags = TAG_KEYWORDS.filter(([, kws]) => kws.some(k => matchKeyword(combined, k))).map(([t]) => t);
  if (tags.length === 0) return ['未分类'];
  return tags.length <= 8 ? tags : tags.slice(0, 8);
}

function slugify(title) {
  return title.replace(/[^\w一-鿿]+/g, '-').replace(/^-+|-+$/g, '').toLowerCase().slice(0, 60);
}

// 格式化内容（编者注/译者注/术语等）
function formatContent(raw) {
  let html = raw;

  // #...# → 编者注
  html = html.replace(/#([^#]+)#/g, '<div class="editor-note">$1</div>');

  // 斜体标记 *xxx* → <em> (marked 会处理)
  // 保留给 marked

  // 术语原文 (Foreign Terms)
  html = html.replace(/[（(]([A-Za-zÀ-ÿ\s\-'’]{3,})[）)]/g, '<span class="term-original">$1</span>');

  return html;
}

function cleanContent(content) {
  let c = content;
  // 保留图片
  c = c.replace(/<img[^>]*data-src="([^"]+)"[^>]*>/g, '![]($1)');
  c = c.replace(/<img[^>]*src="([^"]+)"[^>]*>/g, '![]($1)');
  // 移除 style
  c = c.replace(/\s*style="[^"]*"/g, '');
  // span → 无
  c = c.replace(/<\/?(span|font)[^>]*>/g, '');
  // section → div
  c = c.replace(/<\/?section[^>]*>/g, '');
  // p → 保留
  c = c.replace(/<p[^>]*>/g, '\n\n');
  c = c.replace(/<\/p>/g, '');
  // h1-h3
  c = c.replace(/<h1[^>]*>(.*?)<\/h1>/g, '\n\n# $1\n\n');
  c = c.replace(/<h2[^>]*>(.*?)<\/h2>/g, '\n\n## $1\n\n');
  c = c.replace(/<h3[^>]*>(.*?)<\/h3>/g, '\n\n### $1\n\n');
  // strong/em
  c = c.replace(/<strong[^>]*>(.*?)<\/strong>/g, '**$1**');
  c = c.replace(/<em[^>]*>(.*?)<\/em>/g, '*$1*');
  // a
  c = c.replace(/<a[^>]*href="([^"]*)"[^>]*>(.*?)<\/a>/g, '[$2]($1)');
  // br
  c = c.replace(/<br\s*\/?>/g, '\n');
  // 剩余HTML标签
  c = c.replace(/<[^>]+>/g, '');
  // 实体
  c = c.replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&mdash;/g, '—');
  // 多余空行
  c = c.replace(/\n{3,}/g, '\n\n').trim();
  return c;
}

// 猜测作者
function guessAuthor(title) {
  if (title.includes('译坊') || title.includes('译文') || title.includes('译')) return '随机轮编辑部';
  return '随机轮编辑部'; // 默认
}

// 猜测类型
function guessType(title) {
  if (title.includes('译坊') || title.includes('译文')) return 'translation';
  return 'post';
}

function importFromFiles() {
  if (!fs.existsSync(TEMP_DIR)) {
    console.error(`目录不存在: ${TEMP_DIR}`);
    return [];
  }

  const files = fs.readdirSync(TEMP_DIR).filter(f => f.endsWith('.txt'));
  const results = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(TEMP_DIR, file), 'utf-8');
    const lines = raw.split('\n');
    let title = '', date = '', content = '';
    let inContent = false;

    for (const line of lines) {
      if (line.startsWith('TITLE:')) title = line.slice(6).trim();
      else if (line.startsWith('DATE:')) date = line.slice(5).trim();
      else if (line === '---') inContent = true;
      else if (inContent) content += line + '\n';
    }

    if (!title) { console.log(`SKIP ${file}: no title`); continue; }

    content = formatContent(content);
    const mdContent = cleanContent(content);
    const tags = autoTags(title, mdContent);
    const slug = slugify(title);
    const type = guessType(title);
    const author = guessAuthor(title);

    const frontMatter = [
      '---',
      `title: "${title.replace(/"/g, '\\"')}"`,
      `date: ${date}`,
      `type: "${type}"`,
      `author: "${author}"`,
      `tags: [${tags.map(t => `"${t}"`).join(', ')}]`,
      `cover: "/img/covers/${slug}.jpg"`,
      `wordcount: ${mdContent.length}`,
      '---',
    ].join('\n');

    const md = `${frontMatter}\n\n${mdContent}\n`;
    const outPath = path.join(CONTENT_DIR, `${slug}.md`);
    fs.writeFileSync(outPath, md, 'utf-8');

    console.log(`OK: ${title} → ${slug}.md [${tags.join(', ')}]`);
    results.push({ title, slug, tags, date });
  }

  return results;
}

// CLI
if (require.main === module) {
  importFromFiles();
}

module.exports = { importFromFiles, autoTags, slugify };
