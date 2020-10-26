import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getOpportunities } from '../../actions/opportunity';
import PropTypes from 'prop-types';
import Moment from 'react-moment';

import Searches from '../layout/Searches';
import Sort from '../layout/Sort';
import Pagination from '../layout/Pagination';
import Spinner from '../layout/Spinner';

const Opportunities = ({
  getOpportunities,
  opportunity: { opportunities, loading }
}) => {
  useEffect(() => {
    getOpportunities();
  }, [getOpportunities]);

  return (
    <div className="opportunities">
      <h1 className="my-1">Тендеры</h1>
      <p className="lead">Информация о тендерах</p>
      <Link to="/create-opportunity" className="btn btn-round btn-primary">
        Создать новый <span className="plus">+</span>
      </Link>

      <Searches />
      <Sort />

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
              {opportunities.map(opportunity => (
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
                  <td className="text-right">{opportunity.premium}</td>
                  <td className="text-right">{opportunity.population}</td>
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
  opportunity: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  opportunity: state.opportunity
});

export default connect(mapStateToProps, { getOpportunities })(Opportunities);
