import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import renderer from 'react-test-renderer';
import BalanceSheets from '../components/BalanceSheets';
import CompanySymbols from '../components/CompanySymbols';
import Search from '../components/Search';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

describe('CompanySymbols', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockReturnValue({
      slicedSymbols: [],
      allSymbols: [],
      symbols: [],
      isLoading: false,
      error: undefined,
      hasMore: true,
    });
  });

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Router>

          <Routes>
            <Route path="/" element={<CompanySymbols />} />
            <Route path="/balanceSheets" element={<BalanceSheets />} />
            <Route path="/search" element={<Search />} />
          </Routes>
        </Router>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
