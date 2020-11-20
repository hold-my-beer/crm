import React, { Fragment, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getLeadById, updateLead, removeLead } from '../../actions/lead';
import { getCompanies } from '../../actions/company';
import { getBrokers } from '../../actions/broker';
import { getUsers } from '../../actions/user';
import { showDelete } from '../../actions/del';
import PropTypes from 'prop-types';

import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
import NumberFormat from 'react-number-format';
import Spinner from '../layout/Spinner';

const EditLead = ({
  getLeadById,
  updateLead,
  removeLead,
  getCompanies,
  getBrokers,
  getUsers,
  showDelete,
  company: { companies },
  broker: { brokers },
  user: { users },
  lead: { lead, loading },
  constant: { constant },
  confirmed,
  match,
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
    getLeadById(match.params.id);
    getCompanies();
    getBrokers();
    getUsers();
  }, [getLeadById, match.params.id, getCompanies, getBrokers, getUsers]);

  useEffect(() => {
    setFormData({
      company: lead && lead.company.name ? lead.company.name : '',
      companyId: lead && lead.company._id ? lead.company._id : '',
      broker: lead && lead.broker.name ? lead.broker.name : '',
      brokerId: lead && lead.broker._id ? lead.broker._id : '',
      contactPerson: lead && lead.contactPerson ? lead.contactPerson : '',
      renewalDate:
        lead && lead.renewalDate
          ? moment(lead.renewalDate).format('YYYY-MM-DD')
          : '',
      contactDate:
        lead && lead.contactDate
          ? moment(lead.contactDate).format('YYYY-MM-DD')
          : '',

      responsible: lead && lead.responsible._id ? lead.responsible._id : '',
      copyTo: lead && lead.copyTo._id ? lead.copyTo._id : '',
      premium: lead && lead.premium ? lead.premium : '',
      comment: lead && lead.comment ? lead.comment : ''
    });
  }, [lead]);

  useEffect(() => {
    confirmed && removeLead(match.params.id, history);
  }, [confirmed, removeLead, match.params.id]);

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
    updateLead(match.params.id, formData, history);
  };

  return (
    <Fragment>
      {loading || !lead ? (
        <Spinner />
      ) : (
        <Fragment>
          <div className="edit-lead">
            <h1 className="my-1">Редактировать лид</h1>
            <p className="lead">Измените данные по лиду</p>
            <Link
              to="/create-opportunity"
              className="btn btn-small btn-round btn-primary"
            >
              Создать тендер <span className="plus">+</span>
            </Link>
            <p className="my-1">
              <small>* поля, обязательные для заполнения</small>
            </p>
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
                  <label htmlFor="renewalDate">
                    Дата следующей пролонгации *
                  </label>
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
                value="Изменить"
              />
            </form>
            <input
              type="button"
              className="btn btn-danger btn-block"
              value="Удалить"
              onClick={e => showDelete('Лид')}
            />
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

EditLead.propTypes = {
  getLeadById: PropTypes.func.isRequired,
  updateLead: PropTypes.func.isRequired,
  removeLead: PropTypes.func.isRequired,
  getCompanies: PropTypes.func.isRequired,
  getBrokers: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  showDelete: PropTypes.func.isRequired,
  company: PropTypes.object.isRequired,
  broker: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  lead: PropTypes.object.isRequired,
  constant: PropTypes.object.isRequired,
  confirmed: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  lead: state.lead,
  company: state.company,
  broker: state.broker,
  user: state.user,
  constant: state.constant,
  confirmed: state.del.confirmed
});

export default connect(mapStateToProps, {
  getLeadById,
  updateLead,
  removeLead,
  getCompanies,
  getBrokers,
  getUsers,
  showDelete
})(withRouter(EditLead));
