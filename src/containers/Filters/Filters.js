import React, { useEffect, useState } from 'react';

import classes from './Filters.module.scss';
import axios from '../../axios/axios-expenses';
import SearchBox from '../../components/SearchBox/SearchBox';
import Input from '../../components/UI/Input/Input';

function Filters() {
  const [expenses, setExpenses] = useState([]);
  const [filters, setFilters] = useState({
    date: {
      elementType: 'select',
      elementConfig: {
        options: [],
      },
      value: '',
    },
    currency: {
      elementType: 'select',
      elementConfig: {
        options: [],
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
  };

  // setting the filter options after interating through the DB data
  const setFilterOptions = options => {
    return [...options].map(el => {
      return {
        name: el,
        value: el,
      };
    });
  };

  // Sets containing all the years and currencies in the DB
  const date = new Set();
  const currency = new Set();

  // getting all expenses on mount to handle search and filters
  useEffect(() => {
    const getAllExpenses = async () => {
      try {
        const {
          data: { expenses },
        } = await axios.get(`/expenses?limit=10000&offset=0`);
        setExpenses(expenses);

        expenses.forEach(ex => {
          date.add(new Date(ex.date).getFullYear());
          currency.add(ex.amount.currency);
        });

        setFilters({
          ...filters,
          date: {
            ...filters.date,
            elementConfig: {
              ...filters.date.elementConfig,
              options: setFilterOptions(date),
            },
          },
          currency: {
            ...filters.currency,
            elementConfig: {
              ...filters.currency.elementConfig,
              options: setFilterOptions(currency),
            },
          },
        });
      } catch (e) {
        console.log(e);
      }
    };

    getAllExpenses();
  }, []);

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

  return (
    <div className={classes.container}>
      <SearchBox allExpenses={expenses} />
      {filtersEl}
    </div>
  );
}

Filters.propTypes = {};

export default Filters;
