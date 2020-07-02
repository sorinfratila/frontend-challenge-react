import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classes from './AddComment.module.scss';
import Input from '../../UI/Input/Input';

function AddComment({ expenseId }) {
  const [comment, setComment] = useState({
    elementType: 'textarea',
    elementConfig: {
      // type: 'text',
      placeholder: 'Write your comment here',
      rows: '10',
      cols: '50',
    },
    value: '',
  });

  return (
    <section className={classes.container}>
      <Input
        elementConfig={comment.elementConfig}
        elementType={comment.elementType}
        value={comment.value}
        changed={event => setComment({ ...comment, value: event.target.value })}
      />
    </section>
  );
}

AddComment.propTypes = {
  expenseId: PropTypes.string,
};

export default AddComment;
