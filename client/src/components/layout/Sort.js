import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { v4 as uuidv4 } from 'uuid';

const Sort = ({ constant, filteredRows, sortedRows, onSortChange }) => {
  const [sortBy, setSortBy] = useState('Новые');

  const sortRows = val => {
    let newSortedRows = [];

    switch (val) {
      case 'Новые':
        newSortedRows = [...filteredRows].sort(
          (a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt)
        );
        break;
      case 'Ближайший дедлайн':
        newSortedRows = [...filteredRows].sort(
          (a, b) => Date.parse(a.deadlineDate) - Date.parse(b.deadlineDate)
        );
        break;
      case 'Ближайшая пролонгация':
        newSortedRows = [...filteredRows].sort((a, b) =>
          !a.renewalDate
            ? 1
            : !b.renewalDate
            ? -1
            : Date.parse(a.renewalDate) - Date.parse(b.renewalDate)
        );
        break;
      case 'Большая сумма премии':
        newSortedRows = [...filteredRows].sort((a, b) =>
          !a.premium
            ? 1
            : !b.premium
            ? -1
            : parseInt(b.premium) - parseInt(a.premium)
        );
        break;
      default:
        return;
    }

    return newSortedRows;
  };

  const onChange = e => {
    const val = e.target.value;

    setSortBy(val);

    let newSortedRows = sortRows(val);

    onSortChange(newSortedRows);
  };

  useEffect(() => {
    let newSortedRows = sortRows(sortBy);

    onSortChange(newSortedRows);
  }, [filteredRows]);

  return (
    <div className="form-group">
      <label htmlFor="sort">Сортировка</label>

      <select
        name="sort"
        id="sort"
        value={sortBy}
        onChange={e => {
          onChange(e);
        }}
      >
        {constant.SORT_OPPORTUNITIES_BY &&
          constant.SORT_OPPORTUNITIES_BY.map(sortOption => (
            <option key={uuidv4()} value={sortOption}>
              {sortOption}
            </option>
          ))}
      </select>
    </div>
  );
};

Sort.propTypes = {
  constant: PropTypes.object.isRequired,
  filteredRows: PropTypes.array.isRequired,
  sortedRows: PropTypes.array.isRequired,
  onSortChange: PropTypes.func.isRequired
};

export default Sort;
