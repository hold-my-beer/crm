import React from 'react'
import PropTypes from 'prop-types'

const ChangePassword = props => {
    return (
        <div className="change-password">
        <h1>Смена пароля</h1>
        <p className="lead">Введите новый пароль</p>
        <form className="form">
          <div className="form-group">
            <input
              type="password"
              placeholder="Новый пароль"
              name="password"
              value=""
              minLength="8"
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Повторите новый пароль"
              name="password2"
              value=""
              minLength="8"
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
    )
}

ChangePassword.propTypes = {

}

export default ChangePassword
