import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { QueryCache } from 'react-query';
// src/setupTests.js
import { server } from './test/mocks/server';

// jest.mock('zustand');
jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => {
  const queryCache = new QueryCache();
  server.resetHandlers();
  queryCache.clear();
});

// Clean up after the tests are finished.
afterAll(() => server.close());
