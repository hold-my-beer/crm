import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOpportunities } from '../../actions/opportunity';
import { getBrokers } from '../../actions/broker';
import { getUsers } from '../../actions/user';
import { getReinsurers } from '../../actions/reinsurer';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';

import Searches from '../layout/Searches';
import Sort from '../layout/Sort';
import Pagination from '../layout/Pagination';
import Spinner from '../layout/Spinner';

const Opportunities = ({
  getOpportunities,
  getBrokers,
  getUsers,
  getReinsurers,
  constant: { constant },
  broker: { brokers },
  user: { users },
  reinsurer: { reinsurers },
  opportunity: { opportunities, loading }
}) => {
  const [searchValue, setSearchValue] = useState('');

  const [displayedOpportunities, setDisplayedOpportunities] = useState(
    opportunities
  );

  const hasSubstring = (str, substr) => {
    return str.toLowerCase().indexOf(substr.toLowerCase()) !== -1;
  };

  const onSearchValueChange = newSearchValue => {
    setSearchValue(newSearchValue);
    const newDisplayedOpportunnities = [];

    opportunities.forEach(opportunity => {
      if (
        (opportunity.company &&
          hasSubstring(opportunity.company.name, newSearchValue)) ||
        (opportunity.broker &&
          hasSubstring(opportunity.broker.name, newSearchValue)) ||
        (opportunity.contactPerson &&
          hasSubstring(opportunity.contactPerson, newSearchValue)) ||
        (opportunity.responsible &&
          hasSubstring(opportunity.responsible.secondName, newSearchValue)) ||
        (opportunity.status &&
          hasSubstring(opportunity.status, newSearchValue)) ||
        (opportunity.quoteType &&
          hasSubstring(opportunity.quoteType, newSearchValue)) ||
        (opportunity.comment &&
          hasSubstring(opportunity.comment, newSearchValue)) ||
        (opportunity.reinsurers &&
          opportunity.reinsurers.filter(reinsurer =>
            hasSubstring(reinsurer.name, newSearchValue)
          ).length !== 0)
      ) {
        newDisplayedOpportunnities.push(opportunity);
      }
    });

    setDisplayedOpportunities(newDisplayedOpportunnities);
  };

  const [searchParameters, setSearchParameters] = useState({
    brokerNames: [],
    contactPersonNames: [],
    deadlineFrom: '',
    deadlineTo: '',
    responsibleNames: [],
    statuses: [],
    sentDateFrom: '',
    sentDateTo: '',
    quoteTypes: [],
    renewalDateFrom: '',
    renewalDateTo: '',
    reinsurerNames: [],
    premiumFrom: '',
    premiumTo: '',
    populationFrom: '',
    populationTo: ''
  });

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

  const [initialSearchParameters, setInitialSearchParameters] = useState({
    brokerNames: [],
    contactPersonNames: [],
    deadlineFrom: '',
    deadlineTo: '',
    responsibleNames: [],
    statuses: [],
    sentDateFrom: '',
    sentDateTo: '',
    quoteTypes: [],
    renewalDateFrom: '',
    renewalDateTo: '',
    reinsurerNames: [],
    premiumFrom: '',
    premiumTo: '',
    populationFrom: '',
    populationTo: ''
  });

  const onAdvancedValueChange = (e, nameOfAny = null) => {
    setSearchParameters({
      ...searchParameters,
      [e.target.name]:
        e.target.getAttribute('type') === 'checkbox'
          ? e.target.checked
            ? [...searchParameters[e.target.name], e.target.value]
            : [
                ...searchParameters[e.target.name].filter(
                  item => item !== e.target.value
                )
              ]
          : e.target.value
    });

    setToggleAny(
      e.target.checked ? { ...toggleAny } : { ...toggleAny, [nameOfAny]: false }
    );
  };

  const [toggleAny, setToggleAny] = useState({
    anyBrokers: true,
    anyContactPersons: true,
    anyDeadlineFrom: true,
    anyDeadlineTo: true,
    anyResponsibles: true,
    anyStatuses: true,
    anySentDateFrom: true,
    anySentDateTo: true,
    anyQuoteTypes: true,
    anyRenewalDateFrom: true,
    anyRenewalDateTo: true,
    anyReinsurers: true,
    anyPremiumFrom: true,
    anyPremiumTo: true,
    anyPopulationFrom: true,
    anyPopulationTo: true
  });

  const onToggleAny = (e, searchParameterName) => {
    setToggleAny({ ...toggleAny, [e.target.name]: e.target.checked });

    setSearchParameters({
      ...searchParameters,
      [searchParameterName]: e.target.checked
        ? initialSearchParameters[searchParameterName]
        : Array.isArray(searchParameters[searchParameterName])
        ? []
        : initialSearchParameters[searchParameterName]
    });
  };

  const onAdvancedValuesSubmit = () => {
    const newDisplayedOpportunities = opportunities.filter(
      opportunity =>
        brokerNames.indexOf(opportunity.broker.name) !== -1 &&
        contactPersonNames.indexOf(opportunity.contactPerson) !== -1 &&
        ((deadlineFrom &&
          Date.parse(deadlineFrom) <= Date.parse(opportunity.deadlineDate)) ||
          !deadlineFrom) &&
        ((deadlineTo &&
          Date.parse(deadlineTo) >= Date.parse(opportunity.deadlineDate)) ||
          !deadlineTo) &&
        responsibleNames.indexOf(opportunity.responsible.secondName) !== -1 &&
        statuses.indexOf(opportunity.status) !== -1 &&
        ((sentDateFrom &&
          Date.parse(sentDateFrom) <= Date.parse(opportunity.sentDate)) ||
          !sentDateFrom) &&
        ((sentDateTo &&
          Date.parse(sentDateTo) >= Date.parse(opportunity.sentDate)) ||
          !sentDateTo) &&
        quoteTypes.indexOf(opportunity.quoteType) !== -1 &&
        ((renewalDateFrom &&
          Date.parse(renewalDateFrom) <= Date.parse(opportunity.renewalDate)) ||
          !renewalDateFrom) &&
        ((renewalDateTo &&
          Date.parse(renewalDateTo) >= Date.parse(opportunity.renewalDate)) ||
          !renewalDateTo) &&
        (reinsurers.length === reinsurerNames.length ||
          (reinsurerNames.length === 0 &&
            opportunity.reinsurers.length === 0) ||
          opportunity.reinsurers.filter(
            reinsurer => reinsurerNames.indexOf(reinsurer.name) !== -1
          ).length !== 0) &&
        parseInt(premiumFrom.replace(/\s+/g, '')) <= opportunity.premium &&
        parseInt(premiumTo.replace(/\s+/g, '')) >= opportunity.premium &&
        parseInt(populationFrom.replace(/\s+/g, '')) <=
          opportunity.population &&
        parseInt(populationTo.replace(/\s+/g, '')) >= opportunity.population
    );

    setDisplayedOpportunities(newDisplayedOpportunities);
  };

  const onSearchParametersReset = () => {
    setSearchParameters(initialSearchParameters);
    setToggleAny({
      anyBrokers: true,
      anyContactPersons: true,
      anyDeadlineFrom: true,
      anyDeadlineTo: true,
      anyResponsibles: true,
      anyStatuses: true,
      anySentDateFrom: true,
      anySentDateTo: true,
      anyQuoteTypes: true,
      anyRenewalDateFrom: true,
      anyRenewalDateTo: true,
      anyReinsurers: true,
      anyPremiumFrom: true,
      anyPremiumTo: true,
      anyPopulationFrom: true,
      anyPopulationTo: true
    });
  };

  // const [sortBy, setSortBy] = useState(
  //   constant.SORT_OPPORTUNITIES_BY &&
  //     constant.SORT_OPPORTUNITIES_BY.length !== 0
  //     ? constant.SORT_OPPORTUNITIES_BY[0]
  //     : 'Новые'
  // );

  // const onSortByChange = e => {
  //   setSortBy(e.target.value);
  // };

  const onSortByChange = e => {
    let newDisplayedOpportunities = [];

    switch (e.target.value) {
      case 'Новые':
        // setDisplayedOpportunities(
        //   displayedOpportunities.sort(
        //     (a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt)
        //   )
        // );
        newDisplayedOpportunities = [...displayedOpportunities].sort(
          (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
        );
        break;
      case 'Ближайший дедлайн':
        // console.log('in deadline');
        // setDisplayedOpportunities(
        //   displayedOpportunities.sort(
        //     (a, b) => Date.parse(a.deadlineDate) - Date.parse(b.deadlineDate)
        //   )
        // );
        newDisplayedOpportunities = [...displayedOpportunities].sort(
          (a, b) => Date.parse(a.deadlineDate) - Date.parse(b.deadlineDate)
        );
        break;
      case 'Ближайшая пролонгация':
        // setDisplayedOpportunities(
        //   displayedOpportunities.sort(
        //     (a, b) => Date.parse(a.renewalDate) - Date.parse(b.renewalDate)
        //   )
        // );
        newDisplayedOpportunities = [...displayedOpportunities].sort((a, b) =>
          !a.renewalDate
            ? 1
            : !b.renewaldate
            ? -1
            : b.renewalDate - a.renewalDate
        );

        break;
      case 'Большая сумма премии':
        // setDisplayedOpportunities(
        //   displayedOpportunities.sort(
        //     (a, b) => parseInt(a.premium) - parseInt(b.premium)
        //   )
        // );
        newDisplayedOpportunities = [...displayedOpportunities].sort((a, b) =>
          !a.premium
            ? 1
            : !b.premium
            ? -1
            : parseInt(b.premium) - parseInt(a.premium)
        );
        break;
      default:
        return;
    }

    setDisplayedOpportunities(newDisplayedOpportunities);
  };

  useEffect(() => {
    getOpportunities();
  }, [getOpportunities]);

  useEffect(() => {
    setDisplayedOpportunities(opportunities.length === 0 ? [] : opportunities);
  }, [opportunities]);

  useEffect(() => {
    getBrokers();
    getUsers();
    getReinsurers();
  }, [getBrokers, getUsers, getReinsurers]);

  useEffect(() => {
    setSearchParameters({
      brokerNames: !brokers ? [] : brokers.map(broker => broker.name),
      contactPersonNames: !brokers
        ? []
        : brokers
            .map(broker => broker.employees.map(employee => employee.name))
            .flat(),
      // deadlineFrom: !constant ? '2000-01-01' : constant.MIN_DATE,
      // deadlineTo: !constant ? '2099-12-31' : constant.MAX_DATE,
      responsibleNames: !users ? [] : users.map(user => user.secondName),
      statuses: !constant ? [] : constant.STATUSES,
      // sentDateFrom: !constant ? '2000-01-01' : constant.MIN_DATE,
      // sentDateTo: !constant ? '2099-12-31' : constant.MAX_DATE,
      quoteTypes: !constant ? [] : constant.QUOTE_TYPES,
      // renewalDateFrom: !constant ? '2000-01-01' : constant.MIN_DATE,
      // renewalDateTo: !constant ? '2099-12-31' : constant.MAX_DATE,
      reinsurerNames: !reinsurers
        ? []
        : reinsurers.map(reinsurer => reinsurer.name),
      premiumFrom: !constant ? 0 : constant.SUM_MIN,
      premiumTo: !constant ? 1000000000 : constant.SUM_MAX,
      populationFrom: !constant ? 0 : constant.QUANTITY_MIN,
      populationTo: !constant ? 1000000 : constant.QUANTITY_MAX
    });
  }, [constant, brokers, users, reinsurers]);

  useEffect(() => {
    setInitialSearchParameters({
      brokerNames: !brokers ? [] : brokers.map(broker => broker.name),
      contactPersonNames: !brokers
        ? []
        : brokers
            .map(broker => broker.employees.map(employee => employee.name))
            .flat(),
      // deadlineFrom: !constant ? '2000-01-01' : constant.MIN_DATE,
      // deadlineTo: !constant ? '2099-12-31' : constant.MAX_DATE,
      responsibleNames: !users ? [] : users.map(user => user.secondName),
      statuses: !constant ? [] : constant.STATUSES,
      // sentDateFrom: !constant ? '2000-01-01' : constant.MIN_DATE,
      // sentDateTo: !constant ? '2099-12-31' : constant.MAX_DATE,
      quoteTypes: !constant ? [] : constant.QUOTE_TYPES,
      // renewalDateFrom: !constant ? '2000-01-01' : constant.MIN_DATE,
      // renewalDateTo: !constant ? '2099-12-31' : constant.MAX_DATE,
      reinsurerNames: !reinsurers
        ? []
        : reinsurers.map(reinsurer => reinsurer.name),
      premiumFrom: !constant ? 0 : constant.SUM_MIN,
      premiumTo: !constant ? 1000000000 : constant.SUM_MAX,
      populationFrom: !constant ? 0 : constant.QUANTITY_MIN,
      populationTo: !constant ? 1000000 : constant.QUANTITY_MAX
    });
  }, [constant, brokers, users, reinsurers]);

  return (
    <div className="opportunities">
      <h1 className="my-1">Тендеры</h1>
      <p className="lead">Информация о тендерах</p>
      <Link to="/create-opportunity" className="btn btn-round btn-primary">
        Создать новый <span className="plus">+</span>
      </Link>

      <Searches
        constant={constant}
        searchValue={searchValue}
        onSearchValueChange={onSearchValueChange}
        initialSearchParameters={initialSearchParameters}
        onSearchParametersReset={onSearchParametersReset}
        searchParameters={searchParameters}
        onAdvancedValueChange={onAdvancedValueChange}
        onAdvancedValuesSubmit={onAdvancedValuesSubmit}
        toggleAny={toggleAny}
        onToggleAny={onToggleAny}
        brokers={brokers}
        users={users}
        reinsurers={reinsurers}
      />
      <Sort
        constant={constant}
        displayedOpportunities={displayedOpportunities}
        onSortByChange={onSortByChange}
      />

      {loading ? (
        <Spinner />
      ) : (
        <div className="table">
          <table>
            <thead>
              <tr>
                <th className="sticky-column">Компания</th>
                <th>Брокер</th>
                <th>Контакт</th>
                <th className="text-center">Дедлайн</th>
                <th>Ответственный</th>
                <th>Статус</th>
                <th className="text-center">Отправлено</th>
                <th>Тип</th>
                <th className="text-center">Дата пролонгации</th>
                <th>Перестраховщики</th>
                <th className="text-right">Премия, руб.</th>
                <th className="text-right">Численность</th>
                <th className="commentary">Комментарий</th>
              </tr>
            </thead>
            <tbody>
              {displayedOpportunities.map(opportunity => (
                <tr key={opportunity._id}>
                  <td className="sticky-column">
                    <Link to={`/edit-opportunity/${opportunity._id}`}>
                      {opportunity.company.name}
                    </Link>
                  </td>
                  <td>{opportunity.broker.name}</td>
                  <td>{opportunity.contactPerson}</td>
                  <td className="text-center">
                    <Moment format="DD-MM-YYYY">
                      {opportunity.deadlineDate}
                    </Moment>
                  </td>
                  <td>{opportunity.responsible.secondName}</td>
                  <td>{opportunity.status}</td>
                  <td className="text-center">
                    {opportunity.sentDate && (
                      <Moment format="DD-MM-YYYY">
                        {opportunity.sentDate}
                      </Moment>
                    )}
                  </td>
                  <td>{opportunity.quoteType}</td>
                  <td className="text-center">
                    {opportunity.renewalDate && (
                      <Moment format="DD-MM-YYYY">
                        {opportunity.renewalDate}
                      </Moment>
                    )}
                  </td>
                  <td>
                    {opportunity.reinsurers.length > 0 &&
                      opportunity.reinsurers.map(
                        reinsurer => reinsurer && `${reinsurer.name} `
                      )}
                  </td>
                  <td className="text-right">
                    {opportunity.premium && (
                      <NumberFormat
                        displayType="text"
                        thousandSeparator={' '}
                        value={opportunity.premium}
                      />
                    )}
                  </td>
                  <td className="text-right">
                    {opportunity.population && (
                      <NumberFormat
                        displayType="text"
                        thousandSeparator={' '}
                        value={opportunity.population}
                      />
                    )}
                  </td>
                  <td className="commentary">{opportunity.comment}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination />
    </div>
  );
};

Opportunities.propTypes = {
  getOpportunities: PropTypes.func.isRequired,
  getBrokers: PropTypes.func.isRequired,
  getUsers: PropTypes.func.isRequired,
  getReinsurers: PropTypes.func.isRequired,
  constant: PropTypes.object.isRequired,
  broker: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  reinsurer: PropTypes.object.isRequired,
  opportunity: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  constant: state.constant,
  broker: state.broker,
  user: state.user,
  reinsurer: state.reinsurer,
  opportunity: state.opportunity
});

export default connect(mapStateToProps, {
  getOpportunities,
  getBrokers,
  getUsers,
  getReinsurers
})(Opportunities);
