const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Broker = require('../../models/Broker');

// @route   GET api/brokers
// @desc    Get all brokers
// @access  Private
router.get('/', ensureAuth, async (req, res) => {
  try {
    const brokers = await Broker.find().sort({ name: 1 });

    if (!brokers) {
      return res.status(404).json({ msg: 'Брокеры не найдены' });
    }

    return res.json(brokers);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
  }
});

// @route   POST api/brokers
// @desc    Create broker
// @access  Private
router.post(
  '/',
  [ensureAuth, [check('name', 'Укажите наименование брокера').not().isEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    try {
      const broker = new Broker({
        name,
        createdBy: req.user.id
      });

      await broker.save();
      return res.json(broker);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
    }
  }
);

module.exports = router;
