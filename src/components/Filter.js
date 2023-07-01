import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styles from '../styles/Filter.module.css';

const Filter = () => {
  const navigate = useNavigate();
  const { balanceSheets } = useSelector(
    (state) => state.balanceSheets,
  );
  const [filteredBalanceSheets, setFilteredBalanceSheets] = useState([]);

  useEffect(() => {
    const filteredData = balanceSheets.filter((balanceSheet) => balanceSheet.date !== '');
    setFilteredBalanceSheets(filteredData);
  }, [balanceSheets]);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

  });

  return (
    <div className={styles.container}>
      <button className={styles.back} type="button" onClick={() => navigate(-1)}>
        <i className="bi bi-arrow-left-circle" />
      </button>
      <h2>
        <i className="bi bi-file-earmark-spreadsheet-fill" />
        Balance Sheet
      </h2>
      <div className={styles.listItems}>

        {filteredBalanceSheets.map((filteredBalanceSheet) => (
          <ul key={filteredBalanceSheet.date}>
            <li>
              Stock:
              {' '}
              {filteredBalanceSheet.symbol}
            </li>
            <li>
              Date:
              {' '}
              {filteredBalanceSheet.date}
            </li>
            <li>
              Total Assets:
              {' '}
              {formatter.format(filteredBalanceSheet.totalAssets)}
            </li>
            <li>
              Total Current Assests:
              {' '}
              {formatter.format(filteredBalanceSheet.totalCurrentAssets)}
            </li>
            <li>
              Total Debt:
              {' '}
              {formatter.format(filteredBalanceSheet.totalDebt)}
            </li>
            <li>
              Total Investments:
              {' '}
              {formatter.format(filteredBalanceSheet.totalInvestments)}
            </li>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Filter;
