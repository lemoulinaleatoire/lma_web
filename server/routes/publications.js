const express = require('express');
const router = express.Router();
const { listContent, getContent } = require('../utils/markdown-parser');

router.get('/', (req, res) => {
  const pubs = listContent('publication');
  res.json(pubs);
});

router.get('/:slug', (req, res) => {
  const pub = getContent('publication', req.params.slug);
  if (!pub) return res.status(404).json({ error: 'Not found' });
  res.json(pub);
});

module.exports = router;
