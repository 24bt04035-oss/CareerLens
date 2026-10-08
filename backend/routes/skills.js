const express = require('express');
const router = express.Router();
const { store } = require('../data/store');

/**
 * GET /api/skills
 */
router.get('/', (req, res) => {
  try {
    const studentSkills = store.getSkills();
    const suggestedPool = store.getSuggestedSkills();
    res.json({
      skills: studentSkills,
      suggestedPool,
      totalCount: studentSkills.length
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch skills: ' + err.message });
  }
});

/**
 * POST /api/skills
 */
router.post('/', (req, res) => {
  try {
    const { name, proficiency, category } = req.body;
    if (!name || !proficiency) {
      return res.status(400).json({ error: 'Skill name and proficiency are required' });
    }

    const saved = store.addSkill({ name, proficiency, category });
    res.status(201).json({
      success: true,
      message: 'Skill added or updated successfully',
      skill: saved
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add skill: ' + err.message });
  }
});

/**
 * PUT /api/skills/:id
 */
router.put('/:id', (req, res) => {
  try {
    const updated = store.updateSkill(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json({
      success: true,
      message: 'Skill updated successfully',
      skill: updated
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update skill: ' + err.message });
  }
});

/**
 * DELETE /api/skills/:id
 */
router.delete('/:id', (req, res) => {
  try {
    const success = store.deleteSkill(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Skill not found' });
    }
    res.json({
      success: true,
      message: 'Skill deleted successfully'
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete skill: ' + err.message });
  }
});

module.exports = router;
