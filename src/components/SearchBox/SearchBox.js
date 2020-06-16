import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../store/actions/index';
import Input from '../UI/Input/Input';

const debounce = (cb, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => cb(...args), delay);
  };
};

function SearchBox({ onSetExpenses, onGetExpenses, allExpenses }) {
  const [search, setValue] = useState({
    elementType: 'input',
    elementConfig: {
      type: 'search',
      placeholder: 'Min 2 char search',
    },
    value: '',
  });

  const callAPI = async searchTerm => {
    if (searchTerm.length >= 2) {
      const res = allExpenses.filter(el => {
        const {
          user: { first, last, email },
          merchant,
          amount: { currency, value },
        } = el;

        return (
          first.toLowerCase().search(searchTerm.toLowerCase()) > -1 ||
          (email &&
            email.toLowerCase().search(searchTerm.toLowerCase()) > -1) ||
          last.toLowerCase().search(searchTerm.toLowerCase()) > -1 ||
          merchant.toLowerCase().search(searchTerm.toLowerCase()) > -1 ||
          currency.toLowerCase().search(searchTerm.toLowerCase()) > -1 ||
          value.toLowerCase().search(searchTerm.toLowerCase()) > -1
        );
      });

      onSetExpenses({ expenses: res, total: 168, pages: [1] });
    } else if (searchTerm.length === 1) {
      // do nothing
    } else {
      onGetExpenses({ offset: 0, limit: 35 });
    }
  };

  const debouncedCallAPI = useCallback(
    debounce(value => callAPI(value), 500),
    [allExpenses]
  );

  function handleChange(value) {
    setValue({ ...search, value });
    debouncedCallAPI(value);
  }

  return (
    <Input
      elementType={search.elementType}
      elementConfig={search.elementConfig}
      value={search.value}
      changed={e => handleChange(e.target.value)}
    />
  );
}

const mapStateToProps = state => {
  return {
    totalEntries: state.totalEntries,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onSetExpenses: payload => dispatch(actions.setExpenses(payload)),
    onGetExpenses: payload => dispatch(actions.getExpenses(payload)),
  };
};

SearchBox.propTypes = {
  onChange: PropTypes.func,
  totalEntries: PropTypes.number,
  onSetExpenses: PropTypes.func,
  onGetExpenses: PropTypes.func,
  allExpenses: PropTypes.array,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
