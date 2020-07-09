import React from 'react';
import PropTypes from 'prop-types';
import classes from './Input.module.scss';

function Input({
  elementConfig,
  elementType,
  value,
  changed,
  label,
  ...other
}) {
  let inputElement = null;
  const inputClasses = [classes.input];

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
    case 'file': {
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
          <label className={classes.label} htmlFor="random">
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
    case 'textarea': {
      inputElement = (
        <textarea
          {...other}
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
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

  return <>{inputElement}</>;
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
