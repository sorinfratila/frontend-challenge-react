import React, { useState } from 'react';
import { ExpandMore, AddAPhoto, AddComment } from '@material-ui/icons';
import classes from './Expense.module.scss';
import PropTypes from 'prop-types';

function Expense({ expense }) {
  const [headerOpen, setHeaderOpen] = useState(false);

  return (
    <header
      className={classes.header}
      onClick={() => setHeaderOpen(!headerOpen)}>
      <div className={classes.left}>
        <div className={classes.caret}>
          <ExpandMore />
        </div>
        <div className={classes.content}>
          <div>
            <span>{expense.user.first}</span>
            <span>{expense.user.last}</span>
          </div>
          <div>
            <span>{expense.amount.value}</span>
            <span>{expense.amount.currency}</span>
          </div>
        </div>
      </div>
      <div className={classes.right}>
        <a className="pointer">
          <AddAPhoto style={{ fontSize: '2.5rem' }} />
        </a>
        <a className="pointer">
          <AddComment style={{ fontSize: '2.5rem' }} />
        </a>
      </div>
    </header>
  );
}

Expense.propTypes = {
  expense: PropTypes.object,
};

export default Expense;
