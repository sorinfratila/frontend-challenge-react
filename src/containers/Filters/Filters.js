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
    updatedFormElement[inputIdentifier] = updatedFormElement;
    setFilters(updatedFilters);
  };

  const setOptions = filter => {};

  const date = new Set();
  const currency = new Set();

  useEffect(() => {
    // getting all expenses once to handle search and filters
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
    <div>
      {filtersArr.map(filter => (
        <Input
          key={filter.id}
          elementConfig={filter.config.elementConfig}
          elementType={filter.config.elementType}
          value={filter.config.value}
          changed={event => inputChangedHandler(event, filter.id)}
        />
      ))}
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
