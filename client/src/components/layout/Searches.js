import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import AdvancedSearch from './AdvancedSearch';
import Search from './Search';

const Searches = ({
  constant,
  searchValue,
  onSearchValueChange,
  initialSearchParameters,
  onSearchParametersReset,
  searchParameters,
  onAdvancedValueChange,
  onAdvancedValuesSubmit,
  toggleAny,
  onToggleAny,
  brokers,
  users,
  reinsurers
}) => {
  const [className, setClassName] = useState('advanced-search');

  const onClassChange = newClassName => {
    setClassName(newClassName);
  };

  return (
    <Fragment>
      <Search
        className={className}
        onClassChange={onClassChange}
        searchValue={searchValue}
        onSearchValueChange={onSearchValueChange}
      />
      <AdvancedSearch
        constant={constant}
        className={className}
        onClassChange={onClassChange}
        initialSearchParameters={initialSearchParameters}
        onSearchParametersReset={onSearchParametersReset}
        searchParameters={searchParameters}
        onAdvancedValueChange={onAdvancedValueChange}
        onAdvancedValuesSubmit={onAdvancedValuesSubmit}
        toggleAny={toggleAny}
        onToggleAny={onToggleAny}
        brokers={brokers}
        users={users}
        reinsurers={reinsurers}
      />
    </Fragment>
  );
};

Searches.propTypes = {
  constant: PropTypes.object.isRequired,
  searchValue: PropTypes.string.isRequired,
  onSearchValueChange: PropTypes.func.isRequired,
  initialSearchParameters: PropTypes.object.isRequired,
  onSearchParametersReset: PropTypes.func.isRequired,
  searchParameters: PropTypes.object.isRequired,
  onAdvancedValueChange: PropTypes.func.isRequired,
  onAdvancedValuesSubmit: PropTypes.func.isRequired,
  toggleAny: PropTypes.object.isRequired,
  onToggleAny: PropTypes.func.isRequired,
  brokers: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired,
  reinsurers: PropTypes.array.isRequired
};

export default Searches;
