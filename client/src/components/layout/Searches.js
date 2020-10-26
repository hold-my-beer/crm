import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';

import AdvancedSearch from './AdvancedSearch';
import Search from './Search';

const Searches = props => {
  const [className, setClassName] = useState('advanced-search');

  const onClassChange = newClassName => {
    setClassName(newClassName);
  };

  return (
    <Fragment>
      <Search className={className} onClassChange={onClassChange} />
      <AdvancedSearch className={className} onClassChange={onClassChange} />
    </Fragment>
  );
};

Searches.propTypes = {};

export default Searches;
