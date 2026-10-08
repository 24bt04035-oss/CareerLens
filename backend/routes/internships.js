const express = require('express');
const router = express.Router();
const { store } = require('../data/store');

router.get('/', (req, res) => {
  try {
    const internships = store.getInternships();
    res.json(internships);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch internships: ' + err.message });
  }
});

router.post('/', (req, res) => {
  try {
    const { company, role, duration, description, technologies } = req.body;
    if (!company || !role) {
      return res.status(400).json({ error: 'Company and role are required' });
    }
    const intern = store.addInternship({ company, role, duration, description, technologies });
    res.status(201).json(intern);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add internship: ' + err.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    store.deleteInternship(req.params.id);
    res.json({ success: true, message: 'Internship removed' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete internship: ' + err.message });
  }
});

module.exports = router;
