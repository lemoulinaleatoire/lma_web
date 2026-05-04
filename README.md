# Le Moulin Aleatoire（偶然的风车）

偶然的风车 —— 一个基于 Node.js + Angular 的中文学术博客，承载译介、创作与思想档案。运营者为「随机轮编辑部」。

## 技术栈

| 层 | 技术 | 说明 |
|---|---|---|
| 后端 | Node.js + Express | REST API，Markdown 文件解析，内存缓存 |
| 前端 | Angular 18（standalone） | 懒加载路由，响应式布局，纯 CSS 无框架 |
| 内容 | Markdown（YAML front matter） | 文件即数据库，gray-matter + marked 渲染 |
| 构建 | Angular CLI + concurrently | 生产构建 ~92KB gzipped（首屏） |

## 快速启动

```bash
# 安装依赖
npm install

# 开发模式（Express :3000 + Angular :4200，自动代理 API）
npm run dev

# 仅后端
npm run server

# 生产构建 + 启动
npm run build
npm start          # → http://localhost:3000
```

---

## 网站架构

```
                         content/*.md  ←──  Markdown 文件（47篇文章）
                              │
              ┌───────────────┴───────────────┐
              │  server/utils/markdown-parser  │
              │  gray-matter + marked + 缓存    │
              └───────────────┬───────────────┘
                              │
              ┌───────────────┴───────────────┐
              │      server/routes/*.js        │
              │  posts / publications / ...    │
              └───────────────┬───────────────┘
                              │  JSON API (:3000)
              ┌───────────────┴───────────────┐
              │  src/app/services/api.service  │
              │         HttpClient             │
              └───────────────┬───────────────┘
                              │
              ┌───────────────┴───────────────┐
              │   14 个懒加载页面组件            │
              │   RouterLink + innerHTML       │
              └───────────────────────────────┘
```

**数据流**：Markdown 文件 → `gray-matter` 解析 YAML 元数据 → `marked` 渲染 HTML → 短代码处理 → JSON API → Angular 组件渲染。

**缓存策略**：`markdown-parser.js` 内建 5 秒 TTL 内存缓存。`listContent()` 和 `getContent()` 各自独立缓存键，避免每次 API 请求重新读取并解析全部 Markdown 文件。

---

## 文件结构与功能说明

```
le-moulin-aleatoire/
│
├── package.json              # 依赖与脚本（express, gray-matter, marked, Angular 18）
├── angular.json              # Angular CLI 配置（builder: application）
├── proxy.conf.json           # 开发代理：/api → localhost:3000
├── tsconfig.json             # TypeScript 基础配置
├── tsconfig.app.json         # 应用 TypeScript 配置
│
├── server/                   # ═══ 后端 ═══
│   ├── index.js              # Express 入口：注册路由、API端点、生产静态文件服务
│   ├── routes/               # 路由模块（每个内容类型一个文件）
│   │   ├── posts.js          # 文章列表（分类/标签/作者/搜索过滤 + 分页）+ 文章详情
│   │   ├── publications.js   # 出版列表 + 详情
│   │   ├── projects.js       # 项目列表 + 详情
│   │   ├── resources.js      # 资源列表 + 详情
│   │   └── talks.js          # 讲座列表 + 详情
│   └── utils/
│       ├── markdown-parser.js # 核心：gray-matter + marked 解析、短代码处理、缓存层
│       └── wechat-importer.js # 微信公众号文章批量导入工具（两阶段）
│
├── content/                  # ═══ 内容（Markdown 文件数据库）═══
│   ├── post/                 # 47 篇文章 → /post/:slug
│   ├── publication/          # 1 篇出版 → /publication/:slug
│   ├── project/              # 1 个项目 → /project/:slug
│   ├── resource/             # 2 个资源 → /resource/:slug
│   ├── talk/                 # 1 个讲座 → /talk/:slug
│   └── data/                 # 结构化数据（JSON）
│       ├── friends.json      # 友链列表（头像、名称、描述、链接）
│       └── social.json       # 社交媒体链接
│
├── src/                      # ═══ 前端 ═══
│   ├── index.html            # HTML 入口（lang=zh-CN，无外部字体）
│   ├── main.ts               # Angular 引导
│   ├── styles.scss           # 全局样式：CSS 变量、排版、6种内容标记系统
│   └── app/
│       ├── app.component.ts  # 根组件：Header + RouterOutlet + Footer
│       ├── app.config.ts     # 应用配置：路由、HttpClient、变更检测
│       ├── app.routes.ts     # 14 条路由定义（全部懒加载）
│       │
│       ├── services/
│       │   └── api.service.ts # API 服务：类型接口、TYPE_NAMES 常量、HTTP 方法
│       │
│       ├── shared/           # 可复用组件
│       │   ├── article-card/ # 文章卡片（封面缩略图、类型徽章、标签、作者链接）
│       │   ├── site-header/  # 顶部导航（7 个链接 + 迷你搜索框）
│       │   └── site-footer/  # 底部信息（版权、许可、RSS）
│       │
│       └── pages/            # 页面组件（全部 standalone + 懒加载）
│           ├── home/         # 首页：Hero + 最新6篇文章 + 近期讲座
│           ├── post-list/    # 文章列表：分类标签页 + 标签云 + 分页
│           ├── post-detail/  # 文章详情：封面、元数据、标签、HTML 内容
│           ├── search/       # 全站搜索：关键词 → 结果列表
│           ├── author-detail/# 作者页面：作者名 + 该作者全部文章
│           ├── about/        # 关于页面（静态内容）
│           ├── links/        # 友链页面（调用 friends API + 短代码渲染）
│           ├── publication-list/  # 出版列表
│           ├── publication-detail/# 出版详情
│           ├── project-list/ # 项目列表
│           ├── resource-list/# 资源列表
│           └── talk-list/    # 讲座列表
│
├── public/                   # 静态资源（复制到 dist 根目录）
│   └── assets/               # 图片、字体等
│
└── dist/                     # 构建输出（ng build 生成）
    └── browser/              # 生产静态文件
```

### 关键文件间的调用关系

```
server/index.js
  ├─ require('./routes/posts')          → server/routes/posts.js
  ├─ require('./routes/publications')   → server/routes/publications.js
  ├─ require('./routes/projects')       → server/routes/projects.js
  ├─ require('./routes/resources')      → server/routes/resources.js
  ├─ require('./routes/talks')          → server/routes/talks.js
  ├─ /api/tags   → listContent('post')  → server/utils/markdown-parser.js
  ├─ /api/authors → listContent('post')  → server/utils/markdown-parser.js
  ├─ /api/search  → listContent + getContent → server/utils/markdown-parser.js
  └─ /api/data/:file → fs.readFileSync  → content/data/*.json

src/app/app.routes.ts
  ├─ ''                 → pages/home/home.component.ts
  ├─ 'post'             → pages/post-list/post-list.component.ts
  ├─ 'post/:slug'       → pages/post-detail/post-detail.component.ts
  ├─ 'tag/:tag'         → pages/post-list/post-list.component.ts（复用）
  ├─ 'author/:slug'     → pages/author-detail/author-detail.component.ts
  ├─ 'search'           → pages/search/search.component.ts
  ├─ 'about'            → pages/about/about.component.ts
  ├─ 'links'            → pages/links/links.component.ts
  ├─ 'publication'      → pages/publication-list/...
  ├─ 'publication/:slug'→ pages/publication-detail/...
  ├─ 'project'          → pages/project-list/...
  ├─ 'resource'         → pages/resource-list/...
  ├─ 'talk'             → pages/talk-list/...
  └─ '**'               → redirect to ''

src/app/services/api.service.ts  ← 所有页面组件通过此服务消费 API
src/app/shared/article-card/     ← home, post-list, search, author-detail 共用
```

---

## Markdown 文章格式

每篇文章是一个 `.md` 文件，包含 YAML front matter 和 Markdown 正文：

```yaml
---
title: "文章标题"
date: 2026-01-15
type: "translation"        # translation | post | guest
author: "随机轮编辑部"
tags: ["阿尔都塞", "意识形态", "马克思主义"]
cover: "/img/covers/slug.jpg"
wordcount: 8500
license: "CC BY-NC 4.0"
subtitle: "副标题（可选）"
pdf: "/pdf/article.pdf"    # 可选
bibtex: "ref.bib"          # 可选
---

## 正文标题

正文内容使用标准 Markdown 语法...
```

### 文章类型

| type | 中文名 | 说明 |
|------|--------|------|
| `translation` | 译坊 | 翻译作品 |
| `post` | 创磨 | 原创文章 |
| `guest` | 信风 | 客座文章 |

### 短代码（Shortcodes）

在 Markdown 正文中使用：

| 短代码 | 功能 | 渲染效果 |
|--------|------|----------|
| `{{< article-download >}}` | 文章下载卡片 | 显示 PDF 链接、BibTeX、许可、字数 |
| `{{< friends >}}` | 友链列表 | 渲染 `content/data/friends.json` 中的友链卡片 |

### 内容标记系统（6 种 CSS 类）

Markdown 渲染后通过 CSS 实现视觉区分：

| 标记 | 渲染方式 | CSS 类 | 视觉效果 |
|------|----------|--------|----------|
| 术语原文 | `(ForeignTerm)` → HTML 转换 | `.term-original` | 斜体 + ⟨⟩ 角括号 |
| 编者注 | `#编者按内容#` → 短代码转换 | `.editor-note` | 紫色左边框 + "编者按" 标签 |
| 作者注 | `<div class="author-note">` | `.author-note` | 金色左边框 + "作者注" 标签 |
| 译者注 | `<div class="translator-note">` | `.translator-note` | 蓝色左边框 + "译者注" 标签 |
| 参考文献 | `<div class="references">` | `.references` | 分隔区域 + "参考文献" 标题 |
| 尾注 | `<div class="endnotes">` | `.endnotes` | 自动编号 + "注释" 标题 |

定义位置：`src/styles.scss:62-113`。

---

## API 接口文档

Base URL: `http://localhost:3000/api`

### 文章（Posts）

```
GET /api/posts?page=1&limit=10&tag=阿尔都塞&category=yifang&author=随机轮编辑部&search=关键词
```

| 参数 | 类型 | 说明 |
|------|------|------|
| `page` | number | 页码，默认 1 |
| `limit` | number | 每页数量，默认 10 |
| `tag` | string | 标签过滤（精确匹配） |
| `category` | string | 分类过滤：`yifang`=译坊, `chuangmo`=创磨, `xinfeng`=信风 |
| `author` | string | 作者过滤（精确匹配） |
| `search` | string | 全文搜索（标题 + 标签 + 正文） |

返回：
```json
{
  "posts": [{ "slug": "...", "title": "...", "date": "...", "type": "translation",
              "author": "...", "tags": ["..."], "cover": "...", "wordcount": 8500,
              "excerpt": "纯文本摘要（200字）..." }],
  "total": 47,
  "page": 1,
  "totalPages": 5
}
```

```
GET /api/posts/:slug
```

返回单篇文章完整数据（含 `html` 字段）。

### 标签（Tags）

```
GET /api/tags
```

返回：
```json
[{ "name": "阿尔都塞", "count": 23 }, { "name": "拉图尔", "count": 13 }, ...]
```

### 作者（Authors）

```
GET /api/authors
```

返回：
```json
[{ "name": "随机轮编辑部", "count": 44 }, { "name": "宿何", "count": 3 }]
```

```
GET /api/authors/:slug
```

返回作者信息及其全部文章列表：
```json
{ "name": "随机轮编辑部", "posts": [...] }
```

### 搜索（Search）

```
GET /api/search?q=关键词&page=1&limit=10
```

先匹配标题和标签，若未匹配则回退到全文搜索文章正文。返回格式与 `/api/posts` 相同。

### 其他内容类型

```
GET /api/publications        # 出版列表
GET /api/publications/:slug  # 出版详情
GET /api/projects            # 项目列表
GET /api/projects/:slug      # 项目详情
GET /api/resources           # 资源列表
GET /api/resources/:slug     # 资源详情
GET /api/talks               # 讲座列表
GET /api/talks/:slug         # 讲座详情
```

各端点返回格式与 `/api/posts` 一致（但无分页）。

### 数据（Data）

```
GET /api/data/friends   # 友链 JSON
GET /api/data/social    # 社交媒体链接 JSON
```

---

## 微信公众号导入工具

`server/utils/wechat-importer.js` 提供两阶段批量导入：

**阶段一** — PowerShell 抓取：
```powershell
# 在 PowerShell 中逐篇抓取 HTML
Invoke-WebRequest -Uri "https://mp.weixin.qq.com/s/..." -OutFile "$env:TEMP/wechat_import/article_01.html"
```

**阶段二** — Node.js 清洗生成：
```bash
node server/utils/wechat-importer.js
```

功能：
- 解析 HTML 提取标题、日期、正文
- `cleanContent()` 将微信 HTML（section/span/style/img）清洗为标准 Markdown
- `formatContent()` 将 `#编者按#` 转换为 `<div class="editor-note">`
- `autoTags()` 基于 24 组关键词自动打标签
- `guessType()` / `guessAuthor()` 推断文章类型和作者
- 输出到 `content/post/{slug}.md`

### 自动标签关键词映射

24 组标签关键词定义在 `TAG_KEYWORDS` 数组中。英文关键词使用 `\b` 单词边界匹配（防止 "ANT" 误匹配 "participant"），中文关键词使用 `includes()` 子串匹配。

---

## CSS 设计系统

`src/styles.scss` 定义全局设计变量和排版：

```css
--bg: #fafaf8;          /* 背景色（暖白） */
--text: #1a1a1a;        /* 正文色 */
--muted: #6b6b6b;       /* 次要文字 */
--accent: #8b1a2b;      /* 强调色（深红） */
--border: #e0ddd8;      /* 边框色 */
--card-bg: #fff;        /* 卡片背景 */
--link: #8b1a2b;        /* 链接色 */
--max-width: 760px;     /* 正文最大宽度 */
--font-serif: Georgia, 'Noto Serif SC', ...;  /* 衬线字体栈 */
--font-sans: -apple-system, 'PingFang SC', ...; /* 无衬线字体栈 */
```

所有外部字体已移除，使用系统字体栈保证加载速度和跨平台一致性。

---

## 部署

```bash
# 1. 构建前端
npm run build          # → dist/browser/

# 2. 启动生产服务器
npm start              # → Express 在 :3000 提供服务 + 静态文件

# 3. 生产环境配置
# - 将 dist/browser/ 和 server/ 部署到服务器
# - 设置环境变量 PORT=80（或其他端口）
# - 建议在前面加 Nginx 反向代理，处理 SSL 和静态文件缓存
```

Express 自动检测 `dist/browser/` 目录：API 路由优先（`/api/*`），其他路径回退到 `index.html`（支持 Angular 客户端路由）。

---

## 未来完善计划

### 短期（立即可做）
- [ ] **RSS/Atom Feed**：基于 `listContent('post')` 生成 XML feed
- [ ] **封面图片**：47 篇文章均引用 `/img/covers/{slug}.jpg` 占位，需实际制作
- [ ] **文章类型审查**：44 篇导入文章默认 `type: translation`，需人工审核部分原创或客座文章
- [ ] **日期校对**：部分导入文章的日期可能不准确，需与公众号原文核对
- [ ] **内容完善**：出版、项目、资源、讲座目录目前各仅 1-2 条内容，需补充

### 中期（规划中）
- [ ] **术语表页面**：扩展 `content/resource/ant-glossary.md` 为交互式术语表
- [ ] **双语支持**：为术语和关键概念添加中英对照提示（tooltip）
- [ ] **图片本地化**：将微信图片 URL（`mmbiz.qpic.cn`）下载到本地以避免外链失效
- [ ] **LaTeX 数学公式**：集成 KaTeX 或 MathJax（部分分析马克思主义文章需要）
- [ ] **文章内脚注跳转**：Markdown 脚注的双向链接
- [ ] **暗色模式**：CSS 变量切换

### 长期（考虑中）
- [ ] **评论系统**：集成 Giscus（GitHub Discussions）或 Waline
- [ ] **全文搜索升级**：集成 Minisearch 或 Pagefind 实现客户端索引搜索
- [ ] **管理后台**：简单的 Markdown 在线编辑器 + Git 推送
- [ ] **多语言界面**：英文版站点切换
- [ ] **自动化微信公众号同步**：监听新文章推送 → 自动导入

---

## 维护指南

### 添加新文章
1. 在 `content/post/` 下创建 `{slug}.md`
2. 按上述格式填写 YAML front matter
3. 用 Markdown 撰写正文
4. 将封面图片放入 `public/img/covers/{slug}.jpg`
5. 重启服务器（开发模式下自动检测文件变化需额外实现）

### 添加新标签
1. 在文章的 `tags: [...]` 中添加即可
2. `/api/tags` 自动聚合所有文章的标签
3. 如需自动标签匹配，编辑 `server/utils/wechat-importer.js` 中的 `TAG_KEYWORDS`

### 修改样式
- 全局样式：`src/styles.scss`
- 组件样式：各组件 `.ts` 文件中的 `styles` 数组（Angular 组件内样式）
- 生产构建时 CSS 自动提取、压缩、带哈希命名

### 调试
```bash
# 开发模式（热重载）
npm run dev

# 检查 API
curl http://localhost:3000/api/posts?limit=1
curl http://localhost:3000/api/tags

# 清除缓存（重启服务器即可）
```
