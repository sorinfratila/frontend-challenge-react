import React from 'react';
import PropTypes from 'prop-types';
import classes from './AccordionBody.module.scss';

function AccordionBody({ render, opened }) {
  const classesArr = [classes.accordionBody];
  opened && classesArr.push(classes.opened);

  return <section className={classesArr.join(' ')}>{render()}</section>;
}

AccordionBody.propTypes = {
  render: PropTypes.func,
  opened: PropTypes.bool,
};

export default AccordionBody;
