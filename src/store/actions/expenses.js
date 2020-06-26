import actions from './actionTypes';

export const getExpenses = ({ offset = 0, limit = 25 }) => {
  return {
    type: actions.GET_EXPENSES,
    payload: {
      offset,
      limit,
    },
  };
};

export const getExpensesSuccess = (expenses, total, pages) => {
  return {
    type: actions.GET_EXPENSES_SUCCESS,
    expenses,
    totalEntries: total,
    pages,
  };
};

export const setExpenses = ({ expenses, total, pages }) => {
  return {
    type: actions.SET_EXPENSES,
    expenses,
    totalEntries: total,
    pages,
  };
};

export const changePage = page => {
  return {
    type: actions.CHANGE_PAGE,
    page,
  };
};

export const changePageSuccess = page => {
  return {
    type: actions.CHANGE_PAGE_SUCCESS,
    currentPage: page,
  };
};
