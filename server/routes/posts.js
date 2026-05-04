const express = require('express');
const router = express.Router();
const { listContent, getContent } = require('../utils/markdown-parser');

router.get('/', (req, res) => {
  const { page = 1, limit = 10, tag, category, author, search } = req.query;
  let posts = listContent('post');

  // Category filter: 译坊 (translation) / 创磨 (post) / 信风 (guest)
  if (category) {
    const catMap = { 'yifang': 'translation', 'chuangmo': 'post', 'xinfeng': 'guest' };
    const mapped = catMap[category] || category;
    posts = posts.filter(p => p.type === mapped);
  }

  // Tag filter
  if (tag) {
    posts = posts.filter(p => p.tags && p.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
  }

  // Author filter
  if (author) {
    posts = posts.filter(p => p.author === author || (p.authors && p.authors.includes(author)));
  }

  // Full text search
  if (search) {
    const q = search.toLowerCase();
    posts = posts.filter(p => {
      const text = (p.title + ' ' + (p.subtitle || '') + ' ' + (p.html || '') + ' ' + (p.tags || []).join(' ')).toLowerCase();
      return text.includes(q);
    });
  }

  const total = posts.length;
  const totalPages = Math.ceil(total / limit);
  const p = parseInt(page);
  const start = (p - 1) * limit;
  const paged = posts.slice(start, start + parseInt(limit));

  res.json({
    posts: paged,
    total,
    page: p,
    totalPages
  });
});

router.get('/:slug', (req, res) => {
  const post = getContent('post', req.params.slug);
  if (!post) return res.status(404).json({ error: 'Not found' });
  res.json(post);
});

module.exports = router;
