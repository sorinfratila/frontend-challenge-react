import React from 'react';
import PropTypes from 'prop-types';

import classes from './AddComment.module.scss';
import Input from '../../UI/Input/Input';
import Button from '../../UI/Button/Button';

function AddComment({ comment, setComment, setModalState, addCommentHandler }) {
  return (
    <>
      <section className={classes.container}>
        <Input
          elementType={comment.elementType}
          elementConfig={comment.elementConfig}
          value={comment.value}
          changed={event =>
            setComment({ ...comment, value: event.target.value })
          }
        />
      </section>
      <footer className={classes.modalFooter}>
        <Button onClick={() => setModalState(false)}>Cancel</Button>
        <Button type="primary" onClick={addCommentHandler}>
          Apply
        </Button>
      </footer>
    </>
  );
}

AddComment.propTypes = {
  comment: PropTypes.object,
  setComment: PropTypes.func,
  setModalState: PropTypes.func,
  addCommentHandler: PropTypes.func,
};

export default AddComment;
