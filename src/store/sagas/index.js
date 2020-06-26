import { takeEvery, all } from 'redux-saga/effects';
import actions from '../actions/actionTypes';
import { getExpensesSaga, changePageSaga } from './expenses';

export function* watchExpenses() {
  yield all([
    takeEvery(actions.GET_EXPENSES, getExpensesSaga),
    takeEvery(actions.CHANGE_PAGE, changePageSaga),
  ]);
}
