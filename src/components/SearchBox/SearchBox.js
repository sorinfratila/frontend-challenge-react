import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './SearchBox.module.scss';

function SearchBox() {
  const [value, setValue] = useState('');
  return (
    <input
      className={classes.search}
      type="search"
      placeholder="Search"
      onChange={e => setValue(e.target.value)}
      value={value}
    />
  );
}

SearchBox.propTypes = {
  onChange: PropTypes.func,
  searchVal: PropTypes.string,
};

export default SearchBox;
