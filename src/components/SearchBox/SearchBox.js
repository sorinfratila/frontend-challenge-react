import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import classes from './SearchBox.module.scss';

function SearchBox() {
  const [value, setValue] = useState('');

  const callAPI = () => {
    console.log('asdfasdf');
  };

  const [debouncedCallAPI] = useState(() => debounce(callAPI, 250));

  function handleChange(value) {
    setValue(value);
    debouncedCallAPI();
  }

  return (
    <input
      className={classes.search}
      type="search"
      placeholder="Search"
      onChange={e => handleChange(e.target.value)}
      value={value}
    />
  );
}

SearchBox.propTypes = {
  onChange: PropTypes.func,
  searchVal: PropTypes.string,
};

export default SearchBox;
