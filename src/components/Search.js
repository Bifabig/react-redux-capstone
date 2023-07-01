import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useLocation } from 'react-router-dom';
import { getSearchResult } from '../redux/symbols/symbolsSlice';
import styles from '../styles/Search.module.css';

const Search = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { searchSymbols, isLoading, error } = useSelector(
    (state) => state.symbols,
  );
  useEffect(() => {
    if (location.state.searchVal !== '') {
      dispatch(getSearchResult(location.state.searchVal));
    }
    location.state.searchVal = '';
  }, [dispatch, location.state, location.state.searchVal]);

  if (error) return <h2>Something went wrong</h2>;

  return isLoading ? (<h2>Loading...</h2>) : (
    <div className={styles.container}>
      <NavLink to="/" className={styles.back}>
        <i className="bi bi-arrow-left-circle" />
      </NavLink>
      <h2>Search Results</h2>
      { searchSymbols.length !== 0 ? searchSymbols.map((symbol) => (
        <div className={styles.listItems} key={symbol}>
          <NavLink to="/balanceSheets" state={{ symbol: { symbol } }}>
            <li>

              {symbol}
              <i className="bi bi-arrow-right-circle" />
            </li>
          </NavLink>

        </div>
      )) : <h4 className={styles.container}> Your search item doesn&apos;t exist</h4>}

    </div>
  );
};

export default Search;
