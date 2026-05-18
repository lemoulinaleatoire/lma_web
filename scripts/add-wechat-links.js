// Batch add wechat_link to article front matter based on 对应表.md
const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const mappingRaw = `analytical-marxism-exploitation-applications.md
发刊词.md|https://mp.weixin.qq.com/s/ivDhTKLbzUn-kiy1v1SUsA
文本与斗争-阿尔都塞在拉美的传播与应用.md|https://mp.weixin.qq.com/s/vChUS5Cuib1I3moUAHflSA
译坊-i-阿尔都塞-论理论工作-困难与资源.md|https://mp.weixin.qq.com/s/KuVRAr_tIR5saARv00nLFQ
译坊-i-分析马克思主义的剥削观-概念议题.md|https://mp.weixin.qq.com/s/-Sc9V2-Oy92CpFNWfZjexw
译坊-i-海湾战争不会发生-鲍德里亚.md|https://mp.weixin.qq.com/s/Csp3-kVNv__QGpfFhUWasw
译坊-i-海湾战争不在发生-鲍德里亚.md|https://mp.weixin.qq.com/s/QZ49EhnexBJTJa0o5YO2SA
译坊-i-技术的-物质的-拉图尔-莱蒙里尔.md|https://mp.weixin.qq.com/s/_Fz5zZ4bIl5tnEgcQmCm4w
译坊-i-灵魂是身体的牢笼-阿尔都塞与福柯-1970-1975.md|https://mp.weixin.qq.com/s/hKV8h3yxIyd8xZLtwIcOFw
译坊-i-论资本主义的诸情动-拉图尔.md|https://mp.weixin.qq.com/s/w7qMkirIvdh9VV1UqcdzxA
译坊-i-弥合鸿沟-自然科学与社会科学的新联盟-拉图尔-等.md|https://mp.weixin.qq.com/s/l4Sd9VPxOgcDA4-56cGX_g
译坊-i-灭绝与未来之终结.md|https://mp.weixin.qq.com/s/wbiatz9G0iyTpo97vfOdGw
译坊-i-能动性-制度与时空分析-吉登斯.md|https://mp.weixin.qq.com/s/UoF8MbKoQiXO5JtHzsYzmw
译坊-i-批判性的疏离or批判性的切近-拉图尔.md|https://mp.weixin.qq.com/s/cf8bRoTuWsWToY779T_nhw
译坊-i-切分网络-strathern.md|https://mp.weixin.qq.com/s/-7LOIHcpFV_PHchXN_gPeQ
译坊-i-行动者-网络理论是一种资本批判理论吗.md|https://mp.weixin.qq.com/s/LMiyiAeC7neE0DrgYn73MQ
译坊-i-幽灵写作-佳亚特里-斯皮瓦克.md|https://mp.weixin.qq.com/s/_ezOjed1R-HRErqOdqJ6JQ
译坊-分析马克思主义的历史理论-下.md|https://mp.weixin.qq.com/s/KaoFYx_ly0akKp_LaksMgA
译坊-福柯-我的身体-这纸-这火焰.md|https://mp.weixin.qq.com/s/nnwXOmXbDQZ6W7yGHhpJ8w
译坊-合作演化的五条规则-上.md|https://mp.weixin.qq.com/s/W7ZtdkY9Oh6dytjANSb7oA
译坊-简论-中的理性.md|https://mp.weixin.qq.com/s/wOuPGb3Lg2auqCCflO65Bg
译坊-迈向斯宾诺莎研究的未来.md|https://mp.weixin.qq.com/s/M4cHysZs1biHsQem5ZUE_Q
译坊-女性主义后-后现代主义的批判制图学-布拉多西蒂.md|https://mp.weixin.qq.com/s/N559rYvSt3AgGNMCuWuN9A
译坊-斯宾诺莎-意志与力量的本体论.md|https://mp.weixin.qq.com/s/COM0PQpftyi3oNL4_ZFXzQ
译坊-斯宾诺莎在-简论-中的本质主义.md|https://mp.weixin.qq.com/s/M4cHysZs1biHsQem5ZUE_Q
译坊-战后日本的-不合时宜-幽灵-关于战后天皇制问题的反思-哈若图宁.md|https://mp.weixin.qq.com/s/EGzESWBUWoBaSzstEvNWlg
译文-i-阿尔都塞的对象-二.md|https://mp.weixin.qq.com/s/9N22FPpkIauW50khSt6Srg
译文-i-阿尔都塞的对象-三.md|https://mp.weixin.qq.com/s/CBDoOBnOMRpYAHYaLXyj9Q
译文-i-阿尔都塞的对象-一.md|https://mp.weixin.qq.com/s/yjZQnetRwxVT4R7Oc9mBOA
译文-i-拆解利维坦-行动者如何构建宏观现实及社会学家的助力-卡隆-amp-拉图尔.md|https://mp.weixin.qq.com/s/VNfXNWsXBghGmYDTL_hKRA
译文-i-后现代之后的组织理论-反思与潜在方向.md|https://mp.weixin.qq.com/s/Copab78BA8TLq5lZfI-teg
译文-i-技术是固化的社会关系.md|https://mp.weixin.qq.com/s/7dK_f8OAEcQuVCanwYCriw
译文-i-理论化后人类主义.md|https://mp.weixin.qq.com/s/C9PBVx0Z0MQXEfdNnA-3Cw
译文-i-评威廉-s-刘易斯著-路易-阿尔都塞与法国马克思主义传统.md|https://mp.weixin.qq.com/s/GkGGrqlzBtezRZ5HlTbZXw
译文-i-算法-节律生态系统-20世纪60年代年代至今的新自由主义耦合体与其病理现象.md|https://mp.weixin.qq.com/s/2mg5jo3qKTBiAa3dTcpIvA
译文-i-晚期阿尔都塞-相遇唯物主义-还是无的哲学.md|https://mp.weixin.qq.com/s/zIJl2cO-SGZVzIqMCPyj1Q
译文-i-我们-仍然-生活在计算机模拟中吗-阿尔都塞与图灵-上.md|https://mp.weixin.qq.com/s/N5KAO9kmgbQaVn0MoycmLA
译文-i-我们-仍然-生活在计算机模拟中吗-阿尔都塞与图灵-下.md|https://mp.weixin.qq.com/s/c7MUUizNxb2MjbWHaC9XWA
译文-i-行动者-网络理论-市场检验-卡隆.md|https://mp.weixin.qq.com/s/ox5OdJKDI8eUiYV69CR2jQ
译文-分析马克思主义的基础.md|https://mp.weixin.qq.com/s/0dAvQ_qvgRXh3Mf4Sj4Ytg
译文-分析马克思主义的历史理论-上.md|https://mp.weixin.qq.com/s/Wj1q472TWnq0dlMFO4K_6A
译文-人与机器-布尔迪厄.md|https://mp.weixin.qq.com/s/gLU9o03TejkM-w9rr7Xz_g
译文-新媒体是什么-新媒体的语言-出版十年之后-加洛韦.md|https://mp.weixin.qq.com/s/OlAoQ2snENjlEZV7RVviFQ
注释-i-阿尔都塞的对象.md|https://mp.weixin.qq.com/s/w8i3fbBgK0ep1jwJqZXqmQ`;

const contentDir = path.join(__dirname, '..', 'content', 'post');

// Parse mapping
const mapping = {};
mappingRaw.split('\n').forEach(line => {
  const trimmed = line.trim();
  if (!trimmed) return;
  const parts = trimmed.split('|');
  if (parts.length === 2 && parts[1].startsWith('https://')) {
    mapping[parts[0]] = parts[1];
  }
});

console.log(`Parsed ${Object.keys(mapping).length} entries from mapping table`);

let updated = 0;
let skipped = 0;
let notFound = 0;

for (const [filename, url] of Object.entries(mapping)) {
  const filePath = path.join(contentDir, filename);

  if (!fs.existsSync(filePath)) {
    console.error(`  NOT FOUND: ${filename}`);
    notFound++;
    continue;
  }

  const raw = fs.readFileSync(filePath, 'utf-8');
  const parsed = matter(raw);

  if (parsed.data.wechat_link) {
    console.log(`  SKIP (already has wechat_link): ${filename}`);
    skipped++;
    continue;
  }

  // Insert wechat_link after the cover field (or at end of front matter)
  parsed.data.wechat_link = url;

  const newContent = matter.stringify(parsed.content, parsed.data);
  fs.writeFileSync(filePath, newContent, 'utf-8');
  console.log(`  UPDATED: ${filename}`);
  updated++;
}

console.log(`\nDone: ${updated} updated, ${skipped} skipped, ${notFound} not found`);
