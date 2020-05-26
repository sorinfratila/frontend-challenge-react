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
    const {
      data: { expenses, total },
    } = yield axios.get(`/expenses${link}`);

    const pages = getPages(total, payload.limit);

    yield put(actions.getExpensesSuccess(expenses, total, pages));
  } catch (e) {
    console.log(e);
    // yield put(actions.getEx(e.response.data.error));
  }
}
