import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { addLead } from '../../actions/lead';
import { getCompanies } from '../../actions/company';
import { getBrokers } from '../../actions/broker';
import { getUsers } from '../../actions/user';
import PropTypes from 'prop-types';

import NumberFormat from 'react-number-format';

const CreateLead = ({
  addLead,
  getCompanies,
  getBrokers,
  getUsers,
  company: { companies },
  broker: { brokers },
  user: { users },
  constant: { constant },
  history
}) => {
  const [formData, setFormData] = useState({
    company: '',
    companyId: '',
    broker: '',
    brokerId: '',
    contactPerson: '',
    renewalDate: '',
    contactDate: '',
    responsible: '',
    copyTo: '',
    premium: '',
    comment: ''
  });

  const [brokerEmployees, setBrokerEmployees] = useState([]);

  const {
    company,
    companyId,
    broker,
    brokerId,
    contactPerson,
    renewalDate,
    contactDate,
    responsible,
    copyTo,
    premium,
    comment
  } = formData;

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

  const onChange = e => {
    const name = e.target.name;
    const val = e.target.value;

    setFormData({
      ...formData,
      [name]: name === 'premium' ? parseInt(val.replace(/\s+/g, '')) : val,
      companyId: name === 'company' ? getId('company', val) : companyId,
      brokerId: name === 'broker' ? getId('broker', val) : brokerId
    });
  };

  const onSubmit = e => {
    e.preventDefault();
    addLead(formData, history);
  };

  useEffect(() => {
    getCompanies();
    getBrokers();
    getUsers();
  }, [getCompanies, getBrokers, getUsers]);

  return (
    <div className="create-lead">
      <h1 className="my-1">Создать лид</h1>
      <p className="lead">Создайте новый лид</p>
      <small>* поля, обязательные для заполнения</small>
      <form onSubmit={e => onSubmit(e)}>
        <div className="lead-parameters">
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
            <label htmlFor="contactPerson">Контактное лицо *</label>
            <input
              type="text"
              name="contactPerson"
              id="contactPerson"
              list="contactPersons"
              placeholder="Начните ввод..."
              autoComplete="off"
              value={contactPerson}
              onChange={e => onChange(e)}
            />
            <datalist id="contactPersons">
              {brokerEmployees.map(employee => (
                <option key={employee._id} value={employee.name}></option>
              ))}
            </datalist>
          </div>
          <div className="form-group">
            <label htmlFor="renewalDate">Дата следующей пролонгации *</label>
            <input
              type="date"
              id="renewalDate"
              name="renewalDate"
              value={renewalDate}
              onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="contactDate">Дата следующей связи *</label>
            <input
              type="date"
              id="contactDate"
              name="contactDate"
              value={contactDate}
              onChange={e => onChange(e)}
            />
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
            <label htmlFor="copyTo">В копии *</label>
            <select
              name="copyTo"
              id="copyTo"
              value={copyTo}
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
            <label htmlFor="premium">Премия, руб.</label>
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
            <label htmlFor="comment">Комментарий</label>
            <textarea
              name="comment"
              id="comment"
              rows="5"
              value={comment}
              onChange={e => onChange(e)}
            ></textarea>
          </div>
        </div>
        <input
          type="submit"
          className="btn btn-primary btn-block"
          value="Создать"
        />
      </form>
    </div>
  );
};

CreateLead.propTypes = {
  addLead: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired,
  getBrokers: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  broker: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  constant: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  company: state.company,
  broker: state.broker,
  user: state.user,
  constant: state.constant
});

export default connect(mapStateToProps, {
  addLead,
  getCompanies,
  getBrokers,
  getUsers
})(withRouter(CreateLead));
