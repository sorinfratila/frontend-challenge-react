import React from 'react';
import {
  render,
  screen,
  waitForElement,
  waitForDomChange,
} from '@testing-library/react';
import { Provider } from 'react-redux';
import userEvent from '@testing-library/user-event';
import configureMockStore from 'redux-mock-store';
import '@testing-library/jest-dom/extend-expect';
import fetchMock from 'jest-fetch-mock';

import App from './App';
import firstPageRes from './__mocks__/firstPageRes.json';
import secondPageRes from './__mocks__/secondPageRes.json';
import { expenses } from './__mocks__/expenses';
import Pagination from './components/Pagination/Pagination';
import { act } from 'react-dom/test-utils';

fetchMock.enableMocks();

const mockStore = configureMockStore();
const store = mockStore({
  expenses,
  totalEntries: 168,
  isLoading: false,
  pages: [1, 2, 3, 4, 5],
  currentPage: 1,
  error: null,
});

function setupPagination() {
  return render(
    <Provider store={store}>
      <React.StrictMode>
        <Pagination></Pagination>
      </React.StrictMode>
    </Provider>
  );
}

function setupApp() {
  return render(
    <Provider store={store}>
      <React.StrictMode>
        <App></App>
      </React.StrictMode>
    </Provider>
  );
}

describe('Pagination', () => {
  // test('On first load, page 1 should be selected', () => {
  //   setupPagination();
  //   screen.debug();

  //   const selectedPage = screen.getByRole('button', { name: /1/i });
  //   expect(selectedPage).toHaveClass('selected');
  // });

  test('When clicking on the second page, first page should be unselected and 2nd page should be selected', async () => {
    // fetch.once(JSON.stringify(secondPageRes));
    setupApp();
    screen.debug();

    const firstPage = screen.getByRole('button', { name: /1/i });
    const secondPage = screen.getByRole('button', { name: /2/i });
    // expect(secondPage).toBeInTheDocument();
    userEvent.click(secondPage);

    screen.debug();
  });
});
