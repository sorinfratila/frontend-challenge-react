import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../../store/actions/index';
import axios from '../../axios/axios-expenses';
import Spinner from '../../components/UI/Spinner/Spinner';
import Expense from '../../components/Expense/Expense';
import classes from './Expenses.module.scss';
import Modal from '../../components/UI/Modal/Modal';
import AddComment from '../../components/Expense/AddComment/AddComment';
import AddPhoto from '../../components/Expense/AddPhoto/AddPhoto';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

function Expenses({ onGetExpenses, onSetExpenses, isLoading, expenses }) {
  const [modalState, setModalState] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: '',
    expenseId: '',
    index: -1,
  });
  const [comment, setComment] = useState({
    elementType: 'textarea',
    elementConfig: {
      type: 'text',
      placeholder: 'Write your comment here',
      rows: '10',
    },
    value: '',
  });
  const [file, setFile] = useState({
    elementType: 'file',
    elementConfig: {
      type: 'file',
    },
    value: '',
  });

  useEffect(() => {
    onGetExpenses({ limit: 35, offset: 0 });
  }, [onGetExpenses]);

  const onClickPhoto = (e, id, index) => {
    e.stopPropagation();
    setModalContent({ title: 'Add Receipt', expenseId: id, index });
    setModalState(true);
  };

  const onClickComment = (e, id, index) => {
    e.stopPropagation();
    setModalContent({ title: 'Add Comment', expenseId: id, index });
    setModalState(true);
  };

  const addCommentHandler = async () => {
    const payload = {
      comment: comment.value,
    };
    const res = await axios.post(
      `/expenses/${modalContent.expenseId}`,
      payload
    );

    const expensesCopy = expenses.slice();
    expensesCopy.splice(modalContent.index, 1, res.data);
    onSetExpenses({ expenses: expensesCopy });

    setComment({ ...comment, value: '' });
    setModalState(false);
  };

  const addPhotoHandler = async () => {
    const formData = new FormData();
    formData.append('receipt', file.value);

    const res = await axios.post(
      `/expenses/${modalContent.expenseId}/receipts`,
      formData
    );

    const expensesCopy = expenses.slice();
    expensesCopy.splice(modalContent.index, 1, res.data);
    onSetExpenses({ expenses: expensesCopy });

    setFile({ ...file, value: '' });
    setModalState(false);
  };

  let expensesEl = <Spinner />;

  !isLoading &&
    (expensesEl = expenses.map((ex, index) => (
      <Expense
        expense={ex}
        key={ex.id}
        onClickPhoto={e => onClickPhoto(e, ex.id, index)}
        onClickComment={e => onClickComment(e, ex.id, index)}
      />
    )));

  !expenses.length && (expensesEl = <p>No matches</p>);

  return (
    <div className={classes.container}>
      <Modal
        title={modalContent.title}
        show={modalState}
        modalClosed={() => setModalState(false)}>
        {modalContent.title === 'Add Comment' ? (
          <AddComment
            comment={comment}
            setComment={setComment}
            setModalState={setModalState}
            addCommentHandler={addCommentHandler}
          />
        ) : (
          <AddPhoto
            file={file}
            setFile={setFile}
            setModalState={setModalState}
            addPhotoHandler={addPhotoHandler}
          />
        )}
      </Modal>
      {expensesEl}
    </div>
  );
}

Expenses.propTypes = {
  onGetExpenses: PropTypes.func,
  onSetExpenses: PropTypes.func,
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
    onSetExpenses: payload => dispatch(actions.setExpenses(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Expenses);
