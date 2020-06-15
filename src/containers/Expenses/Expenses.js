import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import PropTypes from 'prop-types';
import Spinner from '../../components/UI/Spinner/Spinner';
import Expense from '../../components/Expense/Expense';
import classes from './Expenses.module.scss';

function Expenses({ onGetExpenses, isLoading, expenses }) {
  useEffect(() => {
    onGetExpenses({ limit: 35, offset: 0 });
  }, [onGetExpenses]);

  let expensesEl = <Spinner />;

  !isLoading &&
    (expensesEl = expenses.map(ex => <Expense expense={ex} key={ex.id} />));

  !expenses.length && (expensesEl = <p>No matches</p>);

  return <div className={classes.container}>{expensesEl}</div>;
}

Expenses.propTypes = {
  onGetExpenses: PropTypes.func,
  isLoading: PropTypes.bool,
  expenses: PropTypes.array,
};

const mapStateToProps = state => {
  return {
    expenses: state.expenses,
    isLoading: state.isLoading,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onGetExpenses: payload => dispatch(actions.getExpenses(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
