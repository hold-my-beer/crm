import React, { useState } from 'react';
import { connect } from 'react-redux';
import { changePassword } from '../../actions/auth';
import { setAlert } from '../../actions/alert';
import PropTypes from 'prop-types';

const ChangePassword = ({ changePassword, setAlert }) => {
  const [formData, setFormData] = useState({
    password: '',
    password2: ''
  });

  const { password, password2 } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();

    if (password !== password2) {
      setAlert('Введенные пароли не совпадают', 'danger');
    } else {
      await changePassword(password);
    }
  };

  return (
    <div className="change-password">
      <h1>Смена пароля</h1>
      <p className="lead">Введите новый пароль</p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="password"
            placeholder="Новый пароль"
            name="password"
            value={password}
            minLength="8"
            onChange={e => onChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Повторите новый пароль"
            name="password2"
            value={password2}
            minLength="8"
            onChange={e => onChange(e)}
            required
          />
        </div>

        <input
          type="submit"
          className="btn btn-primary"
          value="Изменить пароль"
        />
      </form>
    </div>
  );
};

ChangePassword.propTypes = {
  changePassword: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default connect(null, { changePassword, setAlert })(ChangePassword);
