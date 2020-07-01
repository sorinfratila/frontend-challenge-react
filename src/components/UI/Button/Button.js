import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.scss';

function Button({ icon = null, children, fontSize = '2.5rem', clicked }) {
  const Icon = icon;
  let element = null;

  Icon && (element = <Icon style={{ fontSize }} />);

  return (
    <button className={classes.btn} onClick={clicked}>
      {element} {children}
    </button>
  );
}

Button.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string,
  fontSize: PropTypes.string,
  clicked: PropTypes.func,
  children: PropTypes.any,
};

export default Button;
