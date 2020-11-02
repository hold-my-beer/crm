const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Opportunity = require('../../models/Opportunity');
const Company = require('../../models/Company');
const Broker = require('../../models/Broker');

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
      // companyId,
      broker,
      // brokerId,
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

    let { companyId, brokerId } = req.body;

    try {
      if (!companyId) {
        const newCompany = new Company({
          name: company,
          createdBy: req.user.id
        });

        await newCompany.save();
        companyId = newCompany._id;
      }

      if (!brokerId) {
        const newBroker = new Broker({
          name: broker,
          employees: [{ name: contactPerson }],
          createdBy: req.user.id
        });

        await newBroker.save();
        brokerId = newBroker._id;
      } else {
        let brokerToUpdate = await Broker.findById(brokerId);
        if (
          brokerToUpdate.employees
            .map(employee => employee.name)
            .indexOf(contactPerson) == -1
        ) {
          brokerToUpdate.employees.push({ name: contactPerson });
          await brokerToUpdate.save();
        }
      }

      const opportunity = new Opportunity({
        company: companyId,
        broker: brokerId,
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

    if (!opportunities) {
      return res.status(404).json({ msg: 'Тендеры не найдены' });
    }

    return res.json(opportunities);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
  }
});

// @route   GET api/opportunities/:id
// @desc    Get opportunity by id
// @access  Private
router.get('/:id', ensureAuth, async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id)
      .populate('company', 'name')
      .populate('broker', 'name')
      .populate('responsible', 'secondName');

    if (!opportunity) {
      return res.status(404).json({ msg: 'Тендер не найден' });
    }

    return res.json(opportunity);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Тендер не найден' });
    }

    console.log(err);
    return res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
  }
});

module.exports = router;
