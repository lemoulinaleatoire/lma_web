const express = require('express');
const cors = require('cors');
const path = require('path');
const postsRouter = require('./routes/posts');
const publicationsRouter = require('./routes/publications');
const projectsRouter = require('./routes/projects');
const resourcesRouter = require('./routes/resources');
const talksRouter = require('./routes/talks');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// API routes
app.use('/api/posts', postsRouter);
app.use('/api/publications', publicationsRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/resources', resourcesRouter);
app.use('/api/talks', talksRouter);

// Tags endpoint
app.get('/api/tags', (req, res) => {
  const { listContent } = require('./utils/markdown-parser');
  const posts = listContent('post');
  const tagMap = {};
  posts.forEach(p => {
    (p.tags || []).forEach(t => {
      tagMap[t] = (tagMap[t] || 0) + 1;
    });
  });
  const tags = Object.entries(tagMap).map(([name, count]) => ({ name, count }));
  res.json(tags);
});

// Authors endpoint
app.get('/api/authors', (req, res) => {
  const { listContent } = require('./utils/markdown-parser');
  const posts = listContent('post');
  const authorMap = {};
  posts.forEach(p => {
    const name = p.author || '宿何';
    if (!authorMap[name]) authorMap[name] = { name, count: 0 };
    authorMap[name].count++;
  });
  res.json(Object.values(authorMap));
});

app.get('/api/authors/:slug', (req, res) => {
  const { listContent } = require('./utils/markdown-parser');
  const posts = listContent('post');
  const slug = decodeURIComponent(req.params.slug);
  const authorPosts = posts.filter(p => (p.author || '宿何') === slug);
  res.json({ name: slug, posts: authorPosts });
});

// Search endpoint
app.get('/api/search', (req, res) => {
  const { listContent, getContent } = require('./utils/markdown-parser');
  const { q, page = 1, limit = 10 } = req.query;
  if (!q) return res.json({ results: [], total: 0 });
  const posts = listContent('post');
  const lower = q.toLowerCase();
  // Search titles, tags, and full body (fetch html on demand for matches)
  const results = posts.filter(p => {
    const metaText = (p.title + ' ' + (p.subtitle || '') + ' ' + (p.tags || []).join(' ')).toLowerCase();
    if (metaText.includes(lower)) return true;
    // Fall back to full content search
    const full = getContent('post', p.slug);
    return full && full.html.toLowerCase().includes(lower);
  });
  const total = results.length;
  const p = parseInt(page);
  const paged = results.slice((p - 1) * limit, p * limit);
  res.json({ results: paged, total, page: p, totalPages: Math.ceil(total / limit) });
});

// Data endpoint
app.get('/api/data/:file', (req, res) => {
  const yaml = require('js-yaml');
  const fs = require('fs');
  const filePath = path.join(__dirname, '..', 'content', 'data', `${req.params.file}.json`);
  try {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    res.json(data);
  } catch {
    res.json([]);
  }
});

// Serve static files from public/
app.use(express.static(path.join(__dirname, '..', 'public')));

// In production, serve Angular build (if available — skip when separated deployment)
const distPath = path.join(__dirname, '..', 'dist', 'browser');
const fs = require('fs');
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    if (!req.url.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
}

// Health check for uptime monitoring
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
