import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './Pagination.module.scss';
import * as actions from '../../store/actions/index';

function Pagination({ currentPage, pages, onPageChange }) {
  const pagination = pages.map(page => {
    return (
      <a
        onClick={() => onPageChange(page)}
        className={
          page === currentPage
            ? [classes.page, classes.selected].join(' ')
            : classes.page
        }
        key={page}>
        {page}
      </a>
    );
  });

  return <>{pagination}</>;
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  pages: PropTypes.array.isRequired,
  onPageChange: PropTypes.func,
};

const mapStateToProps = state => {
  return {
    currentPage: state.currentPage,
    pages: state.pages,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPageChange: page => dispatch(actions.changePage(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
