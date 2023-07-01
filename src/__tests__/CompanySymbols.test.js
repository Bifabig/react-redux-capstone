import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import renderer from 'react-test-renderer';
import { useDispatch, useSelector } from 'react-redux';
import CompanySymbols from '../components/CompanySymbols';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../redux/symbols/symbolsSlice', () => ({
  getSymbols: jest.fn(),
  getSearchResult: jest.fn(),
}));

describe('CompanySymbols', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({
      slicedSymbols: [],
      symbols: [],
      error: undefined,
      hasMore: true,
    });
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Router>
          <CompanySymbols />
        </Router>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
