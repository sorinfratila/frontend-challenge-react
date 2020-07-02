import React from 'react';
import PropTypes from 'prop-types';
import classes from './Backdrop.module.scss';

function Backdrop({ show, onClickBackdrop }) {
  return show ? (
    <div onClick={onClickBackdrop} className={classes.backdrop}></div>
  ) : null;
}

Backdrop.propTypes = {
  show: PropTypes.bool,
  onClickBackdrop: PropTypes.func,
};

export default Backdrop;
