import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import Search from '../components/Search';

import {
  getSearchResult,
} from '../redux/symbols/symbolsSlice';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../redux/symbols/symbolsSlice', () => ({
  getSearchResult: jest.fn(),
}));

describe('Search', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({
      searchSymbols: [],
      allSymbols: [],
      symbols: [],
      isLoading: false,
      error: undefined,
      hasMore: true,
    });
  });

  it('should dispatch getSearchResult when symbols array is empty', () => {
    useSelector.mockReturnValue({
      searchSymbols: [],
      symbols: [],
      error: null,
      hasMore: true,
    });

    const { container } = render(<MemoryRouter initialEntries={['/search', { state: { searchVal: 'hi', isSubmitted: true } }]}><Search /></MemoryRouter>);

    expect(getSearchResult).toHaveBeenCalled();
    expect(container).toMatchSnapshot();
  });
});
