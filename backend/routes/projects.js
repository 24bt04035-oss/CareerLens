const express = require('express');
const router = express.Router();
const { store } = require('../data/store');

router.get('/', (req, res) => {
  try {
    const projects = store.getProjects();
    res.json(projects);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch projects: ' + err.message });
  }
});

router.post('/', (req, res) => {
  try {
    const { title, description, technologies, link, role } = req.body;
    if (!title || !technologies) {
      return res.status(400).json({ error: 'Title and technologies are required' });
    }
    const project = store.addProject({ title, description, technologies, link, role });
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add project: ' + err.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    store.deleteProject(req.params.id);
    res.json({ success: true, message: 'Project removed' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete project: ' + err.message });
  }
});

module.exports = router;
