import React, { Fragment, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  getOpportunityById,
  updateOpportunity,
  removeOpportunity
} from '../../actions/opportunity';
import { getCompanies } from '../../actions/company';
import { getBrokers } from '../../actions/broker';
import { getReinsurers } from '../../actions/reinsurer';
import { getUsers } from '../../actions/user';
import { showDelete } from '../../actions/del';
import PropTypes from 'prop-types';
import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import NumberFormat from 'react-number-format';

// import DeleteModal from '../layout/DeleteModal';
import Spinner from '../layout/Spinner';

const EditOpportunity = ({
  getOpportunityById,
  updateOpportunity,
  removeOpportunity,
  getCompanies,
  getBrokers,
  getReinsurers,
  getUsers,
  showDelete,
  company: { companies },
  broker: { brokers },
  user: { users },
  reinsurer: { reinsurers },
  opportunity: { opportunity, loading },
  constant: { constant },
  confirmed,
  match,
  history
}) => {
  //   const [className, setClassName] = useState('delete-modal');

  //   const onResetClassName = () => {
  //     setClassName('delete-modal');
  //   };

  const [formData, setFormData] = useState({
    company: '',
    companyId: '',
    broker: '',
    brokerId: '',
    contactPerson: '',
    deadlineDate: '',
    responsible: '',
    status: '',
    sentDate: '',
    comment: '',
    quoteType: '',
    renewalDate: '',
    reinsurerNames: [],
    reinsurerIds: [],
    premium: '',
    population: ''
  });

  const {
    company,
    companyId,
    broker,
    brokerId,
    contactPerson,
    deadlineDate,
    responsible,
    status,
    sentDate,
    comment,
    quoteType,
    renewalDate,
    reinsurerNames,
    reinsurerIds,
    premium,
    population
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

  useEffect(() => {
    getOpportunityById(match.params.id);
    getCompanies();
    getBrokers();
    getReinsurers();
    getUsers();
  }, [
    getOpportunityById,
    match.params.id,
    getCompanies,
    getBrokers,
    getReinsurers,
    getUsers
  ]);

  useEffect(() => {
    setFormData({
      company:
        opportunity && opportunity.company.name ? opportunity.company.name : '',
      companyId:
        opportunity && opportunity.company._id ? opportunity.company._id : '',
      broker:
        opportunity && opportunity.broker.name ? opportunity.broker.name : '',
      brokerId:
        opportunity && opportunity.broker._id ? opportunity.broker._id : '',
      contactPerson:
        opportunity && opportunity.contactPerson
          ? opportunity.contactPerson
          : '',
      deadlineDate:
        opportunity && opportunity.deadlineDate
          ? moment(opportunity.deadlineDate).format('YYYY-MM-DD')
          : '',
      responsible:
        opportunity && opportunity.responsible._id
          ? opportunity.responsible._id
          : '',
      status: opportunity && opportunity.status ? opportunity.status : '',
      sentDate:
        opportunity && opportunity.sentDate
          ? moment(opportunity.sentDate).format('YYYY-MM-DD')
          : '',
      comment: opportunity && opportunity.comment ? opportunity.comment : '',
      quoteType:
        opportunity && opportunity.quoteType ? opportunity.quoteType : '',
      renewalDate:
        opportunity && opportunity.renewalDate
          ? moment(opportunity.renewalDate).format('YYYY-MM-DD')
          : '',
      reinsurerNames:
        opportunity && opportunity.reinsurers.length !== 0
          ? opportunity.reinsurers.map(reinsurer => reinsurer.name)
          : [],
      reinsurerIds:
        opportunity && opportunity.reinsurers.length !== 0
          ? opportunity.reinsurers.map(reinsurer => reinsurer._id)
          : [],
      premium: opportunity && opportunity.premium ? opportunity.premium : '',
      population:
        opportunity && opportunity.population ? opportunity.population : ''
    });
  }, [opportunity]);

  useEffect(() => {
    // console.log(confirmed);
    confirmed && removeOpportunity(match.params.id, history);
  }, [confirmed, removeOpportunity, match.params.id]);

  //   const onAddReinsurerChange = e => {
  //     if (reinsurerNames.indexOf(e.target.value) === -1) {
  //       setFormData({
  //         ...formData,
  //         reinsurerNames: [...reinsurerNames, ...e.target.value]
  //       });
  //     }
  //   };

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
      case 'reinsurerNames': {
        for (let i = 0; i < reinsurers.length; i++) {
          if (reinsurers[i].name === val) {
            return reinsurers[i]._id;
          }
        }
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
          ? name === 'premium' || name === 'population'
            ? parseInt(val.replace(/\s+/g, ''))
            : val
          : e.target.checked
          ? [...reinsurerNames, val]
          : [...reinsurerNames.filter(item => item !== val)],
      companyId: name === 'company' ? getId('company', val) : companyId,
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
    updateOpportunity(match.params.id, formData, history);
  };

  return (
    <Fragment>
      {loading || !opportunity ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="edit-opportunity">
            <h1 className="my-1">Редактировать тендер</h1>
            <p className="lead">Измените данные по тендеру</p>
            <Link to="/create-contracts" className="btn btn-round btn-primary">
              Создать контракты <span className="plus">+</span>
            </Link>
            <p className="my-1">
              <small>* поля, обязательные для заполнения</small>
            </p>
            <form onSubmit={e => onSubmit(e)}>
              <div className="opportunity-parameters">
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
                      companies.map(company => (
                        <option key={company._id} value={company.name}></option>
                      ))}
                  </datalist>
                </div>
                <div className="form-group">
                  <label htmlFor="broker">Брокер *</label>
                  <input
                    type="text"
                    name="broker"
                    id="broker"
                    list="brokers"
                    autoComplete="off"
                    value={broker}
                    onChange={e => {
                      onChange(e);
                      fillBrokerEmployees(e);
                    }}
                    placeholder="Начните ввод..."
                  />
                  <datalist id="brokers">
                    {brokers &&
                      brokers.map(broker => (
                        <option key={broker._id} value={broker.name}></option>
                      ))}
                  </datalist>
                </div>
                <div className="form-group">
                  <label htmlFor="contactPerson">Контактное лицо *</label>
                  <input
                    type="text"
                    name="contactPerson"
                    id="contactPerson"
                    list="contactPersons"
                    autoComplete="off"
                    value={contactPerson}
                    onChange={e => onChange(e)}
                    placeholder="Начните ввод..."
                  />
                  <datalist id="contactPersons">
                    {brokerEmployees.map(employee => (
                      <option key={employee._id} value={employee.name}></option>
                    ))}
                  </datalist>
                </div>
                <div className="form-group">
                  <label htmlFor="deadlineDate">Дедлайн *</label>
                  <input
                    type="date"
                    id="deadlineDate"
                    name="deadlineDate"
                    value={deadlineDate}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="responsible">Ответственный *</label>
                  <select
                    //   type="text"
                    name="responsible"
                    id="responsible"
                    value={responsible}
                    onChange={e => onChange(e)}
                  >
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
                  <label htmlFor="status">Статус *</label>
                  <select
                    type="text"
                    name="status"
                    id="status"
                    value={status}
                    onChange={e => onChange(e)}
                  >
                    {constant.STATUSES &&
                      constant.STATUSES.map(status => (
                        <option key={uuidv4()} value={status}>
                          {status}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="sentDate">Отправлено</label>
                  <input
                    type="date"
                    id="sentDate"
                    name="sentDate"
                    value={sentDate}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="comment">Комментарий</label>
                  <textarea
                    name="comment"
                    id="comment"
                    rows="5"
                    value={comment}
                    onChange={e => onChange(e)}
                  ></textarea>
                </div>

                <div className="form-group">
                  <label htmlFor="quoteType">Тип тендера</label>
                  <select
                    type="text"
                    name="quoteType"
                    id="quoteType"
                    value={quoteType}
                    onChange={e => onChange(e)}
                  >
                    {constant.QUOTE_TYPES &&
                      constant.QUOTE_TYPES.map(quoteType => (
                        <option key={uuidv4()} value={quoteType}>
                          {quoteType}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="renewalDate">Дата пролонгации</label>
                  <input
                    type="date"
                    id="renewalDate"
                    name="renewalDate"
                    value={renewalDate}
                    onChange={e => onChange(e)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="reinsurerNames">Перестраховщики</label>
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
                          />
                          <label htmlFor={reinsurer.name}>
                            {reinsurer.name}
                          </label>
                        </li>
                      ))}
                  </ul>
                  {/* <label htmlFor="newReinsurer">+ Создать нового</label>
                <input
                  type="text"
                  id="newReinsurer"
                  name="newReinsurer"
                  onChange={e => onAddReinsurerChange(e)}
                /> */}
                </div>
                <div className="form-group">
                  <label htmlFor="premium">Премия, руб.</label>
                  <NumberFormat
                    //   type="number"
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
                  <label htmlFor="population">Численность</label>
                  <NumberFormat
                    //   type="number"
                    thousandSeparator={' '}
                    name="population"
                    id="population"
                    autoComplete="off"
                    value={population}
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
              //   onClick={e => setClassName('delete-modal show')}
              onClick={e => showDelete('Тендер')}
            />
          </div>

          {/* <DeleteModal
            className={className}
            onResetClassName={onResetClassName}
          /> */}
        </Fragment>
      )}
    </Fragment>
  );
};

EditOpportunity.propTypes = {
  getOpportunityById: PropTypes.func.isRequired,
  updateOpportunity: PropTypes.func.isRequired,
  removeOpportunity: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired,
  getBrokers: PropTypes.func.isRequired,
  getReinsurers: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  showDelete: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  broker: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  reinsurer: PropTypes.object.isRequired,
  opportunity: PropTypes.object.isRequired,
  constant: PropTypes.object.isRequired,
  confirmed: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  opportunity: state.opportunity,
  company: state.company,
  broker: state.broker,
  user: state.user,
  reinsurer: state.reinsurer,
  constant: state.constant,
  confirmed: state.del.confirmed
});

export default connect(mapStateToProps, {
  getOpportunityById,
  updateOpportunity,
  removeOpportunity,
  getCompanies,
  getBrokers,
  getReinsurers,
  getUsers,
  showDelete
})(withRouter(EditOpportunity));
