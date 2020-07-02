import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import PropTypes from 'prop-types';
import Spinner from '../../components/UI/Spinner/Spinner';
import Expense from '../../components/Expense/Expense';
import classes from './Expenses.module.scss';
import Modal from '../../components/UI/Modal/Modal';
import Button from '../../components/UI/Button/Button';
import AddComment from '../../components/Expense/AddComment/AddComment';
import AddPhoto from '../../components/Expense/AddPhoto/AddPhoto';

function Expenses({ onGetExpenses, isLoading, expenses }) {
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    expenseId: '',
  });

  useEffect(() => {
    onGetExpenses({ limit: 35, offset: 0 });
  }, [onGetExpenses]);

  const onClickPhoto = (e, id) => {
    e.stopPropagation();
    setModalContent({ title: 'Add Receipt', expenseId: id });
    setModalState(true);
  };

  const onClickComment = (e, id) => {
    e.stopPropagation();
    setModalContent({ title: 'Add Comment', expenseId: id });
    setModalState(true);
  };

  const addCommentHandler = expenseId => {};

  let expensesEl = <Spinner />;

  !isLoading &&
    (expensesEl = expenses.map(ex => (
      <Expense
        expense={ex}
        key={ex.id}
        onClickPhoto={e => onClickPhoto(e, ex.id)}
        onClickComment={e => onClickComment(e, ex.id)}
      />
    )));

  !expenses.length && (expensesEl = <p>No matches</p>);

  return (
    <div className={classes.container}>
      <Modal
        title={modalContent.title}
        show={modalState}
        modalClosed={() => setModalState(false)}
        renderFooter={() => (
          <footer className={classes.modalFooter}>
            <Button onClick={() => setModalState(false)}>Cancel</Button>
            <Button type={'primary'} onClick={() => setModalState(false)}>
              Apply
            </Button>
          </footer>
        )}>
        {modalContent.title === 'Add Comment' ? <AddComment /> : <AddPhoto />}
      </Modal>
      {expensesEl}
    </div>
  );
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
