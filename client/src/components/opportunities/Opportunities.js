import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOpportunities } from '../../actions/opportunity';
import hasSubstring from '../../utils/hasSubstring';
import PropTypes from 'prop-types';
import Moment from 'react-moment';
import NumberFormat from 'react-number-format';

import Search from '../layout/Search';
import FilterOpportunities from './FilterOpportunities';
import Sort from '../layout/Sort';
import Pagination from '../layout/Pagination';
import Spinner from '../layout/Spinner';

const Opportunities = ({
  getOpportunities,
  constant: { constant },
  opportunity: { opportunities, loading }
}) => {
  const [className, setClassName] = useState('filter');

  const [filteredOpportunities, setFilteredOpportunities] = useState([]);

  const [sortedOpportunities, setSortedOpportunities] = useState([]);

  const [displayedOpportunities, setDisplayedOpportunities] = useState([]);

  /* Toggle advanced search div */
  const onClassChange = newClassName => {
    setClassName(newClassName);
  };

  /* Search */
  const onSearchChange = newFilteredOpportunities => {
    setFilteredOpportunities(newFilteredOpportunities);
  };

  const filterOpportunities = newSearchValue => {
    const newFilteredOpportunities = [];

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
        newFilteredOpportunities.push(opportunity);
      }
    });

    return newFilteredOpportunities;
  };

  /* Filter opportunities */
  const onFilterSubmit = newFilteredOpportunities => {
    setFilteredOpportunities(newFilteredOpportunities);
  };

  /* Sort */
  const onSortChange = newSortedOpportunities => {
    setSortedOpportunities(newSortedOpportunities);
  };

  /* Pagination */
  const onPageParamsChange = newDisplayedOpportunities => {
    setDisplayedOpportunities(newDisplayedOpportunities);
  };

  useEffect(() => {
    getOpportunities();
  }, [getOpportunities]);

  useEffect(() => {
    setFilteredOpportunities(opportunities.length === 0 ? [] : opportunities);
    setSortedOpportunities(opportunities.length === 0 ? [] : opportunities);
    setDisplayedOpportunities(opportunities.length === 0 ? [] : opportunities);
  }, [opportunities]);

  return (
    <div className="opportunities">
      <h1 className="my-1">Тендеры</h1>
      <p className="lead">Информация о тендерах</p>
      <Link to="/create-opportunity" className="btn btn-round btn-primary">
        Создать новый <span className="plus">+</span>
      </Link>

      <Search
        className={className}
        onClassChange={onClassChange}
        rows={opportunities}
        filteredRows={filteredOpportunities}
        onSearchChange={onSearchChange}
        filterRows={filterOpportunities}
      />

      <FilterOpportunities
        className={className}
        onClassChange={onClassChange}
        opportunities={opportunities}
        filteredOpportunities={filteredOpportunities}
        onFilterSubmit={onFilterSubmit}
        constant={constant}
      />

      <Sort
        constant={constant}
        filteredRows={filteredOpportunities}
        sortedRows={sortedOpportunities}
        onSortChange={onSortChange}
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

      <Pagination
        sortedRows={sortedOpportunities}
        displayedRows={displayedOpportunities}
        onPageParamsChange={onPageParamsChange}
      />
    </div>
  );
};

Opportunities.propTypes = {
  getOpportunities: PropTypes.func.isRequired,
  constant: PropTypes.object.isRequired,
  opportunity: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  constant: state.constant,
  opportunity: state.opportunity
});

export default connect(mapStateToProps, {
  getOpportunities
})(Opportunities);
