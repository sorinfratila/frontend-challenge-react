import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Input from '../UI/Input/Input';

function Filter({ options }) {
  const [filter, setFilter] = useState({
    elementType: 'select',
    elementConfig: {
      options,
    },
    value: '',
  });

  function handleChange(value) {
    setFilter({ ...filter, value });
  }

  return (
    <Input
      elementType={filter.elementType}
      elementConfig={filter.elementConfig}
      value={filter.value}
      changed={e => handleChange(e.target.value)}
    />
  );
}

Filter.propTypes = {
  options: PropTypes.array,
};

export default Filter;
