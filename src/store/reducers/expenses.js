import actions from '../actions/actionTypes';

const initialState = {
  expenses: [],
  totalEntries: 0,
  isLoading: false,
  pages: [],
  currentPage: 1,
  error: null,
};

const expenses = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_EXPENSES: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case actions.GET_EXPENSES_SUCCESS: {
      console.log(action.expenses);
      return {
        ...state,
        expenses: action.expenses,
        totalEntries: action.totalEntries,
        isLoading: false,
        error: null,
        pages: action.pages,
      };
    }
    case actions.GET_EXPENSES_FAIL: {
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    }
    case actions.SET_EXPENSES: {
      return {
        ...state,
        expenses: action.expenses,
        totalEntries: action.totalEntries || state.totalEntries,
        pages: action.pages || state.pages,
        currentPage: action.currentPage || state.currentPage,
      };
    }
    case actions.CHANGE_PAGE: {
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
    default: {
      return state;
    }
  }
};

export default expenses;
