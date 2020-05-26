import { takeEvery } from 'redux-saga/effects';
import actions from '../actions/actionTypes';
import { getExpensesSaga } from './expenses';

export function* watchExpenses() {
  yield takeEvery(actions.GET_EXPENSES_REQUEST, getExpensesSaga);
}
