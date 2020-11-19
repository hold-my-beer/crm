const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Lead = require('../../models/Lead');
const Company = require('../../models/Company');
const Broker = require('../../models/Broker');

// @route   POST api/leads
// @desc    Create lead
// @access  Private
router.post(
  '/',
  [
    ensureAuth,
    [
      check('company', 'Укажите наименование компании').not().isEmpty(),
      check('broker', 'Укажите наименование брокера').not().isEmpty(),
      check('contactPerson', 'Укажите имя контакта').not().isEmpty(),
      check('renewalDate', 'Укажите следующую дату пролонгации')
        .not()
        .isEmpty(),
      check('contactDate', 'Укажите следующую дату связи').not().isEmpty(),
      check('responsible', 'Укажите ответственного сотрудника').not().isEmpty(),
      check('copyTo', 'Укажите сотрудника в копии').not().isEmpty(),
      check('premium', 'Премия должна быть числом больше 0').custom(
        (val, req) => {
          return val ? parseFloat(val) > 0 : true;
        }
      )
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
      renewalDate,
      contactDate,
      responsible,
      copyTo,
      premium,
      comment
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

      const lead = new Lead({
        company: companyId,
        broker: brokerId,
        contactPerson: contactPerson ? contactPerson : '',
        renewalDate: renewalDate ? renewalDate : '',
        contactDate: contactDate ? contactDate : '',
        responsible: responsible ? responsible : '',
        copyTo: copyTo ? copyTo : '',
        premium: premium ? premium : '',
        comment: comment ? comment : '',
        createdBy: req.user.id
      });

      await lead.save();

      return res.json(lead);
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
    }
  }
);

// @route   PUT api/leads/:id
// @desc    Update lead
// @access  Private
router.put(
  '/:id',
  [
    ensureAuth,
    [
      check('company', 'Укажите наименование компании').not().isEmpty(),
      check('broker', 'Укажите наименование брокера').not().isEmpty(),
      check('contactPerson', 'Укажите имя контакта').not().isEmpty(),
      check('renewalDate', 'Укажите следующую дату пролонгации')
        .not()
        .isEmpty(),
      check('contactDate', 'Укажите следующую дату связи').not().isEmpty(),
      check('responsible', 'Укажите ответственного сотрудника').not().isEmpty(),
      check('copyTo', 'Укажите сотрудника в копии').not().isEmpty(),
      check('status', 'Укажите статус').not().isEmpty(),
      check('premium', 'Премия должна быть числом больше 0').custom(
        (val, req) => {
          return val ? parseFloat(val) > 0 : true;
        }
      )
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
      renewalDate,
      contactDate,
      responsible,
      copyTo,
      premium,
      comment
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

      let lead = await Lead.findById(req.params.id);

      if (!lead) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Документ не найден' }] });
      }

      lead.company = companyId;
      lead.broker = brokerId;
      if (contactPerson) lead.contactPerson = contactPerson;
      if (renewalDate) lead.renewalDate = renewalDate;
      if (contactDate) lead.contactDate = contactDate;
      if (responsible) lead.responsible = responsible;
      if (copyTo) lead.copyTo = copyTo;
      if (premium) lead.premium = premium;
      if (comment) lead.comment = comment;
      lead.createdBy = req.user.id;

      await lead.save();

      return res.json(lead);
    } catch (err) {
      if (err.kind === 'ObjectId') {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Документ не найден' }] });
      }

      console.error(err.message);
      return res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
    }
  }
);

// @route   GET api/leads
// @desc    Get all leads
// @access  Private
router.get('/', ensureAuth, async (req, res) => {
  try {
    const leads = await Lead.find()
      .populate('company', 'name')
      .populate('broker', 'name')
      .populate('responsible', 'secondName')
      .populate('copyTo', 'secondName')
      .sort({ createdAt: -1 });

    if (!leads) {
      return res.status(404).json({ msg: 'Лиды не найдены' });
    }

    return res.json(leads);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
  }
});

// @route   GET api/leads/:id
// @desc    Get lead by id
// @access  Private
router.get('/:id', ensureAuth, async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('company', 'name')
      .populate('broker', 'name')
      .populate('responsible', 'secondName')
      .populate('copyTo', 'secondName');

    if (!lead) {
      return res.status(404).json({ msg: 'Лид не найден' });
    }

    return res.json(lead);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Документ не найден' }] });
    }

    console.log(err);
    return res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
  }
});

// @route   DELETE api/leads/:id
// @desc    Delete lead
// @access  Private
router.delete('/:id', ensureAuth, async (req, res) => {
  try {
    await lead.findByIdAndDelete(req.params.id);

    return res.json({ msg: 'Лид успешно удален' });
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Документ не найден' }] });
    }

    console.log(err);
    return res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
  }
});

module.exports = router;
