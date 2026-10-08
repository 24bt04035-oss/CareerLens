const express = require('express');
const router = express.Router();
const { store } = require('../data/store');

/**
 * GET /api/analysis
 * Returns comprehensive readiness analysis for the student's target career
 */
router.get('/', (req, res) => {
  try {
    const analysis = store.getCurrentAnalysis();
    res.json(analysis);
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate readiness analysis: ' + err.message });
  }
});

/**
 * GET /api/analysis/best-fit
 * "Careers You Could Pursue" ranked list across all careers
 */
router.get('/best-fit', (req, res) => {
  try {
    const bestFits = store.getBestFitCareers();
    res.json(bestFits);
  } catch (err) {
    res.status(500).json({ error: 'Failed to rank best fit careers: ' + err.message });
  }
});

/**
 * GET /api/analysis/summary
 * Dashboard KPI snapshot
 */
router.get('/summary', (req, res) => {
  try {
    const profile = store.getProfile();
    const analysis = store.getCurrentAnalysis();
    const bestFits = store.getBestFitCareers();
    const studentSkills = store.getSkills();

    // Technical vs Soft Skills breakdown
    const technicalSkillsCount = studentSkills.filter(s => (s.category || '').toLowerCase() !== 'soft skills').length;
    const softSkillsCount = studentSkills.filter(s => (s.category || '').toLowerCase() === 'soft skills').length;

    res.json({
      student: {
        id: profile.user.id,
        name: profile.user.name,
        university: profile.user.university,
        degree: profile.user.degree,
        graduationYear: profile.user.graduationYear,
        cgpa: profile.cgpa,
        department: profile.department
      },
      kpis: {
        profileCompletion: profile.completionPercentage,
        careerReadiness: analysis.score,
        skillsMatched: `${analysis.matchedCount} / ${analysis.totalRequired}`,
        skillsMatchedCount: analysis.matchedCount,
        totalRequired: analysis.totalRequired,
        skillGaps: analysis.missingCount + analysis.partialCount,
        partialCount: analysis.partialCount,
        missingCount: analysis.missingCount
      },
      targetCareer: analysis.career,
      analysisHeadline: analysis.readinessHeadline,
      readinessLevel: analysis.readinessLevel,
      skillDistribution: {
        technical: technicalSkillsCount,
        soft: softSkillsCount,
        total: studentSkills.length
      },
      topRecommendedCareers: bestFits.slice(0, 3)
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to build analysis summary: ' + err.message });
  }
});

module.exports = router;
