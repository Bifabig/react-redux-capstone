import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const balanceSheetsURL = 'https://financialmodelingprep.com/api/v3/balance-sheet-statement/';

const initialState = {
  balanceSheets: [],
  isLoading: false,
  error: undefined,
};

export const getBalanceSheetItems = createAsyncThunk(
  'balanceSheets/getBalanceSheetItems',
  async (symbol, thunkAPI) => {
    try {
      const resp = await axios(`${balanceSheetsURL}${symbol.symbol}?apikey=b0f32ea981cc58fafa1177563647a780&limit=120`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const balanceSheetsSlice = createSlice({
  name: 'balanceSheets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBalanceSheetItems.pending, (state) => {
        const pendingState = state;
        pendingState.isLoading = true;
      })
      .addCase(getBalanceSheetItems.fulfilled, (state, action) => {
        const fulfilledState = state;
        fulfilledState.isLoading = false;
        fulfilledState.balanceSheets = action.payload;
      })
      .addCase(getBalanceSheetItems.rejected, (state, action) => {
        const rejectedState = state;
        rejectedState.isLoading = false;
        rejectedState.error = action.payload;
      });
  },
});

export default balanceSheetsSlice.reducer;
