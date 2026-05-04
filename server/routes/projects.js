const express = require('express');
const router = express.Router();
const { listContent, getContent } = require('../utils/markdown-parser');

router.get('/', (req, res) => {
  const projects = listContent('project');
  res.json(projects);
});

router.get('/:slug', (req, res) => {
  const project = getContent('project', req.params.slug);
  if (!project) return res.status(404).json({ error: 'Not found' });
  res.json(project);
});

module.exports = router;
