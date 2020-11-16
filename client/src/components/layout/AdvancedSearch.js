import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';
import NumberFormat from 'react-number-format';

const AdvancedSearch = ({
  className,
  onClassChange,
  initialSearchParameters,
  onSearchParametersReset,
  searchParameters,
  onAdvancedValueChange,
  onAdvancedValuesSubmit,
  toggleAny,
  onToggleAny,
  constant,
  brokers,
  users,
  reinsurers
}) => {
  const {
    brokerNames,
    contactPersonNames,
    deadlineFrom,
    deadlineTo,
    responsibleNames,
    statuses,
    sentDateFrom,
    sentDateTo,
    quoteTypes,
    renewalDateFrom,
    renewalDateTo,
    reinsurerNames,
    premiumFrom,
    premiumTo,
    populationFrom,
    populationTo
  } = searchParameters;

  const {
    anyBrokers,
    anyContactPersons,
    anyDeadlineFrom,
    anyDeadlineTo,
    anyResponsibles,
    anyStatuses,
    anySentDateFrom,
    anySentDateTo,
    anyQuoteTypes,
    anyRenewalDateFrom,
    anyRenewalDateTo,
    anyReinsurers,
    anyPremiumFrom,
    anyPremiumTo,
    anyPopulationFrom,
    anyPopulationTo
  } = toggleAny;

  return (
    <div className={className}>
      <div className="advanced-search-top">
        <div className="advanced-search-top-left"></div>
        <div className="reset-parameters-area">
          <input
            type="button"
            className="btn btn-primary btn-block"
            value="Сбросить параметры"
            onClick={e => onSearchParametersReset()}
          />
        </div>
        <div className="close-search-button-area">
          <div
            className="close-search-button"
            onClick={e => onClassChange('advanced-search')}
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
                      onChange={e => onAdvancedValueChange(e, 'anyBrokers')}
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
                        onChange={e =>
                          onAdvancedValueChange(e, 'anyContactPersons')
                        }
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

        {/* Дедлайн */}
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Дедлайн</strong>
          </div>

          <div className="search-parameter-values">
            {/* От */}
            <label htmlFor="deadlineFrom">От</label>
            <div>
              <input
                type="checkbox"
                id="anyDeadlineFrom"
                name="anyDeadlineFrom"
                value={anyDeadlineFrom}
                onChange={e => onToggleAny(e, 'deadlineFrom')}
                checked={anyDeadlineFrom}
              />
              <label htmlFor="anyDeadlineFrom">любой даты</label>
            </div>
            <input
              type="date"
              id="deadlineFrom"
              name="deadlineFrom"
              value={deadlineFrom ? deadlineFrom : ''}
              onChange={e => onAdvancedValueChange(e, 'anyDeadlineFrom')}
              disabled={anyDeadlineFrom}
            />

            {/* До */}
            <label htmlFor="deadlineTo">До</label>
            <div>
              <input
                type="checkbox"
                id="anyDeadlineTo"
                name="anyDeadlineTo"
                value={anyDeadlineTo}
                onChange={e => onToggleAny(e, 'deadlineTo')}
                checked={anyDeadlineTo}
              />
              <label htmlFor="anyDeadlineTo">любой даты</label>
            </div>
            <input
              type="date"
              id="deadlineTo"
              name="deadlineTo"
              value={deadlineTo ? deadlineTo : ''}
              onChange={e => onAdvancedValueChange(e, 'anyDeadlineTo')}
              disabled={anyDeadlineTo}
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
                      onChange={e =>
                        onAdvancedValueChange(e, 'anyResponsibles')
                      }
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

        {/* Статус */}
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Статус</strong>
          </div>
          <div className="search-parameter-values">
            <div className="toggle-any">
              <input
                type="checkbox"
                id="anyStatuses"
                name="anyStatuses"
                value={anyStatuses}
                onChange={e => onToggleAny(e, 'statuses')}
                checked={anyStatuses}
              />
              <label htmlFor="anyStatuses">Все</label>
            </div>
            <ul>
              {constant.STATUSES &&
                constant.STATUSES.map(status => (
                  <li key={uuidv4()}>
                    <input
                      id={status}
                      type="checkbox"
                      name="statuses"
                      value={status}
                      onChange={e => onAdvancedValueChange(e, 'anyStatuses')}
                      checked={
                        anyStatuses ? true : statuses.indexOf(status) !== -1
                      }
                    />
                    <label htmlFor={status}>{status}</label>
                  </li>
                ))}
            </ul>
          </div>
        </div>

        {/* Отправлено */}
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Отправлено</strong>
          </div>
          <div className="search-parameter-values">
            {/* От */}
            <label htmlFor="sentDateFrom">От</label>
            <div>
              <input
                type="checkbox"
                id="anySentDateFrom"
                name="anySentDateFrom"
                value={anySentDateFrom}
                onChange={e => onToggleAny(e, 'sentDateFrom')}
                checked={anySentDateFrom}
              />
              <label htmlFor="anySentDateFrom">любой даты</label>
            </div>
            <input
              type="date"
              id="sentDateFrom"
              name="sentDateFrom"
              value={sentDateFrom ? sentDateFrom : ''}
              onChange={e => onAdvancedValueChange(e, 'anySentDateFrom')}
              disabled={anySentDateFrom}
            />

            {/* До */}
            <label htmlFor="sentDateTo">До</label>
            <div>
              <input
                type="checkbox"
                id="anySentDateTo"
                name="anySentDateTo"
                value={anySentDateTo}
                onChange={e => onToggleAny(e, 'sentDateTo')}
                checked={anySentDateTo}
              />
              <label htmlFor="anySentDateTo">любой даты</label>
            </div>
            <input
              type="date"
              id="sentDateTo"
              name="sentDateTo"
              value={sentDateTo ? sentDateTo : ''}
              onChange={e => onAdvancedValueChange(e, 'anySentDateTo')}
              disabled={anySentDateTo}
            />
          </div>
        </div>

        {/* Тип */}
        <div className="search-parameter">
          <div className="search-parameter-header">
            <strong>Тип</strong>
          </div>
          <div className="search-parameter-values">
            <div className="toggle-any">
              <input
                type="checkbox"
                id="anyQuoteTypes"
                name="anyQuoteTypes"
                value={anyQuoteTypes}
                onChange={e => onToggleAny(e, 'quoteTypes')}
                checked={anyQuoteTypes}
              />
              <label htmlFor="anyQuoteTypes">Все</label>
            </div>
            <ul>
              {constant.QUOTE_TYPES &&
                constant.QUOTE_TYPES.map(quoteType => (
                  <li key={uuidv4()}>
                    <input
                      id={quoteType}
                      type="checkbox"
                      name="quoteTypes"
                      value={quoteType}
                      onChange={e => onAdvancedValueChange(e, 'anyQuoteTypes')}
                      checked={
                        anyQuoteTypes
                          ? true
                          : quoteTypes.indexOf(quoteType) !== -1
                      }
                    />
                    <label htmlFor={quoteType}>{quoteType}</label>
                  </li>
                ))}
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
              onChange={e => onAdvancedValueChange(e, 'anyRenewalDateFrom')}
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
              onChange={e => onAdvancedValueChange(e, 'anyRenewalDateTo')}
              disabled={anyRenewalDateTo}
            />
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
                      onChange={e => onAdvancedValueChange(e, 'anyReinsurers')}
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
              onChange={e => onAdvancedValueChange(e, 'anyPremiumFrom')}
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
              onChange={e => onAdvancedValueChange(e, 'anyPremiumTo')}
              thousandSeparator={' '}
              disabled={anyPremiumTo}
            />
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
              // type="number"
              id="populationFrom"
              name="populationFrom"
              value={populationFrom}
              onChange={e => onAdvancedValueChange(e, 'anyPopulationFrom')}
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
              // type="number"
              id="populationTo"
              name="populationTo"
              value={populationTo}
              onChange={e => onAdvancedValueChange(e, 'anyPopulationTo')}
              thousandSeparator={' '}
              disabled={anyPopulationTo}
            />
          </div>
        </div>
      </div>
      <div className="advanced-search-bottom">
        <div className="submit-search-area">
          <input
            type="button"
            className="btn btn-primary btn-block"
            value="Найти"
            onClick={e => {
              onAdvancedValuesSubmit();
              onClassChange('advanced-search');
            }}
          />
        </div>
      </div>
    </div>
  );
};

AdvancedSearch.propTypes = {
  constant: PropTypes.object.isRequired,
  className: PropTypes.string.isRequired,
  onClassChange: PropTypes.func.isRequired,
  initialSearchParameters: PropTypes.object.isRequired,
  onSearchParametersReset: PropTypes.func.isRequired,
  searchParameters: PropTypes.object.isRequired,
  onAdvancedValueChange: PropTypes.func.isRequired,
  onAdvancedValuesSubmit: PropTypes.func.isRequired,
  toggleAny: PropTypes.object.isRequired,
  onToggleAny: PropTypes.func.isRequired
};

export default AdvancedSearch;
