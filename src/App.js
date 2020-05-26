import React from 'react';
import classes from './App.module.scss';
import Expenses from './containers/Expenses/Expenses';

function App() {
  return (
    <div className={classes.container}>
      <div className={classes.container__wrapper}>
        <div className={classes.header}>Header</div>
        <div className={classes.container__scroll}>
          <Expenses />
        </div>
        <div className={classes.footer}>footer</div>
      </div>
    </div>
  );
}

export default App;
