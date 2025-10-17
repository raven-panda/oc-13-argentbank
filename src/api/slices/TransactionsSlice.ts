import type { Transaction } from '@/api/definitions/bank-account';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getLastMontTransactionsByBankAccountId,
  putBankAccountTransaction,
} from '../queries/bank-account-api-queries';
import { authenticationActions } from './AuthenticationSlice';

interface TransactionsState {
  items: Transaction[];
  isLoading: boolean;
}

const initialState: TransactionsState = {
  items: [],
  isLoading: false,
};

// Thunk for async getting transactions
export const transactionsActions = {
  getLastMonth: createAsyncThunk(
    'transactions/fetchLastMonthByAccount',
    async (accountId: string) => {
      const data = await getLastMontTransactionsByBankAccountId(accountId);
      return data.body;
    },
  ),
  update: createAsyncThunk(
    'transactions/updateTransaction',
    async (updatedTransaction: Transaction) => {
      const updated = await putBankAccountTransaction(
        updatedTransaction.id,
        updatedTransaction,
      );
      return updated.body;
    },
  ),
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all case
      .addCase(transactionsActions.getLastMonth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(transactionsActions.getLastMonth.fulfilled, (state, action) => {
        const transactions = action.payload;
        state.items = transactions;
        state.isLoading = false;
      })
      .addCase(transactionsActions.getLastMonth.rejected, (state) => {
        state.isLoading = false;
      })
      // Update case
      .addCase(transactionsActions.update.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(transactionsActions.update.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload) {
          const index = state.items.findIndex(
            (t) => t.id === action.payload?.id,
          );
          if (index !== -1) state.items[index] = action.payload;
        }
      })
      .addCase(transactionsActions.update.rejected, (state) => {
        state.isLoading = false;
      })
      // Logout fallback, clear all data
      .addCase(authenticationActions.logout.fulfilled, () => initialState);
  },
});

export const transactionsReducer = transactionsSlice.reducer;
