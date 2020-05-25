import React, { useState } from 'react';
import { ExpandMore, AddAPhoto, AddComment } from '@material-ui/icons';
import classes from './Expense.module.scss';
// import PropTypes from 'prop-types';

function Expense() {
  const [headerOpen, setHeaderOpen] = useState({ inOpen: false });

  const onHeaderPress = isOpen => {
    setHeaderOpen({ isOpen: !isOpen });
  };

  return (
    <header
      className={classes.header}
      onClick={() => onHeaderPress(headerOpen)}>
      <div className={classes.left}>
        <div className={classes.caret}>
          <ExpandMore />
        </div>
        <div className={classes.content}>
          <div>
            <span>FirstName</span>
            <span>LastName</span>
          </div>
          <div>
            <span>Value</span>
            <span>Currency</span>
          </div>
        </div>
      </div>
      <div className={classes.right}>
        <a className="pointer">
          <AddAPhoto />
        </a>
        <a className="pointer">
          <AddComment />
        </a>
      </div>
    </header>
  );
}

Expense.propTypes = {};

export default Expense;
