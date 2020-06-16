import React, { useEffect, useState } from 'react';

import axios from '../../axios/axios-expenses';
import SearchBox from '../../components/SearchBox/SearchBox';

function Filters() {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    const getAllExpenses = async () => {
      try {
        const allExpenses = await axios.get(`/expenses?limit=10000&offset=0`);
        setExpenses(allExpenses.data.expenses);
      } catch (e) {
        console.log(e);
      }
    };

    getAllExpenses();
  }, []);

  return <SearchBox allExpenses={expenses} />;
}

Filters.propTypes = {};

export default Filters;
