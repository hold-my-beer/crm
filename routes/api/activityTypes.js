const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../../middleware/auth');

const ActivityType = require('../../models/ActivityType');

// @route   GET api/activityTypes
// @desc    Get all activityTypes
// @access  Private
router.get('/', ensureAuth, async (req, res) => {
  try {
    const activityTypes = await ActivityType.find().sort({ code: 1 });

    return res.json(activityTypes);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
  }
});

module.exports = router;
