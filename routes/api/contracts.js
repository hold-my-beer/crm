const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Contract = require('../../models/Contract');
const Entity = require('../../models/Entity');
const Company = require('../../models/Company');

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
        return val && parseFloat(val) >= 0 && parseFloat(val) <= 100;
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
      check(
        'contracts.*.isRenewal',
        'Укажите, является ли договор пролонгацией'
      ).isBoolean(),
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
          isRenewal,
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

          if (name) entityToUpdate.name = name;
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
          premium: premium ? premium : '',
          number: number ? number : '',
          startDate: startDate ? startDate : '',
          endDate: endDate ? endDate : '',
          nextRenewalDate: nextRenewalDate ? nextRenewalDate : '',
          responsible: responsible ? responsible : '',
          reinsurers: reinsurerIds ? reinsurerIds : [],
          broker: brokerId ? brokerId : '',
          brokerEmployee: brokerEmployee ? brokerEmployee : '',
          population: population ? population : '',
          isRenewal: isRenewal,
          commission: commission ? commission : '',
          renewalProbability: renewalProbability ? renewalProbability : '',
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

module.exports = router;
