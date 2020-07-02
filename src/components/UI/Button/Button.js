import React from 'react';
import PropTypes from 'prop-types';
import classes from './Button.module.scss';

function Button({
  type = 'secondary',
  icon = null,
  children,
  fontSize = '2.5rem',
  onClick,
  ...props
}) {
  const Icon = icon;
  let element = null;
  const classesArr = [classes.btn];

  if (type === 'primary') {
    classesArr.push(classes.primary);
  } else classesArr.push(classes.secondary);

  Icon && (element = <Icon style={{ fontSize }} />);

  if (Icon) {
    return (
      <button {...props} className={classes.btn__icon} onClick={onClick}>
        {element} {children}
      </button>
    );
  }

  return (
    <button {...props} className={classesArr.join(' ')} onClick={onClick}>
      {element} {children}
    </button>
  );
}

Button.propTypes = {
  icon: PropTypes.element,
  text: PropTypes.string,
  fontSize: PropTypes.string,
  onClick: PropTypes.func,
  children: PropTypes.any,
  type: PropTypes.string,
};

export default Button;
