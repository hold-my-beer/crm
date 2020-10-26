import React from 'react';
import PropTypes from 'prop-types';

const Pagination = props => {
  return (
    <div className="pagination">
      <div className="rows-number-group">
        <label htmlFor="rowsNumber">Количество строк</label>
        <select name="rowsNumber" id="rowsNumber" value="">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
      </div>
      <div className="pagination-group">
        <button className="btn btn-small btn-round btn-primary">Начало</button>
        <button className="btn btn-small btn-round btn-primary">{'<<'}</button>
        <button className="btn btn-small btn-round btn-primary">{'>>'}</button>
        <button className="btn btn-small btn-round btn-primary">Конец</button>
      </div>
    </div>
  );
};

Pagination.propTypes = {};

export default Pagination;
