const express = require('express');
const router = express.Router();
const { listContent, getContent } = require('../utils/markdown-parser');

router.get('/', (req, res) => {
  const talks = listContent('talk');
  res.json(talks);
});

router.get('/:slug', (req, res) => {
  const talk = getContent('talk', req.params.slug);
  if (!talk) return res.status(404).json({ error: 'Not found' });
  res.json(talk);
});

module.exports = router;
