import actions from '../actions/actionTypes';

const initialState = {
  expenses: [],
  totalEntries: 0,
  isLoading: false,
  pages: [],
  currentPage: 1,
};

const expenses = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_EXPENSES_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actions.GET_EXPENSES_SUCCESS: {
      return {
        ...state,
        expenses: action.expenses,
        totalEntries: action.totalEntries,
        isLoading: false,
        pages: action.pages,
      };
    }
    case actions.CHANGE_PAGE_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actions.CHANGE_PAGE_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        currentPage: action.currentPage,
      };
    }
    case actions.SET_EXPENSES: {
      return {
        ...state,
        expenses: action.expenses,
        total: action.totalEntries,
        pages: action.pages,
      };
    }
    default: {
      return state;
    }
  }
};

export default expenses;
