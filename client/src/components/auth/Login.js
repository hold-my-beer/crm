import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { login } from '../../actions/auth';
// import { getConstants } from '../../actions/constant';

const Login = ({ login, /*getConstants,*/ isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await login(email, password);
  };

  if (isAuthenticated) {
    // getConstants();
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="login">
      <h1>Вход</h1>
      <p className="lead">Введите ваши учетные данные</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Пароль"
            name="password"
            value={password}
            onChange={e => onChange(e)}
            minLength="8"
          />
        </div>

        <input type="submit" className="btn btn-primary" value="Войти" />
      </form>
    </div>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  // getConstants: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { login /*getConstants*/ })(Login);
