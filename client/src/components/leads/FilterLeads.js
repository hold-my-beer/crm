import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getBrokers } from '../../actions/broker';
import { getUsers } from '../../actions/user';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import NumberFormat from 'react-number-format';

const FilterLeads = ({
  className,
  onClassChange,
  leads,
  filteredLeads,
  onFilterSubmit,
  getBrokers,
  getUsers,
  brokers,
  users,
  constant
}) => {
  const [initialFilterParameters, setInitialFilterParameters] = useState({
    brokerNames: [],
    contactPersonNames: [],
    renewalDateFrom: '',
    renewalDateTo: '',
    contactDateFrom: '',
    contactDateTo: '',
    responsibleNames: [],
    copyToNames: [],
    premiumFrom: '',
    premiumTo: ''
  });

  const [filterParameters, setFilterParameters] = useState({
    brokerNames: [],
    contactPersonNames: [],
    renewalDateFrom: '',
    renewalDateTo: '',
    contactDateFrom: '',
    contactDateTo: '',
    responsibleNames: [],
    copyToNames: [],
    premiumFrom: '',
    premiumTo: ''
  });

  const {
    brokerNames,
    contactPersonNames,
    renewalDateFrom,
    renewalDateTo,
    contactDateFrom,
    contactDateTo,
    responsibleNames,
    copyToNames,
    premiumFrom,
    premiumTo
  } = filterParameters;

  const [toggleAny, setToggleAny] = useState({
    anyBrokers: true,
    anyContactPersons: true,
    anyRenewalDateFrom: true,
    anyRenewalDateTo: true,
    anyContactDateFrom: true,
    anyContactDateTo: true,
    anyResponsibles: true,
    anyCopyTos: true,
    anyPremiumFrom: true,
    anyPremiumTo: true
  });

  const {
    anyBrokers,
    anyContactPersons,
    anyRenewalDateFrom,
    anyRenewalDateTo,
    anyContactDateFrom,
    anyContactDateTo,
    anyResponsibles,
    anyCopyTos,
    anyPremiumFrom,
    anyPremiumTo
  } = toggleAny;

  const onToggleAny = (e, filterParameterName) => {
    setToggleAny({ ...toggleAny, [e.target.name]: e.target.checked });

    setFilterParameters({
      ...filterParameters,
      [filterParameterName]: e.target.checked
        ? initialFilterParameters[filterParameterName]
        : Array.isArray(filterParameters[filterParameterName])
        ? []
        : initialFilterParameters[filterParameterName]
    });
  };

  const onFilterChange = (e, nameOfAny = null) => {
    setFilterParameters({
      ...filterParameters,
      [e.target.name]:
        e.target.getAttribute('type') === 'checkbox'
          ? e.target.checked
            ? [...filterParameters[e.target.name], e.target.value]
            : [
                ...filterParameters[e.target.name].filter(
                  item => item !== e.target.value
                )
              ]
          : e.target.value
    });

    setToggleAny(
      e.target.checked ? { ...toggleAny } : { ...toggleAny, [nameOfAny]: false }
    );
  };

  const onFilterParametersReset = () => {
    setFilterParameters(initialFilterParameters);
    setToggleAny({
      anyBrokers: true,
      anyContactPersons: true,
      anyRenewalDateFrom: true,
      anyRenewalDateTo: true,
      anyContactDateFrom: true,
      anyContactDateTo: true,
      anyResponsibles: true,
      anyCopyTos: true,
      anyPremiumFrom: true,
      anyPremiumTo: true
    });
  };

  const onSubmit = () => {
    const newFilteredLeads = leads.filter(
      lead =>
        brokerNames.indexOf(lead.broker.name) !== -1 &&
        contactPersonNames.indexOf(lead.contactPerson) !== -1 &&
        ((renewalDateFrom &&
          Date.parse(renewalDateFrom) <= Date.parse(lead.renewalDate)) ||
          !renewalDateFrom) &&
        ((renewalDateTo &&
          Date.parse(renewalDateTo) >= Date.parse(lead.renewalDate)) ||
          !renewalDateTo) &&
        ((contactDateFrom &&
          Date.parse(contactDateFrom) <= Date.parse(lead.contactDate)) ||
          !contactDateFrom) &&
        ((contactDateTo &&
          Date.parse(contactDateTo) >= Date.parse(lead.contactDate)) ||
          !contactDateTo) &&
        responsibleNames.indexOf(lead.responsible.secondName) !== -1 &&
        copyToNames.indexOf(lead.copyTo.secondName) !== -1 &&
        parseInt(premiumFrom.replace(/\s+/g, '')) <= lead.premium &&
        parseInt(premiumTo.replace(/\s+/g, '')) >= lead.premium
    );

    onFilterSubmit(newFilteredLeads);
  };

  useEffect(() => {
    getBrokers();
    getUsers();
  }, [getBrokers, getUsers]);

  useEffect(() => {
    setInitialFilterParameters({
      brokerNames: !brokers ? [] : brokers.map(broker => broker.name),
      contactPersonNames: !brokers
        ? []
        : brokers
            .map(broker => broker.employees.map(employee => employee.name))
            .flat(),
      responsibleNames: !users ? [] : users.map(user => user.secondName),
      copyToNames: !users ? [] : users.map(user => user.secondName),
      premiumFrom: !constant ? 0 : constant.SUM_MIN,
      premiumTo: !constant ? 1000000000 : constant.SUM_MAX
    });
  }, [constant, brokers, users]);

  useEffect(() => {
    setFilterParameters({
      brokerNames: !brokers ? [] : brokers.map(broker => broker.name),
      contactPersonNames: !brokers
        ? []
        : brokers
            .map(broker => broker.employees.map(employee => employee.name))
            .flat(),
      responsibleNames: !users ? [] : users.map(user => user.secondName),
      copyToNames: !users ? [] : users.map(user => user.secondName),
      premiumFrom: !constant ? 0 : constant.SUM_MIN,
      premiumTo: !constant ? 1000000000 : constant.SUM_MAX
    });
  }, [constant, brokers, users]);

  return (
    <div className={className}>
      <div className="filter-top">
        <div className="filter-top-left"></div>
        <div className="reset-parameters-area">
          <input
            type="button"
            className="btn btn-primary btn-block"
            value="Сбросить параметры"
            onClick={e => onFilterParametersReset()}
          />
        </div>
        <div className="close-search-button-area">
          <div
            className="close-search-button"
            onClick={e => onClassChange('filter')}
          >
            <div className="close-search-button-item"></div>
            <div className="close-search-button-item"></div>
          </div>
        </div>
      </div>
      <div className="search-parameters">
        {/* Брокер */}
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Брокер</strong>
          </div>
          <div className="search-parameter-values">
            <div className="toggle-any">
              <input
                type="checkbox"
                id="anyBrokers"
                name="anyBrokers"
                value={anyBrokers}
                onChange={e => onToggleAny(e, 'brokerNames')}
                checked={anyBrokers}
              />
              <label htmlFor="anyBrokers">Все</label>
            </div>
            <ul>
              {brokers &&
                brokers.map(broker => (
                  <li key={broker._id}>
                    <input
                      id={broker.name}
                      type="checkbox"
                      name="brokerNames"
                      value={broker.name}
                      onChange={e => onFilterChange(e, 'anyBrokers')}
                      checked={
                        anyBrokers
                          ? true
                          : brokerNames.indexOf(broker.name) !== -1
                      }
                    />
                    <label htmlFor={broker.name}>{broker.name}</label>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Контакт */}
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Контакт</strong>
          </div>
          <div className="search-parameter-values">
            <div className="toggle-any">
              <input
                type="checkbox"
                id="anyContactPersons"
                name="anyContactPersons"
                value={anyContactPersons}
                onChange={e => onToggleAny(e, 'contactPersonNames')}
                checked={anyContactPersons}
              />
              <label htmlFor="anyContactPersons">Все</label>
            </div>
            <ul>
              {brokers &&
                brokers.map(broker =>
                  broker.employees.map(employee => (
                    <li key={employee._id}>
                      <input
                        id={employee.name}
                        type="checkbox"
                        name="contactPersonNames"
                        value={employee.name}
                        onChange={e => onFilterChange(e, 'anyContactPersons')}
                        checked={
                          anyContactPersons
                            ? true
                            : contactPersonNames.indexOf(employee.name) !== -1
                        }
                      />
                      <label htmlFor={employee.name}>{employee.name}</label>
                    </li>
                  ))
                )}
            </ul>
          </div>
        </div>

        {/* Дата пролонгации */}
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Дата пролонгации</strong>
          </div>
          <div className="search-parameter-values">
            {/* От */}
            <label htmlFor="renewalDateFrom">От</label>
            <div>
              <input
                type="checkbox"
                id="anyRenewalDateFrom"
                name="anyRenewalDateFrom"
                value={anyRenewalDateFrom}
                onChange={e => onToggleAny(e, 'renewalDateFrom')}
                checked={anyRenewalDateFrom}
              />
              <label htmlFor="anyRenewalDateFrom">любой даты</label>
            </div>

            <input
              type="date"
              id="renewalDateFrom"
              name="renewalDateFrom"
              value={renewalDateFrom ? renewalDateFrom : ''}
              onChange={e => onFilterChange(e, 'anyRenewalDateFrom')}
              disabled={anyRenewalDateFrom}
            />

            {/* До */}
            <label htmlFor="renewalDateTo">До</label>
            <div>
              <input
                type="checkbox"
                id="anyRenewalDateTo"
                name="anyRenewalDateTo"
                value={anyRenewalDateTo}
                onChange={e => onToggleAny(e, 'renewalDateTo')}
                checked={anyRenewalDateTo}
              />
              <label htmlFor="anyRenewalDateTo">любой даты</label>
            </div>

            <input
              type="date"
              id="renewalDateTo"
              name="renewalDateTo"
              value={renewalDateTo ? renewalDateTo : ''}
              onChange={e => onFilterChange(e, 'anyRenewalDateTo')}
              disabled={anyRenewalDateTo}
            />
          </div>
        </div>

        {/* Дата связи */}
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Дата связи</strong>
          </div>
          <div className="search-parameter-values">
            {/* От */}
            <label htmlFor="contactDateFrom">От</label>
            <div>
              <input
                type="checkbox"
                id="anyContactDateFrom"
                name="anyContactDateFrom"
                value={anyContactDateFrom}
                onChange={e => onToggleAny(e, 'contactDateFrom')}
                checked={anyContactDateFrom}
              />
              <label htmlFor="anyContactDateFrom">любой даты</label>
            </div>

            <input
              type="date"
              id="contactDateFrom"
              name="contactDateFrom"
              value={contactDateFrom ? contactDateFrom : ''}
              onChange={e => onFilterChange(e, 'anyContactDateFrom')}
              disabled={anyContactDateFrom}
            />

            {/* До */}
            <label htmlFor="contactDateTo">До</label>
            <div>
              <input
                type="checkbox"
                id="anyContactDateTo"
                name="anyContactDateTo"
                value={anyContactDateTo}
                onChange={e => onToggleAny(e, 'contactDateTo')}
                checked={anyContactDateTo}
              />
              <label htmlFor="anyContactDateTo">любой даты</label>
            </div>

            <input
              type="date"
              id="contactDateTo"
              name="contactDateTo"
              value={contactDateTo ? contactDateTo : ''}
              onChange={e => onFilterChange(e, 'anyContactDateTo')}
              disabled={anyContactDateTo}
            />
          </div>
        </div>

        {/* Ответственный */}
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Ответственный</strong>
          </div>
          <div className="search-parameter-values">
            <div className="toggle-any">
              <input
                type="checkbox"
                id="anyResponsibles"
                name="anyResponsibles"
                value={anyResponsibles}
                onChange={e => onToggleAny(e, 'responsibleNames')}
                checked={anyResponsibles}
              />
              <label htmlFor="anyResponsibles">Все</label>
            </div>
            <ul>
              {users &&
                users.map(user => (
                  <li key={user._id}>
                    <input
                      id={user.secondName}
                      type="checkbox"
                      name="responsibleNames"
                      value={user.secondName}
                      onChange={e => onFilterChange(e, 'anyResponsibles')}
                      checked={
                        anyResponsibles
                          ? true
                          : responsibleNames.indexOf(user.secondName) !== -1
                      }
                    />
                    <label htmlFor={user.secondName}>{user.secondName}</label>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* В копии */}
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>В копии</strong>
          </div>
          <div className="search-parameter-values">
            <div className="toggle-any">
              <input
                type="checkbox"
                id="anyCopyTos"
                name="anyCopyTos"
                value={anyCopyTos}
                onChange={e => onToggleAny(e, 'copyToNames')}
                checked={anyCopyTos}
              />
              <label htmlFor="anyCopyTos">Все</label>
            </div>
            <ul>
              {users &&
                users.map(user => (
                  <li key={user._id}>
                    <input
                      id={user.secondName}
                      type="checkbox"
                      name="copyToNames"
                      value={user.secondName}
                      onChange={e => onFilterChange(e, 'anyCopyTos')}
                      checked={
                        anyCopyTos
                          ? true
                          : copyToNames.indexOf(user.secondName) !== -1
                      }
                    />
                    <label htmlFor={user.secondName}>{user.secondName}</label>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Премия */}
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Премия</strong>
          </div>
          <div className="search-parameter-values">
            {/* От */}
            <label htmlFor="premiumFrom">От</label>
            <div>
              <input
                type="checkbox"
                id="anyPremiumFrom"
                name="anyPremiumFrom"
                value={anyPremiumFrom}
                onChange={e => onToggleAny(e, 'premiumFrom')}
                checked={anyPremiumFrom}
              />
              <label htmlFor="anyPremiumFrom">любого значения</label>
            </div>

            <NumberFormat
              // type="number"
              id="premiumFrom"
              name="premiumFrom"
              value={premiumFrom}
              onChange={e => onFilterChange(e, 'anyPremiumFrom')}
              thousandSeparator={' '}
              disabled={anyPremiumFrom}
            />
            {/* До */}
            <label htmlFor="premiumTo">До</label>
            <div>
              <input
                type="checkbox"
                id="anyPremiumTo"
                name="anyPremiumTo"
                value={anyPremiumTo}
                onChange={e => onToggleAny(e, 'premiumTo')}
                checked={anyPremiumTo}
              />
              <label htmlFor="anyPremiumTo">любого значения</label>
            </div>

            <NumberFormat
              // type="number"
              id="premiumTo"
              name="premiumTo"
              value={premiumTo}
              onChange={e => onFilterChange(e, 'anyPremiumTo')}
              thousandSeparator={' '}
              disabled={anyPremiumTo}
            />
          </div>
        </div>
      </div>

      {/* Submit */}
      <div className="filter-bottom">
        <div className="submit-search-area">
          <input
            type="button"
            className="btn btn-primary btn-block"
            value="Найти"
            onClick={e => {
              onSubmit();
              onClassChange('filter');
            }}
          />
        </div>
      </div>
    </div>
  );
};

FilterLeads.propTypes = {
  className: PropTypes.string.isRequired,
  onClassChange: PropTypes.func.isRequired,
  leads: PropTypes.array.isRequired,
  filteredLeads: PropTypes.array.isRequired,
  onFilterSubmit: PropTypes.func.isRequired,
  getBrokers: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  brokers: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  constant: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  brokers: state.broker.brokers,
  users: state.user.users
});

export default connect(mapStateToProps, {
  getBrokers,
  getUsers
})(FilterLeads);
