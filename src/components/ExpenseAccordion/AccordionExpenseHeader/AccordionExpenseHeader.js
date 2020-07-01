import React from 'react';
import PropTypes from 'prop-types';
import { ExpandMore, AddAPhoto, AddComment } from '@material-ui/icons';

import classes from './AccordionExpenseHeader.module.scss';
import Button from '../../UI/Button/Button';

function AccordionExpenseHeader({
  expense,
  onClickComment,
  onClickPhoto,
  headerOpen,
  setHeaderOpen,
}) {
  const classArr = [classes.caret];
  headerOpen && classArr.push(classes.headerOpen);

  return (
    <header
      className={classes.header}
      onClick={() => {
        console.log('clicked');
        setHeaderOpen(!headerOpen);
      }}>
      <div className={classes.left}>
        <div className={classArr.join(' ')}>
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

AccordionExpenseHeader.propTypes = {
  onClickPhoto: PropTypes.func,
  onClickComment: PropTypes.func,
  expense: PropTypes.object,
  headerOpen: PropTypes.bool,
  setHeaderOpen: PropTypes.func,
};

export default AccordionExpenseHeader;
