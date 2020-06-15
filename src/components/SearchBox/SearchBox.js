import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import classes from './SearchBox.module.scss';
import * as actions from '../../store/actions/index';
import axios from '../../axios/axios-expenses';

const debounce = (cb, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => cb(...args), delay);
  };
};

function SearchBox({ onSetExpenses, onGetExpenses }) {
  const [searchValue, setValue] = useState('');

  const callAPI = async searchTerm => {
    if (searchTerm.length >= 2) {
      const link = `?limit=${10000}&offset=0`;

      try {
        const allExpenses = await axios.get(`/expenses${link}`);

        const res = allExpenses.data.expenses.filter(el => {
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
      } catch (e) {
        console.log(e);
      }
    } else {
      onGetExpenses({ offset: 0, limit: 35 });
    }
  };

  const debouncedCallAPI = useCallback(
    debounce(value => callAPI(value), 250),
    []
  );

  function handleChange(value) {
    setValue(value);
    debouncedCallAPI(value);
  }

  return (
    <input
      className={classes.search}
      type="search"
      placeholder="Min 2 char search"
      onChange={e => handleChange(e.target.value)}
      value={searchValue}
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
  searchVal: PropTypes.string,
  totalEntries: PropTypes.number,
  onSetExpenses: PropTypes.func,
  onGetExpenses: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
