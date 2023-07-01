import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { getBalanceSheetItems } from '../redux/balanceSheets/balanceSheetsSlice';
import Filter from './Filter';
import styles from '../styles/BalanceSheets.module.css';

const BalanceSheets = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { symbol } = location.state;
  const { isLoading, error } = useSelector(
    (state) => state.balanceSheets,
  );
  useEffect(() => {
    dispatch(getBalanceSheetItems(symbol));
  }, [dispatch, symbol]);

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
    <Filter />
  );
};

export default BalanceSheets;
