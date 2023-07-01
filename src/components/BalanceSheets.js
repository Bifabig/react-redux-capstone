import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { getBalanceSheetItems } from '../redux/balanceSheets/balanceSheetsSlice';
import styles from '../styles/BalanceSheets.module.css';

const BalanceSheets = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const { symbol } = location.state;
  const { balanceSheets, isLoading, error } = useSelector(
    (state) => state.balanceSheets,
  );
  useEffect(() => {
    dispatch(getBalanceSheetItems(symbol));
  }, [dispatch, symbol]);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  if (error) {
    return (
      <div className={styles.container}>
        <h2>No balance sheet data for this company</h2>
      </div>
    );
  }

  return isLoading ? (
    <h2>Loading...</h2>
  ) : (
    <div className={styles.container}>
      <button className={styles.back} type="button" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left-circle" />
      </button>
      <h2>
        <i className="bi bi-file-earmark-spreadsheet-fill" />
        Balance Sheet
      </h2>
      <div className={styles.listItems}>

        {balanceSheets.map((balanceSheet) => (
          <ul key={balanceSheet.date}>
            <li>
              Stock:
              {' '}
              {balanceSheet.symbol}
            </li>
            <li>
              Date:
              {' '}
              {balanceSheet.date}
            </li>
            <li>
              Total Assets:
              {' '}
              {formatter.format(balanceSheet.totalAssets)}
            </li>
            <li>
              Total Current Assests:
              {' '}
              {formatter.format(balanceSheet.totalCurrentAssets)}
            </li>
            <li>
              Total Debt:
              {' '}
              {formatter.format(balanceSheet.totalDebt)}
            </li>
            <li>
              Total Investments:
              {' '}
              {formatter.format(balanceSheet.totalInvestments)}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default BalanceSheets;
