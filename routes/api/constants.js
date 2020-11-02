const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../../middleware/auth');
const config = require('config');

// @route   GET api/constants
// @desc    Get app constants
// @access  Private
router.get('/', ensureAuth, (req, res) => {
  try {
    const constants = config.get('constants');

    if (!constants) {
      return res.status(404).json({ msg: 'Константы не найдены' });
    }

    res.json(constants);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
  }
});

module.exports = router;
