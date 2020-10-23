const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Reinsurer = require('../../models/Reinsurer');

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
