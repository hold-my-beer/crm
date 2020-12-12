const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../../middleware/auth');

const Entity = require('../../models/Entity');

// @route   GET api/entities
// @desc    Get all entities
// @access  Private
router.get('/', ensureAuth, async (req, res) => {
  try {
    const entities = await Entity.find().sort({ name: 1 });

    return res.json(entities);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
  }
});

module.exports = router;
