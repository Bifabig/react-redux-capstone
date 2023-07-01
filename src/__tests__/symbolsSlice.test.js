import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import {
  getSymbols,
} from '../redux/symbols/symbolsSlice';

const mockStore = configureStore([thunk]);
jest.mock('axios');

describe('symbolsSlice', () => {
  describe('actions', () => {
    let store;

    beforeEach(() => {
      store = mockStore({});
    });

    it('should create an action to get symbols', async () => {
      const mockPayload = [{ symbol: 'hi' }, { symbol: 'hello' }];
      axios.get.mockResolvedValueOnce({ data: mockPayload });

      await store.dispatch(getSymbols());

      const actions = store.getActions();
      expect(actions[0].type).toBe(getSymbols.pending.type);
      expect(actions[1].type).toBe(getSymbols.rejected.type);
      await store.dispatch(getSymbols.fulfilled(mockPayload));

      expect(actions[2].type).toBe(getSymbols.fulfilled.type);
      expect(actions[2].payload).toEqual(mockPayload);
    });
  });
});
