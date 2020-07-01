import React from 'react';
import PropTypes from 'prop-types';

function AccordionHeader({ render }) {
  return <>{render()}</>;
}

AccordionHeader.propTypes = {
  render: PropTypes.func,
  onHeaderClick: PropTypes.func,
};

export default AccordionHeader;
