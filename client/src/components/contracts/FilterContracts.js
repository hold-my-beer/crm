import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { getBrokers } from '../../actions/broker';
import { getUsers } from '../../actions/user';
import { getReinsurers } from '../../actions/reinsurer';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import NumberFormat from 'react-number-format';

const FilterContracts = ({
  className,
  onClassChange,
  contracts,
  filteredContracts,
  onFilterSubmit,
  getBrokers,
  getUsers,
  getReinsurers,
  brokers,
  users,
  reinsurers,
  constant: { constant }
}) => {
  const [initialFilterParameters, setInitialFilterParameters] = useState({
    premiumFrom: '',
    premiumTo: '',
    startDateFrom: '',
    startDateTo: '',
    endDateFrom: '',
    endDateTo: '',
    nextRenewalDateFrom: '',
    nextRenewalDateTo: '',
    contractTypes: [],
    responsibleNames: [],
    reinsurerNames: [],
    brokerNames: [],
    brokerEmployeeNames: [],
    populationFrom: '',
    populationTo: '',
    commissionFrom: '',
    commissionTo: '',
    renewalProbabilityFrom: '',
    renewalProbabilityTo: '',
    rightToMentions: []
  });

  const [filterParameters, setFilterParameters] = useState({
    premiumFrom: '',
    premiumTo: '',
    startDateFrom: '',
    startDateTo: '',
    endDateFrom: '',
    endDateTo: '',
    nextRenewalDateFrom: '',
    nextRenewalDateTo: '',
    contractTypes: [],
    responsibleNames: [],
    reinsurerNames: [],
    brokerNames: [],
    brokerEmployeeNames: [],
    populationFrom: '',
    populationTo: '',
    commissionFrom: '',
    commissionTo: '',
    renewalProbabilityFrom: '',
    renewalProbabilityTo: '',
    rightToMentions: []
  });

  const {
    premiumFrom,
    premiumTo,
    startDateFrom,
    startDateTo,
    endDateFrom,
    endDateTo,
    nextRenewalDateFrom,
    nextRenewalDateTo,
    contractTypes,
    responsibleNames,
    reinsurerNames,
    brokerNames,
    brokerEmployeeNames,
    populationFrom,
    populationTo,
    commissionFrom,
    commissionTo,
    renewalProbabilityFrom,
    renewalProbabilityTo,
    rightToMentions
  } = filterParameters;

  const [toggleAny, setToggleAny] = useState({
    anyPremiumFrom: true,
    anyPremiumTo: true,
    anyStartDateFrom: true,
    anyStartDateTo: true,
    anyEndDateFrom: true,
    anyEndDateTo: true,
    anyNextRenewalDateFrom: true,
    anyNextRenewalDateTo: true,
    anyContractTypes: true,
    anyResponsibles: true,
    anyReinsurers: true,
    anyBrokers: true,
    anyBrokerEmployees: true,
    anyPopulationFrom: true,
    anyPopulationTo: true,
    anyCommissionFrom: true,
    anyCommissionTo: true,
    anyRenewalProbabilityFrom: true,
    anyRenewalProbabilityTo: true,
    anyRightToMention: true
  });

  const {
    anyPremiumFrom,
    anyPremiumTo,
    anyStartDateFrom,
    anyStartDateTo,
    anyEndDateFrom,
    anyEndDateTo,
    anyNextRenewalDateFrom,
    anyNextRenewalDateTo,
    anyContractTypes,
    anyResponsibles,
    anyReinsurers,
    anyBrokers,
    anyBrokerEmployees,
    anyPopulationFrom,
    anyPopulationTo,
    anyCommissionFrom,
    anyCommissionTo,
    anyRenewalProbabilityFrom,
    anyRenewalProbabilityTo,
    anyRightToMention
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
      anyPremiumFrom: true,
      anyPremiumTo: true,
      anyStartDateFrom: true,
      anyStartDateTo: true,
      anyEndDateFrom: true,
      anyEndDateTo: true,
      anyNextRenewalDateFrom: true,
      anyNextRenewalDateTo: true,
      anyContractTypes: true,
      anyResponsibles: true,
      anyReinsurers: true,
      anyBrokers: true,
      anyBrokerEmployees: true,
      anyPopulationFrom: true,
      anyPopulationTo: true,
      anyCommissionFrom: true,
      anyCommissionTo: true,
      anyRenewalProbabilityFrom: true,
      anyRenewalProbabilityTo: true,
      anyRightToMention: true
    });
  };

  const onSubmit = () => {
    const newFilteredContracts = contracts.filter(
      contract =>
        parseInt(premiumFrom.replace(/\s+/g, '')) <= contract.premium &&
        parseInt(premiumTo.replace(/\s+/g, '')) >= contract.premium &&
        ((startDateFrom &&
          Date.parse(startDateFrom) <= Date.parse(contract.startDate)) ||
          !startDateFrom) &&
        ((startDateTo &&
          Date.parse(startDateTo) >= Date.parse(contract.startDate)) ||
          !startDateTo) &&
        ((endDateFrom &&
          Date.parse(endDateFrom) <= Date.parse(contract.endDate)) ||
          !endDateFrom) &&
        ((endDateTo && Date.parse(endDateTo) >= Date.parse(contract.endDate)) ||
          !endDateTo) &&
        ((nextRenewalDateFrom &&
          Date.parse(nextRenewalDateFrom) <=
            Date.parse(contract.nextRenewalDate)) ||
          !nextRenewalDateFrom) &&
        ((nextRenewalDateTo &&
          Date.parse(nextRenewalDateTo) >=
            Date.parse(contract.nextRenewalDate)) ||
          !nextRenewalDateTo) &&
        contractTypes.indexOf(contract.contractType) !== -1 &&
        responsibleNames.indexOf(contract.responsible.secondName) !== -1 &&
        (reinsurers.length === reinsurerNames.length ||
          (reinsurerNames.length === 0 && contract.reinsurers.length === 0) ||
          contract.reinsurers.filter(
            reinsurer => reinsurerNames.indexOf(reinsurer.name) !== -1
          ).length !== 0) &&
        brokerNames.indexOf(contract.broker.name) !== -1 &&
        brokerEmployeeNames.indexOf(contract.brokerEmployee) !== -1 &&
        parseInt(populationFrom.replace(/\s+/g, '')) <= contract.population &&
        parseInt(populationTo.replace(/\s+/g, '')) >= contract.population &&
        parseInt(commissionFrom.replace(/\s+/g, '')) <= contract.commission &&
        parseInt(commissionTo.replace(/\s+/g, '')) >= contract.commission &&
        parseInt(renewalProbabilityFrom.replace(/\s+/g, '')) <=
          contract.renewalProbability &&
        parseInt(renewalProbabilityTo.replace(/\s+/g, '')) >=
          contract.renewalProbability &&
        rightToMentions.indexOf(contract.company.rightToMention) !== -1
    );
    onFilterSubmit(newFilteredContracts);
  };

  useEffect(() => {
    getBrokers();
    getUsers();
    getReinsurers();
  }, [getBrokers, getUsers, getReinsurers]);

  useEffect(() => {
    setInitialFilterParameters({
      premiumFrom: !constant ? 0 : constant.SUM_MIN,
      premiumTo: !constant ? 1000000000 : constant.SUM_MAX,
      contractTypes: !constant ? [] : constant.CONTRACT_TYPES,
      responsibleNames: !users ? [] : users.map(user => user.secondName),
      reinsurerNames: !reinsurers
        ? []
        : reinsurers.map(reinsurer => reinsurer.name),
      brokerNames: !brokers ? [] : brokers.map(broker => broker.name),
      brokerEmployeeNames: !brokers
        ? []
        : brokers
            .map(broker => broker.employees.map(employee => employee.name))
            .flat(),
      populationFrom: !constant ? 0 : constant.QUANTITY_MIN,
      populationTo: !constant ? 1000000 : constant.QUANTITY_MAX,
      commissionFrom: !constant ? 0 : constant.PERCENTAGE_MIN,
      commissionTo: !constant ? 100 : constant.PERCENTAGE_MAX,
      renewalProbabilityFrom: !constant ? 0 : constant.PERCENTAGE_MIN,
      renewalProbabilityTo: !constant ? 100 : constant.PERCENTAGE_MAX,
      rightToMentions: ['Да', 'Нет', 'Не известно']
    });
  }, [constant, brokers, users, reinsurers]);

  useEffect(() => {
    setFilterParameters({
      premiumFrom: !constant ? 0 : constant.SUM_MIN,
      premiumTo: !constant ? 1000000000 : constant.SUM_MAX,
      contractTypes: !constant ? [] : constant.CONTRACT_TYPES,
      responsibleNames: !users ? [] : users.map(user => user.secondName),
      reinsurerNames: !reinsurers
        ? []
        : reinsurers.map(reinsurer => reinsurer.name),
      brokerNames: !brokers ? [] : brokers.map(broker => broker.name),
      brokerEmployeeNames: !brokers
        ? []
        : brokers
            .map(broker => broker.employees.map(employee => employee.name))
            .flat(),
      populationFrom: !constant ? 0 : constant.QUANTITY_MIN,
      populationTo: !constant ? 1000000 : constant.QUANTITY_MAX,
      commissionFrom: !constant ? 0 : constant.PERCENTAGE_MIN,
      commissionTo: !constant ? 1000000 : constant.PERCENTAGE_MAX,
      renewalProbabilityFrom: !constant ? 0 : constant.PERCENTAGE_MIN,
      renewalProbabilityTo: !constant ? 1000000 : constant.PERCENTAGE_MAX,
      rightToMentions: ['Да', 'Нет', 'Не известно']
    });
  }, [constant, brokers, users, reinsurers]);

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
              id="premiumTo"
              name="premiumTo"
              value={premiumTo}
              onChange={e => onFilterChange(e, 'anyPremiumTo')}
              thousandSeparator={' '}
              disabled={anyPremiumTo}
            />
          </div>
        </div>

        {/* Дата начала */}
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Дата начала</strong>
          </div>

          <div className="search-parameter-values">
            {/* От */}
            <label htmlFor="startDateFrom">От</label>
            <div>
              <input
                type="checkbox"
                id="anyStartDateFrom"
                name="anyStartDateFrom"
                value={anyStartDateFrom}
                onChange={e => onToggleAny(e, 'startDateFrom')}
                checked={anyStartDateFrom}
              />
              <label htmlFor="anyStartDateFrom">любой даты</label>
            </div>
            <input
              type="date"
              id="startDateFrom"
              name="startDateFrom"
              value={startDateFrom ? startDateFrom : ''}
              onChange={e => onFilterChange(e, 'anyStartDateFrom')}
              disabled={anyStartDateFrom}
            />

            {/* До */}
            <label htmlFor="startDateTo">До</label>
            <div>
              <input
                type="checkbox"
                id="anyStartDateTo"
                name="anyStartDateTo"
                value={anyStartDateTo}
                onChange={e => onToggleAny(e, 'startDateTo')}
                checked={anyStartDateTo}
              />
              <label htmlFor="anyStartDateTo">любой даты</label>
            </div>
            <input
              type="date"
              id="startDateTo"
              name="startDateTo"
              value={startDateTo ? startDateTo : ''}
              onChange={e => onFilterChange(e, 'anyStartDateTo')}
              disabled={anyStartDateTo}
            />
          </div>
        </div>

        {/* Дата окончания */}
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Дата окончания</strong>
          </div>

          <div className="search-parameter-values">
            {/* От */}
            <label htmlFor="endDateFrom">От</label>
            <div>
              <input
                type="checkbox"
                id="anyEndDateFrom"
                name="anyEndDateFrom"
                value={anyEndDateFrom}
                onChange={e => onToggleAny(e, 'endDateFrom')}
                checked={anyEndDateFrom}
              />
              <label htmlFor="anyEndDateFrom">любой даты</label>
            </div>
            <input
              type="date"
              id="endDateFrom"
              name="endDateFrom"
              value={endDateFrom ? endDateFrom : ''}
              onChange={e => onFilterChange(e, 'anyEndDateFrom')}
              disabled={anyEndDateFrom}
            />

            {/* До */}
            <label htmlFor="endDateTo">До</label>
            <div>
              <input
                type="checkbox"
                id="anyEndDateTo"
                name="anyEndDateTo"
                value={anyEndDateTo}
                onChange={e => onToggleAny(e, 'endDateTo')}
                checked={anyEndDateTo}
              />
              <label htmlFor="anyEndDateTo">любой даты</label>
            </div>
            <input
              type="date"
              id="endDateTo"
              name="endDateTo"
              value={endDateTo ? endDateTo : ''}
              onChange={e => onFilterChange(e, 'anyEndDateTo')}
              disabled={anyEndDateTo}
            />
          </div>
        </div>

        {/* Дата следующей пролонгации */}
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Дата следующей пролонгации</strong>
          </div>

          <div className="search-parameter-values">
            {/* От */}
            <label htmlFor="nextRenewalDateFrom">От</label>
            <div>
              <input
                type="checkbox"
                id="anyNextRenewalDateFrom"
                name="anyNextRenewalDateFrom"
                value={anyNextRenewalDateFrom}
                onChange={e => onToggleAny(e, 'nextRenewalDateFrom')}
                checked={anyNextRenewalDateFrom}
              />
              <label htmlFor="anyNextRenewalDateFrom">любой даты</label>
            </div>
            <input
              type="date"
              id="nextRenewalDateFrom"
              name="nextRenewalDateFrom"
              value={nextRenewalDateFrom ? nextRenewalDateFrom : ''}
              onChange={e => onFilterChange(e, 'anyNextRenewalDateFrom')}
              disabled={anyNextRenewalDateFrom}
            />

            {/* До */}
            <label htmlFor="nextRenewalDateTo">До</label>
            <div>
              <input
                type="checkbox"
                id="anyNextRenewalDateTo"
                name="anyNextRenewalDateTo"
                value={anyNextRenewalDateTo}
                onChange={e => onToggleAny(e, 'nextRenewalDateTo')}
                checked={anyNextRenewalDateTo}
              />
              <label htmlFor="anyNextRenewalDateTo">любой даты</label>
            </div>
            <input
              type="date"
              id="nextRenewalDateTo"
              name="nextRenewalDateTo"
              value={nextRenewalDateTo ? nextRenewalDateTo : ''}
              onChange={e => onFilterChange(e, 'anyNextRenewalDateTo')}
              disabled={anyNextRenewalDateTo}
            />
          </div>
        </div>

        {/* Тип договора */}
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Тип договора</strong>
          </div>
          <div className="search-parameter-values">
            <div className="toggle-any">
              <input
                type="checkbox"
                id="anyContractTypes"
                name="anyContractTypes"
                value={anyContractTypes}
                onChange={e => onToggleAny(e, 'contractTypes')}
                checked={anyContractTypes}
              />
              <label htmlFor="anyContractTypes">Все</label>
            </div>
            <ul>
              {constant &&
                constant.CONTRACT_TYPES.map(contractType => (
                  <li key={uuidv4()}>
                    <input
                      id={contractType}
                      type="checkbox"
                      name="contractTypes"
                      value={contractType}
                      onChange={e => onFilterChange(e, 'anyContractTypes')}
                      checked={
                        anyContractTypes
                          ? true
                          : contractTypes.indexOf(contractType) !== -1
                      }
                    />
                    <label htmlFor={contractType}>{contractType}</label>
                  </li>
                ))}
            </ul>
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

        {/* Перестраховщик */}
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Перестраховщик</strong>
          </div>
          <div className="search-parameter-values">
            <div className="toggle-any">
              <input
                type="checkbox"
                id="anyReinsurers"
                name="anyReinsurers"
                value={anyReinsurers}
                onChange={e => onToggleAny(e, 'reinsurerNames')}
                checked={anyReinsurers}
              />
              <label htmlFor="anyReinsurers">Все</label>
            </div>
            <ul>
              {reinsurers &&
                reinsurers.map(reinsurer => (
                  <li key={reinsurer._id}>
                    <input
                      id={reinsurer.name}
                      type="checkbox"
                      name="reinsurerNames"
                      value={reinsurer.name}
                      onChange={e => onFilterChange(e, 'anyReinsurers')}
                      checked={
                        anyReinsurers
                          ? true
                          : reinsurerNames.indexOf(reinsurer.name) !== -1
                      }
                    />
                    <label htmlFor={reinsurer.name}>{reinsurer.name}</label>
                  </li>
                ))}
            </ul>
          </div>
        </div>

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

        {/* Сотрудник брокера */}
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Сотрудник брокера</strong>
          </div>
          <div className="search-parameter-values">
            <div className="toggle-any">
              <input
                type="checkbox"
                id="anyBrokerEmployees"
                name="anyBrokerEmployees"
                value={anyBrokerEmployees}
                onChange={e => onToggleAny(e, 'brokerEmployeeNames')}
                checked={anyBrokerEmployees}
              />
              <label htmlFor="anyBrokerEmployees">Все</label>
            </div>
            <ul>
              {brokers &&
                brokers.map(broker =>
                  broker.employees.map(employee => (
                    <li key={employee._id}>
                      <input
                        id={employee.name}
                        type="checkbox"
                        name="brokerEmployeeNames"
                        value={employee.name}
                        onChange={e => onFilterChange(e, 'anyBrokerEmployees')}
                        checked={
                          anyBrokerEmployees
                            ? true
                            : brokerEmployeeNames.indexOf(employee.name) !== -1
                        }
                      />
                      <label htmlFor={employee.name}>{employee.name}</label>
                    </li>
                  ))
                )}
            </ul>
          </div>
        </div>

        {/* Численность */}
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Численность</strong>
          </div>
          <div className="search-parameter-values">
            {/* От */}
            <label htmlFor="populationFrom">От</label>
            <div>
              <input
                type="checkbox"
                id="anyPopulationFrom"
                name="anyPopulationFrom"
                value={anyPopulationFrom}
                onChange={e => onToggleAny(e, 'populationFrom')}
                checked={anyPopulationFrom}
              />
              <label htmlFor="anyPopulationFrom">любого значения</label>
            </div>
            <NumberFormat
              id="populationFrom"
              name="populationFrom"
              value={populationFrom}
              onChange={e => onFilterChange(e, 'anyPopulationFrom')}
              thousandSeparator={' '}
              disabled={anyPopulationFrom}
            />
            {/* До */}
            <label htmlFor="populationTo">До</label>
            <div>
              <input
                type="checkbox"
                id="anyPopulationTo"
                name="anyPopulationTo"
                value={anyPopulationTo}
                onChange={e => onToggleAny(e, 'populationTo')}
                checked={anyPopulationTo}
              />
              <label htmlFor="anyPremiumFrom">любого значения</label>
            </div>
            <NumberFormat
              id="populationTo"
              name="populationTo"
              value={populationTo}
              onChange={e => onFilterChange(e, 'anyPopulationTo')}
              thousandSeparator={' '}
              disabled={anyPopulationTo}
            />
          </div>
        </div>

        {/* Комиссия */}
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Комиссия, %</strong>
          </div>
          <div className="search-parameter-values">
            {/* От */}
            <label htmlFor="commissionFrom">От</label>
            <div>
              <input
                type="checkbox"
                id="anyCommissionFrom"
                name="anyCommissionFrom"
                value={anyCommissionFrom}
                onChange={e => onToggleAny(e, 'commissionFrom')}
                checked={anyCommissionFrom}
              />
              <label htmlFor="anyCommissionFrom">любого значения</label>
            </div>
            <NumberFormat
              id="commissionFrom"
              name="commissionFrom"
              value={commissionFrom}
              onChange={e => onFilterChange(e, 'anyCommissionFrom')}
              thousandSeparator={' '}
              disabled={anyCommissionFrom}
            />
            {/* До */}
            <label htmlFor="commissionTo">До</label>
            <div>
              <input
                type="checkbox"
                id="anyCommissionTo"
                name="anyCommissionTo"
                value={anyCommissionTo}
                onChange={e => onToggleAny(e, 'commissionTo')}
                checked={anyCommissionTo}
              />
              <label htmlFor="anyCommissionTo">любого значения</label>
            </div>
            <NumberFormat
              id="commissionTo"
              name="commissionTo"
              value={commissionTo}
              onChange={e => onFilterChange(e, 'anyCommissionTo')}
              thousandSeparator={' '}
              disabled={anyCommissionTo}
            />
          </div>
        </div>

        {/* Вероятность пролонгации */}
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Вероятность пролонгации, %</strong>
          </div>
          <div className="search-parameter-values">
            {/* От */}
            <label htmlFor="renewalProbabilityFrom">От</label>
            <div>
              <input
                type="checkbox"
                id="anyRenewalProbabilityFrom"
                name="anyRenewalProbabilityFrom"
                value={anyRenewalProbabilityFrom}
                onChange={e => onToggleAny(e, 'renewalProbabilityFrom')}
                checked={anyRenewalProbabilityFrom}
              />
              <label htmlFor="anyRenewalProbabilityFrom">любого значения</label>
            </div>
            <NumberFormat
              id="renewalProbabilityFrom"
              name="renewalProbabilityFrom"
              value={renewalProbabilityFrom}
              onChange={e => onFilterChange(e, 'anyRenewalProbabilityFrom')}
              thousandSeparator={' '}
              disabled={anyRenewalProbabilityFrom}
            />
            {/* До */}
            <label htmlFor="renewalProbabilityTo">До</label>
            <div>
              <input
                type="checkbox"
                id="anyRenewalProbabilityTo"
                name="anyRenewalProbabilityTo"
                value={anyRenewalProbabilityTo}
                onChange={e => onToggleAny(e, 'renewalProbabilityTo')}
                checked={anyRenewalProbabilityTo}
              />
              <label htmlFor="anyRenewalProbabilityTo">любого значения</label>
            </div>
            <NumberFormat
              id="renewalProbabilityTo"
              name="renewalProbabilityTo"
              value={renewalProbabilityTo}
              onChange={e => onFilterChange(e, 'anyRenewalProbabilityTo')}
              thousandSeparator={' '}
              disabled={anyRenewalProbabilityTo}
            />
          </div>
        </div>

        {/* Право на упоминание */}
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Право на упоминание</strong>
          </div>
          <div className="search-parameter-values">
            <div className="toggle-any">
              <input
                type="checkbox"
                id="anyRightToMention"
                name="anyRightToMention"
                value={anyRightToMention}
                onChange={e => onToggleAny(e, 'rightToMentions')}
                checked={anyRightToMention}
              />
              <label htmlFor="anyRightToMention">Все</label>
            </div>
            <ul>
              <li>
                <input
                  id="yes"
                  type="checkbox"
                  name="rightToMentions"
                  value="Да"
                  onChange={e => onFilterChange(e, 'anyRightToMention')}
                  checked={
                    anyRightToMention
                      ? true
                      : rightToMentions.indexOf('Да') !== -1
                  }
                />
                <label htmlFor="yes">Да</label>
              </li>
              <li>
                <input
                  id="no"
                  type="checkbox"
                  name="rightToMentions"
                  value="Нет"
                  onChange={e => onFilterChange(e, 'anyRightToMention')}
                  checked={
                    anyRightToMention
                      ? true
                      : rightToMentions.indexOf('Нет') !== -1
                  }
                />
                <label htmlFor="no">Нет</label>
              </li>
              <li>
                <input
                  id="unknown"
                  type="checkbox"
                  name="rightToMentions"
                  value="Не известно"
                  onChange={e => onFilterChange(e, 'anyRightToMention')}
                  checked={
                    anyRightToMention
                      ? true
                      : rightToMentions.indexOf('Не известно') !== -1
                  }
                />
                <label htmlFor="unknown">Не известно</label>
              </li>
            </ul>
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

FilterContracts.propTypes = {
  className: PropTypes.string.isRequired,
  onClassChange: PropTypes.func.isRequired,
  contracts: PropTypes.array.isRequired,
  filteredContracts: PropTypes.array.isRequired,
  onFilterSubmit: PropTypes.func.isRequired,
  getBrokers: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  getReinsurers: PropTypes.func.isRequired,
  brokers: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  reinsurers: PropTypes.array.isRequired,
  constant: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  brokers: state.broker.brokers,
  users: state.user.users,
  reinsurers: state.reinsurer.reinsurers,
  constant: state.constant
});

export default connect(mapStateToProps, {
  getBrokers,
  getUsers,
  getReinsurers
})(FilterContracts);
