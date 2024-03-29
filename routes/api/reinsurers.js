const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Reinsurer = require('../../models/Reinsurer');

// @route   GET api/reinsurers
// @desc    Get all reinsurers
// @access  Private
router.get('/', ensureAuth, async (req, res) => {
  try {
    const reinsurers = await Reinsurer.find().sort({ name: 1 });

    if (!reinsurers) {
      return res.status(404).json({ msg: 'Перестраховщики не найдены' });
    }

    return res.json(reinsurers);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
  }
});

// @route   POST api/reinsurers
// @desc    Create reinsurer
// @access  Private
router.post(
  '/',
  [
    ensureAuth,
    [check('name', 'Укажите наименование перестраховщика').not().isEmpty()]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    try {
      const reinsurer = new Reinsurer({
        name,
        createdBy: req.user.id
      });

      await reinsurer.save();
      return res.json(reinsurer);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
    }
  }
);

module.exports = router;
