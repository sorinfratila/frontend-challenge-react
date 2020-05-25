import React from 'react';
import classes from './App.module.scss';
import Expense from './components/Expense/Expense';

function App() {
  return (
    <div className={classes.App}>
      <Expense />
    </div>
  );
}

export default App;
