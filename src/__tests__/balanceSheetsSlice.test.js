import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {
  getBalanceSheetItems,
} from '../redux/balanceSheets/balanceSheetsSlice';

const mockStore = configureStore([thunk]);
jest.mock('axios');

describe('balanceSeetsSlice', () => {
  describe('actions', () => {
    let store;

    beforeEach(() => {
      store = mockStore({});
    });

    it('should create an action to get balance sheets', async () => {
      const mockPayload = [{ symbol: 'hi' }, { symbol: 'hello' }];
      axios.get.mockResolvedValueOnce({ data: mockPayload });

      await store.dispatch(getBalanceSheetItems());

      const actions = store.getActions();
      expect(actions[0].type).toBe(getBalanceSheetItems.pending.type);
      expect(actions[1].type).toBe(getBalanceSheetItems.rejected.type);
      await store.dispatch(getBalanceSheetItems.fulfilled(mockPayload));

      expect(actions[2].type).toBe(getBalanceSheetItems.fulfilled.type);
      expect(actions[2].payload).toEqual(mockPayload);
    });
  });
});
