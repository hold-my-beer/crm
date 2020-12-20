import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCompanies } from '../../actions/company';
import { getEntities } from '../../actions/entity';
import { getActivityTypes } from '../../actions/activityType';
import { getUsers } from '../../actions/user';
import { getReinsurers } from '../../actions/reinsurer';
import { getBrokers } from '../../actions/broker';
import { addContracts } from '../../actions/contract';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import moment from 'moment';

import CreateContract from './CreateContract';

const CreateContracts = ({
  getCompanies,
  getEntities,
  entity: { entities },
  getActivityTypes,
  activityType: { activityTypes },
  opportunity: { opportunity },
  company: { companies },
  getUsers,
  user: { users },
  getReinsurers,
  reinsurer: { reinsurers },
  getBrokers,
  broker: { brokers },
  addContracts,
  history
}) => {
  const [formData, setFormData] = useState({
    company: '',
    companyId: '',
    rightToMention: 'unknown',
    responsible: '',
    broker: '',
    brokerId: '',
    brokerEmployee: '',
    commission: '',
    contracts: [
      {
        id: uuidv4(),
        entity: '',
        entityId: '',
        activityType: '',
        contactPerson: '',
        phoneNumber: '',
        email: '',
        premium: '',
        number: '',
        startDate: '',
        endDate: '',
        nextRenewalDate: '',
        // responsible: '',
        reinsurerNames: [],
        reinsurerIds: [],
        // broker: '',
        // brokerEmployee: '',
        population: '',
        contractType: '',
        // commission: '',
        renewalProbability: 100
      }
    ]
  });

  const {
    company,
    companyId,
    rightToMention,
    responsible,
    broker,
    brokerId,
    brokerEmployee,
    commission,
    contracts
  } = formData;

  const [brokerEmployees, setBrokerEmployees] = useState([]);

  const getId = (name, val) => {
    switch (name) {
      case 'company': {
        for (let i = 0; i < companies.length; i++) {
          if (companies[i].name === val) {
            return companies[i]._id;
          }
        }
        return '';
      }
      case 'broker': {
        for (let i = 0; i < brokers.length; i++) {
          if (brokers[i].name === val) {
            return brokers[i]._id;
          }
        }
        return '';
      }
      case 'entity': {
        for (let i = 0; i < entities.length; i++) {
          if (entities[i].name === val) {
            return entities[i]._id;
          }
        }
        return '';
      }
      case 'okved': {
        for (let i = 0; i < activityTypes.length; i++) {
          if (activityTypes[i].code === val) {
            return activityTypes[i]._id;
          }
        }
        return '';
      }
      case 'reinsurerNames': {
        for (let i = 0; i < reinsurers.length; i++) {
          if (reinsurers[i].name === val) {
            return reinsurers[i]._id;
          }
        }
        return '';
      }
      default:
        return '';
    }
  };

  const getBrokersEmployees = brokerName => {
    for (let i = 0; i < brokers.length; i++) {
      if (brokers[i].name === brokerName) {
        return brokers[i].employees;
      }
    }
    return [];
  };

  const fillBrokerEmployees = e => {
    setBrokerEmployees(
      brokers && brokers.length > 0 && getBrokersEmployees(e.target.value)
    );
  };

  useEffect(() => {
    if (opportunity) {
      setFormData({
        ...formData,
        company: !opportunity.company ? '' : opportunity.company.name,
        companyId: !opportunity.company ? '' : opportunity.company._id,
        broker: !opportunity.broker ? '' : opportunity.broker.name,
        brokerId: !opportunity.broker ? '' : opportunity.broker._id,
        brokerEmployee: !opportunity.contactPerson
          ? ''
          : opportunity.contactPerson,
        contracts: contracts.map(contract => ({
          ...contract,
          startDate: !opportunity.renewalDate
            ? ''
            : moment(opportunity.renewalDate).format('YYYY-MM-DD'),
          endDate: !opportunity.renewalDate
            ? ''
            : moment(opportunity.renewalDate)
                .add(1, 'years')
                .format('YYYY-MM-DD'),
          nextRenewalDate: !opportunity.renewalDate
            ? ''
            : moment(opportunity.renewalDate)
                .add(1, 'years')
                .format('YYYY-MM-DD'),
          reinsurerIds: !opportunity.reinsurers.length
            ? []
            : opportunity.reinsurers.map(reinsurer => reinsurer._id),
          reinsurerNames: !opportunity.reinsurers.length
            ? []
            : opportunity.reinsurers.map(reinsurer => reinsurer.name)
        }))
      });
    }
  }, [opportunity]);

  useEffect(() => {
    getCompanies();
  }, [getCompanies]);

  useEffect(() => {
    getEntities();
  }, [getEntities]);

  useEffect(() => {
    getActivityTypes();
  }, [getActivityTypes]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  useEffect(() => {
    getReinsurers();
  }, [getReinsurers]);

  useEffect(() => {
    getBrokers();
  }, [getBrokers]);

  const onChange = e => {
    const name = e.target.name;
    const val = e.target.value;

    setFormData({
      ...formData,

      [name]: val,
      commission:
        name === 'commission' ? parseInt(val.replace(/\s+/g, '')) : '',
      companyId: name === 'company' ? getId('company', val) : companyId,
      brokerId: name === 'broker' ? getId('broker', val) : brokerId
    });
  };

  const onContractAdd = e => {
    setFormData({
      ...formData,
      contracts: [
        ...contracts,
        {
          id: uuidv4(),
          entity: '',
          entityId: '',
          activityType: contracts.length ? contracts[0].activityType : '',
          contactPerson: contracts.length ? contracts[0].contactPerson : '',
          phoneNumber: contracts.length ? contracts[0].phoneNumber : '',
          email: contracts.length ? contracts[0].email : '',
          premium: '',
          number: '',
          startDate:
            !opportunity || !opportunity.renewalDate
              ? ''
              : moment(opportunity.renewalDate).format('YYYY-MM-DD'),
          endDate:
            !opportunity || !opportunity.renewalDate
              ? ''
              : moment(opportunity.renewalDate)
                  .add(1, 'years')
                  .format('YYYY-MM-DD'),
          nextRenewalDate:
            !opportunity || !opportunity.renewalDate
              ? ''
              : moment(opportunity.renewalDate)
                  .add(1, 'years')
                  .format('YYYY-MM-DD'),
          // responsible: '',
          reinsurerNames:
            !opportunity || !opportunity.reinsurers.length
              ? []
              : opportunity.reinsurers.map(reinsurer => reinsurer.name),
          reinsurerIds:
            !opportunity || !opportunity.reinsurers.length
              ? []
              : opportunity.reinsurers.map(reinsurer => reinsurer._id),
          // broker: '',
          // brokerEmployee: '',
          population: '',
          contractType: contracts.length ? contracts[0].contractType : '',
          // commission: '',
          renewalProbability: contracts.length
            ? contracts[0].renewalProbability
            : 100
        }
      ]
    });
  };

  const onContractDelete = id => {
    setFormData({
      ...formData,
      contracts: contracts.filter(contract => contract.id !== id)
    });
  };

  const onContractChange = (contractId, e) => {
    const name = e.target.name;
    const val = e.target.value;

    setFormData({
      ...formData,
      contracts: contracts.map(contract =>
        contract.id !== contractId
          ? contract
          : name === 'entity'
          ? { ...contract, entity: val, entityId: getId('entity', val) }
          : name === 'code'
          ? { ...contract, activityType: getId('okved', val) }
          : name === 'reinsurerNames'
          ? e.target.checked
            ? {
                ...contract,
                reinsurerNames: [...contract.reinsurerNames, val],
                reinsurerIds: [
                  ...contract.reinsurerIds,
                  getId('reinsurerNames', val)
                ]
              }
            : {
                ...contract,
                reinsurerNames: [
                  ...contract.reinsurerNames.filter(item => item !== val)
                ],
                reinsurerIds: contract.reinsurerIds.filter(
                  reinsurerId => reinsurerId !== getId('reinsurerNames', val)
                )
              }
          : // : name === 'isRenewal'
          // ? val === 'true'
          //   ? { ...contract, isRenewal: true }
          //   : { ...contract, isRenewal: false }
          name === 'premium'
          ? { ...contract, premium: parseInt(val.replace(/\s+/g, '')) }
          : name === 'population'
          ? { ...contract, population: parseInt(val.replace(/\s+/g, '')) }
          : name === 'renewalProbability'
          ? {
              ...contract,
              renewalProbability: parseInt(val.replace(/\s+/g, ''))
            }
          : { ...contract, [name]: val }
      )
    });
  };

  const onSubmit = e => {
    e.preventDefault();

    addContracts(formData, history);
  };

  return (
    <div className="create-contracts">
      <h1 className="my-1">Создать контракты</h1>
      <p className="lead">Создайте новые контракты</p>
      <small>* поля, обязательные для заполнения</small>
      <form onSubmit={e => onSubmit(e)}>
        <div className="contracts-parameters">
          <div className="form-group">
            <label htmlFor="company">Компания *</label>
            <input
              type="text"
              name="company"
              id="company"
              list="companies"
              placeholder="Начните ввод..."
              autoComplete="off"
              value={company}
              onChange={e => onChange(e)}
            />
            <datalist id="companies">
              {companies &&
                companies.length > 0 &&
                companies.map(company => (
                  <option key={company._id} value={company.name}></option>
                ))}
            </datalist>
          </div>
          <div className="form-group" onChange={e => onChange(e)}>
            <label>Упоминание в тендерах</label>
            <div className="inline-group">
              <input
                type="radio"
                name="rightToMention"
                id="yes"
                value="Да"
                checked={rightToMention === 'Да'}
                readOnly={true}
              />
              <label htmlFor="yes">Да</label>
            </div>
            <div className="inline-group">
              <input
                type="radio"
                name="rightToMention"
                id="no"
                value="Нет"
                checked={rightToMention === 'Нет'}
                readOnly={true}
              />
              <label htmlFor="no">Нет</label>
            </div>
            <div className="inline-group">
              <input
                type="radio"
                name="rightToMention"
                id="unknown"
                value="Не известно"
                checked={rightToMention === 'Не известно'}
                readOnly={true}
              />
              <label htmlFor="unknown">Не известно</label>
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="responsible">Ответственный *</label>
            <select
              name="responsible"
              id="responsible"
              value={responsible}
              onChange={e => onChange(e)}
            >
              <option />
              {users &&
                users.length > 0 &&
                users.map(user => (
                  <option key={user._id} value={user._id}>
                    {user.secondName}
                  </option>
                ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="broker">Брокер *</label>
            <input
              type="text"
              name="broker"
              id="broker"
              list="brokers"
              placeholder="Начните ввод..."
              autoComplete="off"
              value={broker}
              onChange={e => {
                onChange(e);
                fillBrokerEmployees(e);
              }}
            />
            <datalist id="brokers">
              {brokers &&
                brokers.length > 0 &&
                brokers.map(broker => (
                  <option key={broker._id} value={broker.name}></option>
                ))}
            </datalist>
          </div>
          <div className="form-group">
            <label htmlFor="brokerEmployee">Сотрудник брокера *</label>
            <input
              type="text"
              name="brokerEmployee"
              id="brokerEmployee"
              list="brokerEmployees"
              placeholder="Начните ввод..."
              autoComplete="off"
              value={brokerEmployee}
              onChange={e => onChange(e)}
            />
            <datalist id="brokerEmployees">
              {brokerEmployees.map(employee => (
                <option key={employee._id} value={employee.name}></option>
              ))}
            </datalist>
          </div>
          <div className="form-group">
            <label htmlFor="commission">Комиссия, % *</label>
            <input
              type="number"
              name="commission"
              id="commission"
              autoComplete="off"
              value={commission}
              onChange={e => onChange(e)}
              placeholder="Начните ввод..."
            />
          </div>
          {contracts.map(contract => (
            <CreateContract
              key={contract.id}
              index={contracts.indexOf(contract) + 1}
              entities={entities}
              activityTypes={activityTypes}
              contracts={contracts}
              onContractDelete={onContractDelete}
              contract={contract}
              onContractChange={onContractChange}
              // users={users}
              reinsurers={reinsurers}
              // brokers={brokers}
            />
          ))}
          <input
            type="button"
            className="btn btn-small btn-primary btn-round"
            value="Добавить еще один контракт +"
            onClick={e => onContractAdd(e)}
          />
        </div>
        <input
          type="submit"
          className="btn btn-primary btn-block"
          value="Создать контракты"
        />
      </form>
    </div>
  );
};

CreateContracts.propTypes = {
  getCompanies: PropTypes.func.isRequired,
  getEntities: PropTypes.func.isRequired,
  entity: PropTypes.object.isRequired,
  getActivityTypes: PropTypes.func.isRequired,
  activityType: PropTypes.object.isRequired,
  opportunity: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  getReinsurers: PropTypes.func.isRequired,
  reinsurer: PropTypes.object.isRequired,
  getBrokers: PropTypes.func.isRequired,
  broker: PropTypes.object.isRequired,
  addContracts: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  entity: state.entity,
  activityType: state.activityType,
  opportunity: state.opportunity,
  company: state.company,
  user: state.user,
  reinsurer: state.reinsurer,
  broker: state.broker
});

export default connect(mapStateToProps, {
  getCompanies,
  getEntities,
  getActivityTypes,
  getUsers,
  getReinsurers,
  getBrokers,
  addContracts
})(withRouter(CreateContracts));
