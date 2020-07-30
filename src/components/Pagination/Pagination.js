import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import classes from './Pagination.module.scss';
import * as actions from '../../store/actions/index';

// const getPagesArr = (totalEntries, limit = 35) => {
//   if (totalEntries !== 0 && limit !== 0) {
//     const length = Math.ceil(totalEntries / limit);
//     const pages = Array.from(Array(length), (_, index) => index + 1);
//     return pages;
//   }

//   return [];
// };

function Pagination({ currentPage, pages, onPageChange }) {
  // const pagesArr = getPagesArr(totalEntries, expenses.length);

  const pagination = pages.map(page => {
    return (
      <a
        role="button"
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
