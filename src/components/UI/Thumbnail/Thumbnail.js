import React from 'react';
import PropTypes from 'prop-types';
import classes from './Thumbnail.module.scss';

function Thumbnail({ src, small = false }) {
  const classesArr = [classes.container];

  small && classesArr.push(classes.small);
  return (
    <a downdload href={src} className={classesArr.join(' ')}>
      <img src={src} alt="Receipt"></img>
    </a>
  );
}

Thumbnail.propTypes = {
  src: PropTypes.string,
  small: PropTypes.bool,
};

export default Thumbnail;
