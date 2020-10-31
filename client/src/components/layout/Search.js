import React from 'react';
import PropTypes from 'prop-types';

const Search = ({
  className,
  onClassChange,
  searchValue,
  onSearchValueChange
}) => {
  return (
    <div className="form-group">
      <div className="search-labels">
        <label htmlFor="search">Поиск</label>
        <p
          className="advanced-search-label"
          onClick={e => {
            onClassChange('advanced-search show');
          }}
        >
          Расширенный поиск
        </p>
      </div>

      <input
        type="text"
        id="search"
        placeholder="Найти..."
        name="search"
        value={searchValue}
        onChange={e => onSearchValueChange(e.target.value)}
      />
    </div>
  );
};

Search.propTypes = {
  className: PropTypes.string.isRequired,
  onClassChange: PropTypes.func.isRequired,
  searchValue: PropTypes.string.isRequired,
  onSearchValueChange: PropTypes.func.isRequired
};

export default Search;
