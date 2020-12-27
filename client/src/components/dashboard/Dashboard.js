import React, { Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { getConstants } from '../../actions/constant';
import { getOpenedOpportunities } from '../../actions/opportunity';
import { getNearestLeads } from '../../actions/lead';
import { getNearestContracts } from '../../actions/contract';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';
import Moment from 'react-moment';

import Spinner from '../layout/Spinner';

const Dashboard = ({
  getConstants,
  getOpenedOpportunities,
  getNearestLeads,
  getNearestContracts,
  opportunity,
  lead,
  contract,
  history
}) => {
  useEffect(() => {
    getConstants();
  }, [getConstants]);

  useEffect(() => {
    getOpenedOpportunities();
  }, [getOpenedOpportunities]);

  useEffect(() => {
    getNearestLeads();
  }, [getNearestLeads]);

  useEffect(() => {
    getNearestContracts();
  }, [getNearestContracts]);

  return (
    <Fragment>
      {!opportunity ||
      opportunity.loading ||
      !lead ||
      lead.loading ||
      !contract ||
      contract.loading ? (
        <Spinner />
      ) : (
        <div className="dashboard">
          <h1 className="my-1">Дашборд</h1>
          <p className="lead">Самое актуальное вкратце</p>
          <div className="dashboard-cards">
            <div
              className="dashboard-card"
              onClick={e => {
                history.push('/opportunities');
              }}
            >
              <h2>Тендеры</h2>
              {!opportunity.opportunities.length ? (
                <p className="lead">Нет незакрытых тендеров</p>
              ) : (
                <table className="card-table">
                  <thead>
                    <tr>
                      <th className="dashboard-cell">Компания</th>
                      <th className="dashboard-cell">Премия, руб.</th>
                      <th className="dashboard-cell">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    {opportunity.opportunities.map(item => (
                      <tr key={item._id}>
                        <td className="dashboard-cell">{item.company.name}</td>
                        <td className="dashboard-cell text-right">
                          {/* {item.premium} */}
                          <NumberFormat
                            displayType="text"
                            thousandSeparator={' '}
                            value={item.premium}
                          />
                        </td>
                        <td className="dashboard-cell">{item.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div
              className="dashboard-card"
              onClick={e => {
                history.push('/leads');
              }}
            >
              <h2>Лиды</h2>
              {!lead.leads.length ? (
                <p className="lead">Нет ближайших лидов</p>
              ) : (
                <table className="card-table">
                  <thead>
                    <tr>
                      <th className="dashboard-cell">Компания</th>
                      <th className="dashboard-cell">Премия, руб.</th>
                      <th className="dashboard-cell text-center">Дата связи</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lead.leads.map(item => (
                      <tr key={item._id}>
                        <td className="dashboard-cell">{item.company.name}</td>
                        <td className="dashboard-cell text-right">
                          <NumberFormat
                            displayType="text"
                            thousandSeparator={' '}
                            value={item.premium}
                          />
                        </td>
                        <td className="dashboard-cell text-center">
                          <Moment format="DD-MM-YYYY">
                            {item.contactDate}
                          </Moment>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div
              className="dashboard-card"
              onClick={e => {
                history.push('/contracts');
              }}
            >
              <h2>Контракты</h2>
              {!contract.contracts.length ? (
                <p className="lead">Нет новых контрактов</p>
              ) : (
                <table className="card-table">
                  <thead>
                    <tr>
                      <th className="dashboard-cell">Компания</th>
                      <th className="dashboard-cell">Премия, руб.</th>
                      <th className="dashboard-cell text-center">
                        Дата пролонгации
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {contract.contracts.map(item => (
                      <tr key={item._id}>
                        <td className="dashboard-cell">{item.company.name}</td>
                        <td className="dashboard-cell text-right">
                          <NumberFormat
                            displayType="text"
                            thousandSeparator={' '}
                            value={item.premium}
                          />
                        </td>
                        <td className="dashboard-cell text-center">
                          <Moment format="DD-MM-YYYY">
                            {item.renewalDate}
                          </Moment>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div
              className="dashboard-card"
              onClick={e => {
                history.push('/stats');
              }}
            >
              <h2>Статистика</h2>
              <table className="card-table">
                <tbody>
                  <tr>
                    <td>Выполнение годового плана</td>
                    <td className="text-right">105%</td>
                  </tr>
                  <tr>
                    <td>Пролонгация</td>
                    <td className="text-right">86%</td>
                  </tr>
                  <tr>
                    <td>Воронка</td>
                    <td className="text-right">15%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </Fragment>
  );
};

Dashboard.propTypes = {
  getConstants: PropTypes.func.isRequired,
  getOpenedOpportunities: PropTypes.func.isRequired,
  getNearestLeads: PropTypes.func.isRequired,
  getNearestContracts: PropTypes.func.isRequired,
  opportunity: PropTypes.object.isRequired,
  lead: PropTypes.object.isRequired,
  contract: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  opportunity: state.opportunity,
  lead: state.lead,
  contract: state.contract
});

export default connect(mapStateToProps, {
  getConstants,
  getOpenedOpportunities,
  getNearestLeads,
  getNearestContracts
})(withRouter(Dashboard));
