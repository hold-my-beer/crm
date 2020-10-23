const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Opportunity = require('../../models/Opportunity');

// @route   POST api/opportunities
// @desc    Create opportunity
// @access  Private
router.post(
  '/',
  [
    ensureAuth,
    [
      check('company', 'Укажите наименование компании').not().isEmpty(),
      check('broker', 'Укажите наименование брокера').not().isEmpty(),
      check('contactPerson', 'Укажите имя контакта').not().isEmpty(),
      check('deadlineDate', 'Укажите дедлайн').not().isEmpty(),
      check('responsible', 'Укажите ответственного сотрудника').not().isEmpty()
      // check('premium', 'Премия должна быть числом больше 0').custom(
      //   (val, req) => {
      //     return val && parseFloat(val) > 0;
      //   }
      // ),
      // check(
      //   'population',
      //   'Численность должна быть целым числом больше 0'
      // ).custom((val, req) => {
      //   return val && parseInt(val) > 0;
      // })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      broker,
      contactPerson,
      deadlineDate,
      responsible,
      // status,
      comment,
      // sentDate,
      quoteType,
      renewalDate
      // reinsurers,
      // premium,
      // population
    } = req.body;

    try {
      const opportunity = new Opportunity({
        company,
        broker,
        contactPerson,
        deadlineDate,
        responsible,
        status: 'В работе',
        comment: comment ? comment : '',
        // sentDate,
        quoteType: quoteType ? quoteType : '',
        renewalDate: renewalDate ? renewalDate : '',
        // reinsurers,
        // premium,
        // population,
        createdBy: req.user.id
      });

      await opportunity.save();

      return res.json(opportunity);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
    }
  }
);

// @route   GET api/opportunities
// @desc    Get all opportunities
// @access  Private
router.get('/', ensureAuth, async (req, res) => {
  try {
    const opportunities = await Opportunity.find()
      .populate('company', 'name')
      .populate('broker', 'name')
      .populate('responsible', 'secondName')
      .sort({ createdAt: -1 });

    return res.json(opportunities);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
  }
});

module.exports = router;
