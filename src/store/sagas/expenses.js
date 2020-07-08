import { put } from 'redux-saga/effects';
import axios from '../../axios/axios-expenses';
import * as actions from '../actions/index';

const getPages = (totalEntries, limit) => {
  const length = Math.ceil(totalEntries / limit);
  const pages = Array.from(Array(length), (_, index) => index + 1);
  return pages;
};

export function* getExpensesSaga({ payload }) {
  try {
    const link = payload
      ? `?limit=${payload.limit}&offset=${payload.offset}`
      : '';

    const response = yield axios.get(`/expenses${link}`);

    const pages = getPages(response.data.total, payload.limit);

    yield put(
      actions.getExpensesSuccess(
        response.data.expenses,
        response.data.total,
        pages
      )
    );
  } catch (e) {
    console.log('WE ARE IN ERROR NOW', e);
    yield put(actions.getExpensesFail(e.response.data.error));
  }
}

export function* changePageSaga({ page }) {
  try {
    const payload = { limit: 35, offset: (page - 1) * 35 };
    yield put(actions.getExpenses(payload));
    yield put(actions.changePageSuccess(page));
  } catch (e) {
    console.log(e);
  }
}
