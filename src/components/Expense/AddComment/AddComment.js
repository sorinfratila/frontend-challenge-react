import React from 'react';
import PropTypes from 'prop-types';

import classes from './AddComment.module.scss';
import Input from '../../UI/Input/Input';

function AddComment({ comment, setComment }) {
  return (
    <section className={classes.container}>
      <Input
        elementType={comment.elementType}
        elementConfig={comment.elementConfig}
        value={comment.value}
        changed={event => setComment({ ...comment, value: event.target.value })}
      />
    </section>
  );
}

AddComment.propTypes = {
  comment: PropTypes.object,
  setComment: PropTypes.func,
  setModalState: PropTypes.func,
  addCommentHandler: PropTypes.func,
};

export default AddComment;
