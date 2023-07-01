import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const symbolsURL = 'https://financialmodelingprep.com/api/v3/financial-statement-symbol-lists?apikey=b0f32ea981cc58fafa1177563647a780';

const initialState = {
  slicedSymbols: [],
  searchSymbols: [],
  symbols: [],
  isLoading: false,
  error: undefined,
};

export const getSymbols = createAsyncThunk(
  'balanceSheets/getSymbols',
  async (thunkAPI) => {
    try {
      const resp = await axios(symbolsURL);
      const unslicedData = resp.data;
      return unslicedData;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  },
);

const symbolsSlice = createSlice({
  name: 'symbols',
  initialState,
  reducers: {
    getSearchResult: (state, action) => {
      const searchVal = action.payload;
      const searchState = state;
      searchState.isLoading = false;
      searchState.searchSymbols.length = 0;
      searchState.searchSymbols = state.symbols.filter(
        (symbol) => symbol.toLowerCase() === searchVal.toLowerCase(),
      );
    },
    getSlicedData: (state, action) => {
      const fetchMax = action.payload;
      const slicedState = state;
      slicedState.isLoading = false;
      slicedState.slicedSymbols = state.symbols.slice(0, fetchMax);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSymbols.pending, (state) => {
        const fulfilledState = state;
        fulfilledState.isLoading = true;
      })
      .addCase(getSymbols.fulfilled, (state, action) => {
        const fulfilledState = state;
        fulfilledState.isLoading = false;
        fulfilledState.symbols = action.payload;
        fulfilledState.slicedSymbols = fulfilledState.symbols.slice(0, 10);
      })
      .addCase(getSymbols.rejected, (state, action) => {
        const rejectedState = state;
        rejectedState.isLoading = false;
        rejectedState.error = action.payload;
      });
  },
});

export const { getSearchResult, getSlicedData } = symbolsSlice.actions;
export default symbolsSlice.reducer;
