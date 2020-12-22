import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Search = ({
  className,
  onClassChange,
  rows,
  filteredRows,
  onSearchChange,
  filterRows
}) => {
  const [searchValue, setSearchValue] = useState('');

  const onSearchValueChange = e => {
    const val = e.target.value;

    setSearchValue(val);
    const newFilteredRows = filterRows(val);

    onSearchChange(newFilteredRows);
  };

  return (
    <div className="form-group">
      <div className="search-labels">
        <label htmlFor="search">Поиск</label>
        <p
          className="filter-label"
          onClick={e => {
            onClassChange('filter show');
          }}
        >
          Фильтры
        </p>
      </div>

      <input
        type="text"
        id="search"
        placeholder="Найти..."
        name="search"
        value={searchValue}
        onChange={e => onSearchValueChange(e)}
      />
    </div>
  );
};

Search.propTypes = {
  className: PropTypes.string.isRequired,
  onClassChange: PropTypes.func.isRequired,
  rows: PropTypes.array.isRequired,
  filteredRows: PropTypes.array.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  filterRows: PropTypes.func.isRequired
};

export default Search;
