import React from 'react';
import PropTypes from 'prop-types';

const Search = ({ className, onClassChange }) => {
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
        // value=""
      />
    </div>
  );
};

Search.propTypes = {
  className: PropTypes.string.isRequired,
  onClassChange: PropTypes.func.isRequired
};

export default Search;
