import React, { Fragment, useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getContractById,
  updateContract,
  removeContract
} from '../../actions/contract';
import { getCompanies } from '../../actions/company';
import { getBrokers } from '../../actions/broker';
import { getReinsurers } from '../../actions/reinsurer';
import { getUsers } from '../../actions/user';
import { getEntities } from '../../actions/entity';
import { getActivityTypes } from '../../actions/activityType';
import { showDelete } from '../../actions/del';
import PropTypes from 'prop-types';

import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import NumberFormat from 'react-number-format';
import Spinner from '../layout/Spinner';

const EditContract = ({
  getContractById,
  updateContract,
  removeContract,
  getCompanies,
  getBrokers,
  getReinsurers,
  getUsers,
  getEntities,
  getActivityTypes,
  showDelete,
  company: { companies },
  broker: { brokers },
  user: { users },
  reinsurer: { reinsurers },
  contract: { contract, loading },
  constant: { constant },
  activityType: { activityTypes },
  entity: { entities },
  confirmed,
  match,
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
    reinsurerNames: [],
    reinsurerIds: [],
    population: '',
    contractType: '',
    renewalProbability: 100
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
    entity,
    entityId,
    activityType,
    contactPerson,
    phoneNumber,
    email,
    premium,
    number,
    startDate,
    endDate,
    nextRenewalDate,
    reinsurerNames,
    reinsurerIds,
    population,
    contractType,
    renewalProbability
  } = formData;

  const [brokerEmployees, setBrokerEmployees] = useState([]);

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

  const [okved, setOkved] = useState({
    code: '',
    name: ''
  });

  const { code, name } = okved;

  const getName = val => {
    for (let i = 0; i < activityTypes.length; i++) {
      if (activityTypes[i].code === val) {
        return activityTypes[i].name;
      }
    }
    return '';
  };

  const onOkvedChange = e => {
    setOkved({
      code: e.target.value,
      name: getName(e.target.value)
    });

    onChange(e);
  };

  useEffect(() => {
    getContractById(match.params.id);
    getCompanies();
    getBrokers();
    getReinsurers();
    getUsers();
    getEntities();
    getActivityTypes();
  }, [
    getContractById,
    match.params.id,
    getCompanies,
    getBrokers,
    getReinsurers,
    getUsers,
    getEntities,
    getActivityTypes
  ]);

  useEffect(() => {
    if (activityType && activityTypes.length) {
      const indexOfActivity = activityTypes
        .map(item => item._id)
        .indexOf(activityType);

      setOkved({
        code: activityTypes[indexOfActivity].code,
        name: activityTypes[indexOfActivity].name
      });
    }
  }, [activityType, activityTypes]);

  useEffect(() => {
    setFormData({
      company: contract && contract.company.name ? contract.company.name : '',
      companyId: contract && contract.company._id ? contract.company._id : '',
      rightToMention:
        contract && contract.company.rightToMention
          ? contract.company.rightToMention
          : '',
      responsible:
        contract && contract.responsible._id ? contract.responsible._id : '',
      broker: contract && contract.broker.name ? contract.broker.name : '',
      brokerId: contract && contract.broker._id ? contract.broker._id : '',
      brokerEmployee:
        contract && contract.brokerEmployee ? contract.brokerEmployee : '',
      commission: contract && contract.commission ? contract.commission : '',
      entity: contract && contract.entity.name ? contract.entity.name : '',
      entityId: contract && contract.entity._id ? contract.entity._id : '',
      activityType:
        contract &&
        contract.entity &&
        contract.entity.activityType &&
        contract.entity.activityType._id
          ? contract.entity.activityType._id
          : '',
      contactPerson:
        contract && contract.entity.contactPerson
          ? contract.entity.contactPerson
          : '',
      phoneNumber:
        contract && contract.entity.phoneNumber
          ? contract.entity.phoneNumber
          : '',
      email: contract && contract.entity.email ? contract.entity.email : '',
      premium: contract && contract.premium ? contract.premium : '',
      number: contract && contract.number ? contract.number : '',
      startDate:
        contract && contract.startDate
          ? moment(contract.startDate).format('YYYY-MM-DD')
          : '',
      endDate:
        contract && contract.endDate
          ? moment(contract.endDate).format('YYYY-MM-DD')
          : '',
      nextRenewalDate:
        contract && contract.nextRenewalDate
          ? moment(contract.nextRenewalDate).format('YYYY-MM-DD')
          : '',
      reinsurerNames:
        contract && contract.reinsurers.length !== 0
          ? contract.reinsurers.map(reinsurer => reinsurer.name)
          : [],
      reinsurerIds:
        contract && contract.reinsurers.length !== 0
          ? contract.reinsurers.map(reinsurer => reinsurer._id)
          : [],
      population: contract && contract.population ? contract.population : '',
      contractType:
        contract && contract.contractType ? contract.contractType : '',
      renewalProbability:
        contract && contract.renewalProbability
          ? contract.renewalProbability
          : 100
    });
  }, [contract]);

  useEffect(() => {
    confirmed && removeContract(match.params.id, history);
  }, [confirmed, removeContract, match.params.id]);

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
        break;
      }
      default:
        return '';
    }
  };

  const onChange = e => {
    const name = e.target.name;
    const val = e.target.value;

    setFormData({
      ...formData,
      [name]:
        name !== 'reinsurerNames'
          ? name === 'premium' ||
            name === 'population' ||
            name === 'renewalProbability'
            ? parseInt(val.replace(/\s+/g, ''))
            : val
          : e.target.checked
          ? [...reinsurerNames, val]
          : [...reinsurerNames.filter(item => item !== val)],
      companyId: name === 'company' ? getId('company', val) : companyId,
      entityId: name === 'entity' ? getId('entity', val) : entityId,
      activityType: name === 'code' ? getId('okved', val) : activityType,
      brokerId: name === 'broker' ? getId('broker', val) : brokerId,
      reinsurerIds:
        name === 'reinsurerNames'
          ? e.target.checked
            ? [...reinsurerIds, getId('reinsurerNames', val)]
            : reinsurerIds.filter(
                reinsurerId => reinsurerId !== getId('reinsurerNames', val)
              )
          : reinsurerIds
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    updateContract(match.params.id, formData, history);
  };

  return (
    <Fragment>
      {loading || !contract ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="edit-contract">
            <h1 className="my-1">Редактировать контракт</h1>
            <p className="lead">Измените данные по контракту</p>
            {/* <Link
              to="/create-contracts"
              className="btn btn-small btn-round btn-primary"
            >
              Создать контракты <span className="plus">+</span>
            </Link> */}
            <p className="my-1">
              <small>* поля, обязательные для заполнения</small>
            </p>
            <form onSubmit={e => onSubmit(e)}>
              <div className="edit-contract-parameters">
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
                <div className="form-group">
                  <label htmlFor="entity">Юрлицо *</label>
                  <input
                    type="text"
                    name="entity"
                    id="entity"
                    list="entities"
                    placeholder="Начните ввод..."
                    autoComplete="off"
                    value={entity}
                    onChange={e => onChange(e)}
                  />
                  <datalist id="entities">
                    {entities &&
                      entities.length > 0 &&
                      entities.map(entity => (
                        <option key={entity._id} value={entity.name}></option>
                      ))}
                  </datalist>
                </div>
                <div className="form-group">
                  <label htmlFor="code">ОКВЭД *</label>
                  <input
                    type="text"
                    name="code"
                    id="code"
                    list="codes"
                    placeholder="Начните ввод..."
                    autoComplete="off"
                    value={code}
                    onChange={e => onOkvedChange(e)}
                  />
                  <label>{name.substr(0, 50)}</label>
                  <datalist id="codes">
                    {activityTypes &&
                      activityTypes.length &&
                      activityTypes.map(activityType => (
                        <option
                          key={activityType._id}
                          value={activityType.code}
                        ></option>
                      ))}
                  </datalist>
                </div>
                <div className="form-group">
                  <label htmlFor="contactPerson">Контактное лицо *</label>
                  <input
                    type="text"
                    name="contactPerson"
                    id="contactPerson"
                    placeholder="Начните ввод..."
                    autoComplete="off"
                    value={contactPerson}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phoneNumber">Номер телефона</label>
                  <NumberFormat
                    format="+7 (###) ###-####"
                    allowEmptyFormatting
                    mask="_"
                    name="phoneNumber"
                    id="phoneNumber"
                    autoComplete="off"
                    value={phoneNumber}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email *</label>
                  <input
                    type="email"
                    placeholder="Начните ввод..."
                    name="email"
                    value={email}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="premium">Премия, руб. *</label>
                  <NumberFormat
                    thousandSeparator={' '}
                    name="premium"
                    id="premium"
                    autoComplete="off"
                    value={premium}
                    onChange={e => onChange(e)}
                    placeholder="Начните ввод..."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="number">Номер договора *</label>
                  <input
                    type="text"
                    placeholder="Начните ввод..."
                    name="number"
                    value={number}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="startDate">Дата начала договора *</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    value={startDate}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="endDate">Дата окончания договора *</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    value={endDate}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nextRenewalDate">
                    Дата следующей пролонгации *
                  </label>
                  <input
                    type="date"
                    id="nextRenewalDate"
                    name="nextRenewalDate"
                    value={nextRenewalDate}
                    onChange={e => onChange(e)}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="reinsurerNames">Перестраховщики *</label>
                  <ul id="reinsurerNames">
                    {reinsurers &&
                      reinsurers.map(reinsurer => (
                        <li key={reinsurer._id}>
                          <input
                            type="checkbox"
                            name="reinsurerNames"
                            id={reinsurer.name}
                            value={reinsurer.name}
                            onChange={e => onChange(e)}
                            checked={reinsurerIds.indexOf(reinsurer._id) !== -1}
                          />
                          <label htmlFor={reinsurer.name}>
                            {reinsurer.name}
                          </label>
                        </li>
                      ))}
                  </ul>
                </div>

                <div className="form-group">
                  <label htmlFor="population">Численность *</label>
                  <NumberFormat
                    thousandSeparator={' '}
                    name="population"
                    id="population"
                    autoComplete="off"
                    value={population}
                    onChange={e => onChange(e)}
                    placeholder="Начните ввод..."
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="contractType">Тип контракта *</label>
                  <select
                    name="contractType"
                    id="contractType"
                    value={contractType}
                    onChange={e => onChange(e)}
                  >
                    <option value="" />
                    {constant &&
                      constant.CONTRACT_TYPES.map(contractType => (
                        <option key={uuidv4()} value={contractType}>
                          {contractType}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="renewalProbability">
                    Вероятность пролонгации, % *
                  </label>
                  <input
                    type="number"
                    name="renewalProbability"
                    id="renewalProbability"
                    autoComplete="off"
                    value={renewalProbability}
                    onChange={e => onChange(e)}
                    placeholder="Начните ввод..."
                  />
                </div>
              </div>
              <input
                type="submit"
                className="btn btn-primary btn-block"
                value="Изменить"
              />
            </form>
            <input
              type="button"
              className="btn btn-danger btn-block"
              value="Удалить"
              onClick={e => showDelete('Контракт')}
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

EditContract.propTypes = {
  getContractById: PropTypes.func.isRequired,
  updateContract: PropTypes.func.isRequired,
  removeContract: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired,
  getBrokers: PropTypes.func.isRequired,
  getReinsurers: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  getEntities: PropTypes.func.isRequired,
  getActivityTypes: PropTypes.func.isRequired,
  showDelete: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  broker: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  reinsurer: PropTypes.object.isRequired,
  contract: PropTypes.object.isRequired,
  constant: PropTypes.object.isRequired,
  activityType: PropTypes.object.isRequired,
  entity: PropTypes.object.isRequired,
  confirmed: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  contract: state.contract,
  company: state.company,
  broker: state.broker,
  user: state.user,
  reinsurer: state.reinsurer,
  constant: state.constant,
  activityType: state.activityType,
  entity: state.entity,
  confirmed: state.del.confirmed
});

export default connect(mapStateToProps, {
  getContractById,
  updateContract,
  removeContract,
  getCompanies,
  getBrokers,
  getReinsurers,
  getUsers,
  getEntities,
  getActivityTypes,
  showDelete
})(withRouter(EditContract));
