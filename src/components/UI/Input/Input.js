import React from 'react';
import PropTypes from 'prop-types';
import classes from './Input.module.scss';

function Input({ elementConfig, elementType, value, changed, label }) {
  let inputElement = null;
  const inputClasses = [classes.Input];

  // if (props.invalid && props.shouldValidate && props.touched) {
  //   inputClasses.push(classes.Invalid);
  // }

  switch (elementType) {
    case 'input': {
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    }
    case 'select': {
      inputElement = (
        <div className={classes.select_container}>
          <label className={classes.label} htmlFor="">
            {label}
          </label>
          <select className={classes.select} value={value} onChange={changed}>
            {elementConfig.options.map(option => (
              <option key={option.value} value={option.value}>
                {option.name}
              </option>
            ))}
          </select>
        </div>
      );
      break;
    }
    default: {
      inputElement = (
        <input
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    }
  }

  return <div>{inputElement}</div>;
}

Input.propTypes = {
  elementType: PropTypes.string,
  label: PropTypes.string,
  elementConfig: PropTypes.shape({
    options: PropTypes.array,
  }),
  value: PropTypes.string,
  changed: PropTypes.func,
  invalid: PropTypes.bool,
  shouldValidate: PropTypes.any,
  touched: PropTypes.bool,
};

export default Input;
