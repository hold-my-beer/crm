const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Company = require('../../models/Company');

// @route   GET api/companies
// @desc    Get all companies
// @access  Private
router.get('/', ensureAuth, async (req, res) => {
  try {
    const companies = await Company.find().sort({ name: 1 });

    return res.json(companies);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
  }
});

// @route   POST api/companies
// @desc    Create company
// @access  Private
router.post(
  '/',
  [
    ensureAuth,
    [check('name', 'Укажите наименование компании').not().isEmpty()]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name } = req.body;

    try {
      const company = new Company({
        name,
        createdBy: req.user.id
      });

      await company.save();

      return res.json(company);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
    }
  }
);

module.exports = router;
