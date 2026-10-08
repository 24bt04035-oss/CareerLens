const express = require('express');
const router = express.Router();
const { store } = require('../data/store');

/**
 * GET /api/careers
 */
router.get('/', (req, res) => {
  try {
    const careers = store.getCareers();
    const studentSkills = store.getSkills();

    // Enrich each career with quick readiness fit for the student
    const enriched = careers.map(c => {
      const fit = store.getAnalysisForCareer(c.slug);
      return {
        ...c,
        fitScore: fit.score,
        matchedCount: fit.matchedCount,
        partialCount: fit.partialCount,
        missingCount: fit.missingCount,
        totalRequiredSkills: c.skills.length
      };
    });

    res.json(enriched);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch careers: ' + err.message });
  }
});

/**
 * GET /api/careers/:id
 */
router.get('/:id', (req, res) => {
  try {
    const career = store.getCareerBySlug(req.params.id);
    if (!career) {
      return res.status(404).json({ error: 'Career profile not found' });
    }
    res.json(career);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch career: ' + err.message });
  }
});

/**
 * GET /api/careers/:id/analysis
 */
router.get('/:id/analysis', (req, res) => {
  try {
    const analysis = store.getAnalysisForCareer(req.params.id);
    res.json(analysis);
  } catch (err) {
    res.status(500).json({ error: 'Failed to compute career analysis: ' + err.message });
  }
});

module.exports = router;
