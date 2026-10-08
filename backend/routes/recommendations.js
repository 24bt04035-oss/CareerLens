const express = require('express');
const router = express.Router();
const { store } = require('../data/store');

/**
 * GET /api/recommendations
 * Dynamically generated recommendations according to gaps for target career
 */
router.get('/', (req, res) => {
  try {
    const data = store.getRecommendations();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate recommendations: ' + err.message });
  }
});

module.exports = router;
