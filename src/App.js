import React from 'react';
import classes from './App.module.scss';
import Expenses from './containers/Expenses/Expenses';
import Pagination from './components/Pagination/Pagination';
import Filters from './containers/Filters/Filters';

function App() {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Filters />
        <div>filters</div>
      </div>
      <div className={classes.container__scroll}>
        <Expenses />
      </div>

      <div className={classes.footer}>
        <Pagination />
      </div>
    </div>
  );
}

export default App;
