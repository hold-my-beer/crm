import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const Sort = ({ constant, displayedOpportunities, onSortByChange }) => {
  const [sortBy, setSortBy] = useState('');

  return (
    <div className="form-group">
      <label htmlFor="sort">Сортировка</label>

      <select
        name="sort"
        id="sort"
        value={sortBy}
        onChange={e => {
          setSortBy(e.target.value);
          onSortByChange(e);
        }}
      >
        {constant.SORT_OPPORTUNITIES_BY &&
          constant.SORT_OPPORTUNITIES_BY.map(sortOption => (
            <option key={uuidv4()} value={sortOption}>
              {sortOption}
            </option>
          ))}
        {/* <option value="0">Новые</option>
        <option value="1">Ближайший дедлайн</option>
        <option value="2">Ближайшая пролонгация</option>
        <option value="3">Большая сумма премии</option> */}
      </select>
    </div>
  );
};

Sort.propTypes = {
  constant: PropTypes.object.isRequired,
  displayedOpportunities: PropTypes.array.isRequired,
  onSortByChange: PropTypes.func.isRequired
};

export default Sort;
