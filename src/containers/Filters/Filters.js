import React, { useEffect, useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import classes from './Filters.module.scss';
import axios from '../../axios/axios-expenses';
import Input from '../../components/UI/Input/Input';
import * as actions from '../../store/actions/index';

const debounce = (cb, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => cb(...args), delay);
  };
};

function Filters({ onSetExpenses, onGetExpenses }) {
  // Sets containing all the years and currencies in the DB
  const date = new Set();
  const currency = new Set();

  const [allExpenses, setAllExpenses] = useState([]);
  const [filters, setFilters] = useState({
    search: {
      elementType: 'input',
      elementConfig: {
        type: 'search',
        placeholder: 'Min 2 characters',
      },
      value: '',
    },
    date: {
      elementType: 'select',
      elementConfig: {
        options: [{ name: 'All entries', value: '' }],
      },
      value: '',
    },
    currency: {
      elementType: 'select',
      elementConfig: {
        options: [{ name: 'All entries', value: '' }],
      },
      value: '',
    },
  });

  const inputChangedHandler = (event, inputIdentifier) => {
    const updatedFilters = { ...filters };
    const updatedFormElement = {
      ...updatedFilters[inputIdentifier],
    };

    updatedFormElement.value = event.target.value;
    updatedFilters[inputIdentifier] = updatedFormElement;
    setFilters(updatedFilters);

    // if (inputIdentifier === 'search') {
    debouncedCall({
      search: updatedFilters.search.value,
      date: updatedFilters.date.value,
      currency: updatedFilters.currency.value,
    });
    // }
  };

  /**
   * setting the filter options after interating through the DB data
   * @param {Set} options - the options extracted from the DB expenses
   */
  const setFilterOptions = options => {
    return [...options].map(el => {
      return {
        name: el,
        value: el,
      };
    });
  };

  /**
   * Reusable helper function to set initial filter options based on extracted from BE data
   * @param {String} control the state control param like date or currency
   * @param {Set} dataSet the Set control data; eg: date or currency
   */
  const setStateFilter = (control, dataSet) => {
    return {
      ...filters[control],
      elementConfig: {
        ...filters[control].elementConfig,
        options: [
          ...filters[control].elementConfig.options,
          ...setFilterOptions(dataSet),
        ],
      },
    };
  };

  // getting all expenses on mount to handle search and filters
  useEffect(() => {
    const getAllExpenses = async () => {
      try {
        const {
          data: { expenses },
        } = await axios.get(`/expenses?limit=10000&offset=0`);
        setAllExpenses(expenses);

        expenses.forEach(ex => {
          date.add(new Date(ex.date).getFullYear().toString());
          currency.add(ex.amount.currency);
        });

        setFilters({
          ...filters,
          date: setStateFilter('date', date),
          currency: setStateFilter('currency', currency),
        });
      } catch (e) {
        console.log(e);
      }
    };

    getAllExpenses();
  }, []);

  const search = ({ search, date, currency }) => {
    const postFilterExpenses = allExpenses
      .filter(exp => exp.amount.currency.includes(currency))
      .filter(res =>
        new Date(res.date).getFullYear().toString().includes(date)
      );

    if (search.length >= 2) {
      const res = postFilterExpenses.filter(el => {
        const {
          user: { first, last, email },
          merchant,
          amount: { currency, value },
        } = el;

        return (
          first.toLowerCase().search(search.toLowerCase()) > -1 ||
          (email && email.toLowerCase().search(search.toLowerCase()) > -1) ||
          last.toLowerCase().search(search.toLowerCase()) > -1 ||
          merchant.toLowerCase().search(search.toLowerCase()) > -1 ||
          currency.toLowerCase().search(search.toLowerCase()) > -1 ||
          value.toLowerCase().search(search.toLowerCase()) > -1
        );
      });

      onSetExpenses({ expenses: res, total: allExpenses.length, pages: [1] });
    } else if (search.length === 1) {
      // do nothing
    } else {
      if (date === '' && currency === '') {
        onGetExpenses({ offset: 0, limit: 35 });
      } else {
        onSetExpenses({
          expenses: postFilterExpenses,
          total: allExpenses.length,
          pages: [1],
        });
      }
    }
  };

  const debouncedCall = useCallback(
    debounce(value => search(value), 500),
    [allExpenses]
  );

  const filtersArr = [];

  for (let key in filters) {
    filtersArr.push({
      id: key,
      config: filters[key],
    });
  }

  const filtersEl = (
    <div className={classes.filter_container}>
      {filtersArr.map(filter => {
        return (
          <Input
            label={filter.id}
            key={filter.id}
            elementConfig={filter.config.elementConfig}
            elementType={filter.config.elementType}
            value={filter.config.value}
            changed={event => inputChangedHandler(event, filter.id)}
          />
        );
      })}
    </div>
  );

  return <div className={classes.container}>{filtersEl}</div>;
}

const mapDispatchToProps = dispatch => {
  return {
    onSetExpenses: payload => dispatch(actions.setExpenses(payload)),
    onGetExpenses: payload => dispatch(actions.getExpenses(payload)),
  };
};

Filters.propTypes = {
  onSetExpenses: PropTypes.func,
  onGetExpenses: PropTypes.func,
};

export default connect(null, mapDispatchToProps)(Filters);
