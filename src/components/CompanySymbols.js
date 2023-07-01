import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { getSlicedData, getSymbols } from '../redux/symbols/symbolsSlice';
import styles from '../styles/CompanySymbols.module.css';

const CompanySymbols = () => {
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState('');
  const [fetchMax, setFetchMax] = useState(10);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const dispatch = useDispatch();
  const {
    slicedSymbols, symbols, isLoading, error,
  } = useSelector(
    (state) => state.symbols,
  );
  useEffect(() => {
    if (symbols.length === 0) {
      dispatch(getSymbols());
    }
  }, [dispatch, symbols]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    return navigate('/search', { state: { searchVal, isSubmitted } });
  };

  const fetchData = () => {
    if (symbols.length !== slicedSymbols.length) {
      dispatch(getSlicedData(fetchMax));
      setFetchMax(fetchMax + 30);
    } else {
      setFetchMax(-1);
    }
  };

  if (error) return <h2>Something went wrong</h2>;

  return isLoading ? <div className={styles.container}><h2>Loading...</h2></div> : (
    <div className={styles.container}>
      <div className={styles.input}>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search..."
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />

          <input
            type="submit"
            value="search"
          />

        </form>
      </div>
      <div className={styles.stocks}>

        <h2>
          <i className="bi bi-bar-chart-steps" />
          Stocks
        </h2>

        <div
          className={styles.symbols}
        >

          {slicedSymbols.map((symbol) => (
            <NavLink to="/balanceSheets" key={symbol} state={{ symbol: { symbol } }}>
              <li>

                {symbol}
                {' '}
                <i className="bi bi-arrow-right-circle" />
              </li>
            </NavLink>
          ))}
          <div className={styles.btnContainer}>
            {fetchMax !== -1 ? <button type="button" onClick={fetchData} className={styles.load}>Load More</button> : ''}

          </div>
        </div>

      </div>
    </div>
  );
};

export default CompanySymbols;
