import React from 'react';
import PropTypes from 'prop-types';

const Sort = props => {
  return (
    <div className="form-group">
      <label htmlFor="sort">Сортировка</label>

      <select name="sort" id="sort" value="">
        <option value="0">Новые</option>
        <option value="1">Ближайший дедлайн</option>
        <option value="2">Ближайшая пролонгация</option>
        <option value="3">Большая сумма премии</option>
      </select>
    </div>
  );
};

Sort.propTypes = {};

export default Sort;
