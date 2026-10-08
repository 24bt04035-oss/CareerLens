const express = require('express');
const router = express.Router();
const { store } = require('../data/store');
const { authenticateToken } = require('../middleware/auth');

/**
 * GET /api/profile
 */
router.get('/', authenticateToken, (req, res) => {
  try {
    const profile = store.getProfile(req.user?.id);
    res.json(profile);
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve profile: ' + err.message });
  }
});

/**
 * PUT /api/profile
 */
router.put('/', (req, res) => {
  try {
    const updated = store.updateProfile(req.body);
    res.json({
      success: true,
      message: 'Profile updated successfully',
      profile: updated
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update profile: ' + err.message });
  }
});

/**
 * POST /api/profile/target-career
 */
router.post('/target-career', (req, res) => {
  try {
    const { targetCareerSlug } = req.body;
    if (!targetCareerSlug) {
      return res.status(400).json({ error: 'targetCareerSlug is required' });
    }
    const updated = store.updateProfile({ targetCareerSlug });
    res.json({
      success: true,
      message: 'Target career updated',
      profile: updated
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update target career: ' + err.message });
  }
});

module.exports = router;
