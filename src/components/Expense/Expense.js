import React, { useState } from 'react';
import classes from './Expense.module.scss';
import PropTypes from 'prop-types';

import AccordionBody from '../UI/Accordion/AccordionBody/AccordionBody';
import AccordionTable from '../ExpenseAccordion/AccordionExpenseTable/AccordionTable';
import AccordionExpenseHeader from '../ExpenseAccordion/AccordionExpenseHeader/AccordionExpenseHeader';
import AccordionHeader from '../UI/Accordion/AccordionHeader/AccordionHeader';
function Expense({ expense, onClickPhoto, onClickComment }) {
  const [headerOpen, setHeaderOpen] = useState(false);
  const rows = [];

  const classArr = [classes.caret];
  headerOpen && classArr.push(classes.headerOpen);

  for (let key in expense) {
    if (['date', 'merchant', 'receipts', 'category', 'comment'].includes(key)) {
      rows.push({ label: key, value: expense[key] });
    }
  }

  return (
    <>
      <AccordionHeader
        render={() => (
          <AccordionExpenseHeader
            headerOpen={headerOpen}
            setHeaderOpen={setHeaderOpen}
            expense={expense}
            onClickComment={onClickComment}
            onClickPhoto={onClickPhoto}
          />
        )}
      />
      <AccordionBody
        opened={headerOpen}
        render={() => <AccordionTable rows={rows} />}
      />
    </>
  );
}

Expense.propTypes = {
  expense: PropTypes.object,
  onClickPhoto: PropTypes.func,
  onClickComment: PropTypes.func,
  accordionBody: PropTypes.func,
};

export default Expense;
