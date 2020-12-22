const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Contract = require('../../models/Contract');
const Entity = require('../../models/Entity');
const Company = require('../../models/Company');

// @route   GET api/contracts
// @desc    Get all contracts
// @access  Private
router.get('/', ensureAuth, async (req, res) => {
  try {
    const contracts = await Contract.find()
      .populate('company' /*, 'name'*/)
      // .populate('entity' /*, 'name'*/)
      .populate({ path: 'entity', populate: { path: 'activityType' } })
      .populate('responsible', 'secondName')
      .populate('reinsurers', 'name')
      .populate('broker', 'name')
      .sort({ createdAt: -1 });

    if (!contracts) {
      return res.status(404).json({ msg: 'Контракты не найдены' });
    }

    return res.json(contracts);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
  }
});

// @route   GET api/contracts/:id
// @desc    Get contract by id
// @access  Private
router.get('/:id', ensureAuth, async (req, res) => {
  try {
    const contract = await Contract.findById(req.params.id);

    if (!contract) {
      return res.status(404).json({ errors: [{ msg: 'Документ не найден' }] });
    }

    return res.json(contract);
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ errors: [{ msg: 'Документ не найден' }] });
    }

    console.error(err.message);
    return res.status(500).json({ errors: [{ msg: 'Ошибка сервера' }] });
  }
});

// @route   POST api/contracts
// @desc    Create contracts
// @access  Private
router.post(
  '/',
  [
    ensureAuth,
    [
      check('company', 'Укажите наименование компании').not().isEmpty(),
      check('responsible', 'Укажите ответственного сотрудника').not().isEmpty(),
      check('broker', 'Укажите наименование брокера').not().isEmpty(),
      check('brokerEmployee', 'Укажите сотрудника брокера').not().isEmpty(),
      check(
        'commission',
        'Комиссия должна быть числом не менее 0 и не более 100'
      ).custom((val, req) => {
        return val !== '' && parseFloat(val) >= 0 && parseFloat(val) <= 100;
      }),
      check('contracts.*.entity', 'Укажите наименование юрлица')
        .not()
        .isEmpty(),
      check('contracts.*.activityType', 'Укажите ОКВЭД юрлица').not().isEmpty(),
      check('contracts.*.contactPerson', 'Укажите контактное лицо юрлица')
        .not()
        .isEmpty(),
      check('contracts.*.email', 'Укажите корректный email юрлица').isEmail(),
      check('contracts.*.premium', 'Премия должна быть числом больше 0').custom(
        (val, req) => {
          return val && parseFloat(val) > 0;
        }
      ),
      check('contracts.*.number', 'Укажите номер договора').not().isEmpty(),
      check('contracts.*.startDate', 'Укажите дату начала договора')
        .not()
        .isEmpty(),
      check('contracts.*.endDate', 'Укажите дату окончания договора')
        .not()
        .isEmpty(),
      check(
        'contracts.*.nextRenewalDate',
        'Укажите дату следующей пролонгации договора'
      )
        .not()
        .isEmpty(),
      check(
        'contracts.*.reinsurerIds',
        'Укажите хотя бы одного перестраховщика'
      ).isArray({ min: 1 }),
      check(
        'contracts.*.population',
        'Численность должна быть целым числом больше 0'
      ).custom((val, req) => {
        return val && parseInt(val) > 0;
      }),
      check('contracts.*.contractType', 'Укажите тип договора').isIn([
        'Пролонгация',
        'Новый'
      ]),
      check(
        'contracts.*.renewalProbability',
        'Вероятность должна быть числом от 0 до 100'
      ).custom((val, req) => {
        return val === '' || (parseInt(val) >= 0 && parseInt(val) <= 100);
      })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      rightToMention,
      responsible,
      brokerId,
      brokerEmployee,
      commission,
      contracts
    } = req.body;

    let { companyId } = req.body;

    try {
      if (!companyId) {
        const newCompany = new Company({
          name: company ? company : '',
          rightToMention: rightToMention ? rightToMention : '',
          // responsible: responsible ? responsible : '',
          // broker: brokerId ? brokerId : '',
          // brokerEmployee: brokerEmployee ? brokerEmployee : '',
          // commission: commission ? commission : '',
          createdBy: req.user.id
        });

        await newCompany.save();
        companyId = newCompany._id;
      } else {
        let companyToUpdate = await Company.findById(companyId);

        if (!companyToUpdate) {
          return res
            .status(404)
            .json({ errors: [{ msg: 'Документ не найден' }] });
        }

        if (company) companyToUpdate.name = company;
        if (rightToMention) companyToUpdate.rightToMention = rightToMention;
        // if (responsible) company.responsible = responsible;
        // if (brokerId) company.broker = brokerId;
        // if (brokerEmployee) company.brokerEmployee = brokerEmployee;
        // if (commission) company.commission = commission;
        companyToUpdate.createdBy = req.user.id;

        await companyToUpdate.save();
      }

      let newContracts = [];

      for (const contract of contracts) {
        const {
          entity,
          activityType,
          contactPerson,
          phoneNumber,
          email,
          premium,
          number,
          startDate,
          endDate,
          nextRenewalDate,
          // responsible,
          reinsurerIds,
          // broker,
          // brokerEmployee,
          population,
          contractType,
          // commission,
          renewalProbability
        } = contract;

        let { entityId } = contract;

        if (!entityId) {
          const newEntity = new Entity({
            name: entity ? entity : '',
            activityType: activityType ? activityType : '',
            contactPerson: contactPerson ? contactPerson : '',
            phoneNumber: phoneNumber ? phoneNumber : '',
            email: email ? email : '',
            createdBy: req.user.id
          });

          await newEntity.save();
          entityId = newEntity._id;
        } else {
          let entityToUpdate = await Entity.findById(entityId);

          if (!entityToUpdate) {
            return res
              .status(404)
              .json({ errors: [{ msg: 'Документ не найден' }] });
          }

          if (entity) entityToUpdate.name = entity;
          if (activityType) entityToUpdate.activityType = activityType;
          if (contactPerson) entityToUpdate.contactPerson = contactPerson;
          if (phoneNumber) entityToUpdate.phoneNumber = phoneNumber;
          if (email) entityToUpdate.email = email;
          entityToUpdate.createdBy = req.user.id;

          await entityToUpdate.save();
        }

        newContracts.push({
          company: companyId ? companyId : '',
          entity: entityId ? entityId : '',
          premium: premium !== '' ? premium : '',
          number: number ? number : '',
          startDate: startDate ? startDate : '',
          endDate: endDate ? endDate : '',
          nextRenewalDate: nextRenewalDate ? nextRenewalDate : '',
          responsible: responsible ? responsible : '',
          reinsurers: reinsurerIds ? reinsurerIds : [],
          broker: brokerId ? brokerId : '',
          brokerEmployee: brokerEmployee ? brokerEmployee : '',
          population: population !== '' ? population : '',
          contractType: contractType ? contractType : '',
          commission: commission !== '' ? commission : '',
          renewalProbability:
            renewalProbability !== '' ? renewalProbability : '',
          createdBy: req.user.id
        });
      }

      await Contract.insertMany(newContracts);

      return res.json(newContracts);
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

// @route   PUT api/contracts/:id
// @desc    Update contract
// @access  Private
router.put(
  '/:id',
  [
    ensureAuth,
    [
      check('company', 'Укажите наименование компании').not().isEmpty(),
      check('responsible', 'Укажите ответственного сотрудника').not().isEmpty(),
      check('broker', 'Укажите наименование брокера').not().isEmpty(),
      check('brokerEmployee', 'Укажите сотрудника брокера').not().isEmpty(),
      check(
        'commission',
        'Комиссия должна быть числом не менее 0 и не более 100'
      ).custom((val, req) => {
        return val !== '' && parseFloat(val) >= 0 && parseFloat(val) <= 100;
      }),
      check('contracts.*.entity', 'Укажите наименование юрлица')
        .not()
        .isEmpty(),
      check('contracts.*.activityType', 'Укажите ОКВЭД юрлица').not().isEmpty(),
      check('contracts.*.contactPerson', 'Укажите контактное лицо юрлица')
        .not()
        .isEmpty(),
      check('contracts.*.email', 'Укажите корректный email юрлица').isEmail(),
      check('contracts.*.premium', 'Премия должна быть числом больше 0').custom(
        (val, req) => {
          return val && parseFloat(val) > 0;
        }
      ),
      check('contracts.*.number', 'Укажите номер договора').not().isEmpty(),
      check('contracts.*.startDate', 'Укажите дату начала договора')
        .not()
        .isEmpty(),
      check('contracts.*.endDate', 'Укажите дату окончания договора')
        .not()
        .isEmpty(),
      check(
        'contracts.*.nextRenewalDate',
        'Укажите дату следующей пролонгации договора'
      )
        .not()
        .isEmpty(),
      check(
        'contracts.*.reinsurerIds',
        'Укажите хотя бы одного перестраховщика'
      ).isArray({ min: 1 }),
      check(
        'contracts.*.population',
        'Численность должна быть целым числом больше 0'
      ).custom((val, req) => {
        return val && parseInt(val) > 0;
      }),
      check('contracts.*.contractType', 'Укажите тип договора').isIn([
        'Пролонгация',
        'Новый'
      ]),
      check(
        'contracts.*.renewalProbability',
        'Вероятность должна быть числом от 0 до 100'
      ).custom((val, req) => {
        return val === '' || (parseInt(val) >= 0 && parseInt(val) <= 100);
      })
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      let contract = await Contract.findById(req.params.id);

      if (!contract) {
        return res
          .status(404)
          .json({ errors: [{ msg: 'Документ не найден' }] });
      }

      const {
        company,
        rightToMention,
        responsible,
        brokerId,
        brokerEmployee,
        commission,
        entity,
        activityType,
        contactPerson,
        phoneNumber,
        email,
        premium,
        number,
        startDate,
        endDate,
        nextRenewalDate,
        reinsurerIds,
        population,
        contractType,
        renewalProbability
      } = req.body;

      let { companyId, entityId } = req.body;

      if (!companyId) {
        const newCompany = new Company({
          name: company ? company : '',
          rightToMention: rightToMention ? rightToMention : '',
          createdBy: req.user.id
        });

        await newCompany.save();
        companyId = newCompany._id;
      } else {
        let companyToUpdate = await Company.findById(companyId);

        if (!companyToUpdate) {
          return res
            .status(404)
            .json({ errors: [{ msg: 'Документ не найден' }] });
        }

        if (company) companyToUpdate.name = company;
        if (rightToMention) companyToUpdate.rightToMention = rightToMention;
        companyToUpdate.createdBy = req.user.id;

        await companyToUpdate.save();
      }

      if (!entityId) {
        const newEntity = new Entity({
          name: entity ? entity : '',
          activityType: activityType ? activityType : '',
          contactPerson: contactPerson ? contactPerson : '',
          phoneNumber: phoneNumber ? phoneNumber : '',
          email: email ? email : '',
          createdBy: req.user.id
        });

        await newEntity.save();
        entityId = newEntity._id;
      } else {
        let entityToUpdate = await Entity.findById(entityId);

        if (!entityToUpdate) {
          return res
            .status(404)
            .json({ errors: [{ msg: 'Документ не найден' }] });
        }

        if (entity) entityToUpdate.name = entity;
        if (activityType) entityToUpdate.activityType = activityType;
        if (contactPerson) entityToUpdate.contactPerson = contactPerson;
        if (phoneNumber) entityToUpdate.phoneNumber = phoneNumber;
        if (email) entityToUpdate.email = email;
        entityToUpdate.createdBy = req.user.id;

        await entityToUpdate.save();
      }

      contract.company = companyId;
      contract.entity = entityId;
      if (premium !== '') contract.premium = premium;
      if (number) contract.number = number;
      if (startDate) contract.startDate = startDate;
      if (endDate) contract.endDate = endDate;
      if (nextRenewalDate) contract.nextRenewalDate = nextRenewalDate;
      if (responsible) contract.responsible = responsible;
      if (reinsurerIds) contract.reinsurers = reinsurerIds;
      if (brokerId) contract.broker = brokerId;
      if (brokerEmployee) contract.brokerEmployee = brokerEmployee;
      if (population !== '') contract.population = population;
      if (contractType) contract.contractType = contractType;
      if (commission !== '') contract.commission = commission;
      if (renewalProbability !== '') renewalProbability = renewalProbability;
      contract.createdBy = req.user.id;

      await contract.save();

      return res.json(contract);
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

module.exports = router;
