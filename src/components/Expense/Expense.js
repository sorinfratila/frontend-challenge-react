import React, { useState } from 'react';
import { ExpandMore, AddAPhoto, AddComment } from '@material-ui/icons';
import classes from './Expense.module.scss';
import PropTypes from 'prop-types';
import Button from '../UI/Button/Button';
function Expense({ expense, onClickPhoto, onClickComment }) {
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
        <Button icon={AddAPhoto} clicked={onClickPhoto} />
        <Button icon={AddComment} clicked={onClickComment} />
      </div>
    </header>
  );
}

Expense.propTypes = {
  expense: PropTypes.object,
  onClickPhoto: PropTypes.func,
  onClickComment: PropTypes.func,
};

export default Expense;
