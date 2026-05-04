const express = require('express');
const router = express.Router();
const { listContent, getContent } = require('../utils/markdown-parser');

router.get('/', (req, res) => {
  const resources = listContent('resource');
  res.json(resources);
});

router.get('/:slug', (req, res) => {
  const resource = getContent('resource', req.params.slug);
  if (!resource) return res.status(404).json({ error: 'Not found' });
  res.json(resource);
});

module.exports = router;
