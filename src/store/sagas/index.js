import { takeEvery, all } from 'redux-saga/effects';
import actions from '../actions/actionTypes';
import { getExpensesSaga, changePageSaga } from './expenses';

export function* watchExpenses() {
  yield all([
    takeEvery(actions.GET_EXPENSES_REQUEST, getExpensesSaga),
    takeEvery(actions.CHANGE_PAGE_REQUEST, changePageSaga),
  ]);
}
