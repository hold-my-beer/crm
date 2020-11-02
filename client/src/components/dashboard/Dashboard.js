import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getConstants } from '../../actions/constant';
import PropTypes from 'prop-types';

const Dashboard = ({ getConstants }) => {
  useEffect(() => {
    getConstants();
  }, [getConstants]);

  return (
    <div className="dashboard">
      <h1 className="my-1">Дашборд</h1>
      <p className="lead">Самое актуальное вкратце</p>
      <div className="dashboard-cards">
        <div className="dashboard-card">
          <h2>Тендеры</h2>
          <table className="card-table">
            <thead>
              <tr>
                <th className="dashboard-cell">Компания</th>
                <th className="dashboard-cell">Премия, руб.</th>
                <th className="dashboard-cell">Статус</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="dashboard-cell">Coca-Cola</td>
                <td className="dashboard-cell text-right">9 000 000</td>
                <td className="dashboard-cell">Отправлено</td>
              </tr>
              <tr>
                <td className="dashboard-cell">KSB</td>
                <td className="dashboard-cell text-right">1 200 000</td>
                <td className="dashboard-cell">В работе</td>
              </tr>
              <tr>
                <td className="dashboard-cell">Lufthansa</td>
                <td className="dashboard-cell text-right">120 000</td>
                <td className="dashboard-cell">Отправлено</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="dashboard-card">
          <h2>Лиды</h2>
          <table className="card-table">
            <thead>
              <tr>
                <th className="dashboard-cell">Компания</th>
                <th className="dashboard-cell">Премия, руб.</th>
                <th className="dashboard-cell text-center">Дата пролонгации</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="dashboard-cell">BMW</td>
                <td className="dashboard-cell text-right">5 000 000</td>
                <td className="dashboard-cell text-center">20.12.2020</td>
              </tr>
              <tr>
                <td className="dashboard-cell">PepsiCo</td>
                <td className="dashboard-cell text-right">13 000 000</td>
                <td className="dashboard-cell text-center">01.02.2021</td>
              </tr>
              <tr>
                <td className="dashboard-cell">Hitachi</td>
                <td className="dashboard-cell text-right">500 000</td>
                <td className="dashboard-cell text-center">15.03.2021</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="dashboard-card">
          <h2>Контракты</h2>
          <table className="card-table">
            <thead>
              <tr>
                <th className="dashboard-cell">Компания</th>
                <th className="dashboard-cell">Премия, руб.</th>
                <th className="dashboard-cell text-center">Дата пролонгации</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="dashboard-cell">Saint Gobain</td>
                <td className="dashboard-cell text-right">6 000 000</td>
                <td className="dashboard-cell text-center">31.08.2020</td>
              </tr>
              <tr>
                <td className="dashboard-cell">Kelly Services</td>
                <td className="dashboard-cell text-right">1 300 000</td>
                <td className="dashboard-cell text-center">16.07.2020</td>
              </tr>
              <tr>
                <td className="dashboard-cell">Orange</td>
                <td className="dashboard-cell text-right">2 300 000</td>
                <td className="dashboard-cell text-center">01.07.2020</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="dashboard-card">
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
  );
};

Dashboard.propTypes = {
  getConstants: PropTypes.func.isRequired
};

export default connect(null, { getConstants })(Dashboard);
