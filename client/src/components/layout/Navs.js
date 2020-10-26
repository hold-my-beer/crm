import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';

const Navs = ({ logout, auth: { user, isAuthenticated } }) => {
  const [className, setClassName] = useState('settings-nav');

  const authLinks = (
    <Fragment>
      <div className="navbar">
        <div className="navbar-content">
          <div className="navbar-logo">
            <Link to="/dashboard">CRM</Link>
          </div>
          <div
            className="navbar-user"
            onClick={() => setClassName('settings-nav show')}
          >
            <p>{user && user.firstName}</p>
          </div>
        </div>
      </div>
      <div className={className}>
        <div className="nav-button-area">
          <div
            className="nav-button"
            onClick={() => setClassName('settings-nav')}
          >
            <div className="nav-button-item"></div>
            <div className="nav-button-item"></div>
          </div>
        </div>
        <div className="nav-list-area">
          <ul>
            <li>
              <Link
                to="/change-password"
                onClick={() => {
                  setClassName('settings-nav');
                }}
              >
                Изменить пароль
              </Link>
            </li>
            <li>
              <Link
                to="/login"
                onClick={() => {
                  setClassName('settings-nav');
                  logout();
                }}
              >
                Выйти
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="entity-nav">
        <Link
          to="/opportunities"
          className="btn btn-small btn-round btn-primary"
        >
          Тендеры
        </Link>
        <Link to="/leads" className="btn btn-small btn-round btn-primary">
          Лиды
        </Link>
        <Link to="/contracts" className="btn btn-small btn-round btn-primary">
          Контракты
        </Link>
        <Link to="/stats" className="btn btn-small btn-round btn-primary">
          Статистика
        </Link>
      </div>
    </Fragment>
  );

  const guestLinks = (
    <Fragment>
      <div className="navbar">
        <div className="navbar-content">
          <div className="navbar-logo">
            <Link to="/dashboard">CRM</Link>
          </div>
          <div className="navbar-user"></div>
        </div>
      </div>
    </Fragment>
  );

  return isAuthenticated ? authLinks : guestLinks;
};

Navs.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logout })(Navs);
