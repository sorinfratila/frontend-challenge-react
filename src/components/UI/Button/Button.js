import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.scss';

function Button({ icon = null, text = null, fontSize = '2.5rem', clicked }) {
  const Icon = icon;
  let element = null;

  Icon && (element = <Icon style={{ fontSize }} />);

  return (
    <button className={classes.btn} onClick={clicked}>
      {element} {text}
    </button>
  );
}

Button.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string,
  fontSize: PropTypes.string,
  clicked: PropTypes.func,
};

export default Button;
