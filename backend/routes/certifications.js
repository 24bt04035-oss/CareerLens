const express = require('express');
const router = express.Router();
const { store } = require('../data/store');

router.get('/', (req, res) => {
  try {
    const certs = store.getCertifications();
    res.json(certs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch certifications: ' + err.message });
  }
});

router.post('/', (req, res) => {
  try {
    const { name, organization, issueDate, domain, credentialUrl } = req.body;
    if (!name || !organization) {
      return res.status(400).json({ error: 'Name and organization are required' });
    }
    const cert = store.addCertification({ name, organization, issueDate, domain, credentialUrl });
    res.status(201).json(cert);
  } catch (err) {
    res.status(500).json({ error: 'Failed to add certification: ' + err.message });
  }
});

router.delete('/:id', (req, res) => {
  try {
    store.deleteCertification(req.params.id);
    res.json({ success: true, message: 'Certification removed' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete certification: ' + err.message });
  }
});

module.exports = router;
