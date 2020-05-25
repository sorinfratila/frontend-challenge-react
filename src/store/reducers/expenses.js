import actions from '../actions/actionTypes';

const initialState = {
  expenses: [],
  language: 'en',
};

const expenses = (state = initialState, action) => {
  switch (action.type) {
    case actions.GET_EXPENSES: {
      return {
        ...state,
        expenses: action.expenses,
      };
    }
    default: {
      return state;
    }
  }
};

export default expenses;
