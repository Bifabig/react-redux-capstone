import { configureStore } from '@reduxjs/toolkit';
import balanceSheetsSlice from './balanceSheets/balanceSheetsSlice';
import symbolsSlice from './symbols/symbolsSlice';

const store = configureStore({
  reducer: {
    balanceSheets: balanceSheetsSlice,
    symbols: symbolsSlice,
  },
});

export default store;
