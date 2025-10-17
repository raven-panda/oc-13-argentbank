import type { BankAccountSummary } from '@/api/definitions/bank-account';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getBankAccountById,
  getBankAccounts,
} from '../queries/bank-account-api-queries';
import { authenticationActions } from './AuthenticationSlice';

interface BankAccountsState {
  items: BankAccountSummary[];
  selectedItem: BankAccountSummary | undefined;
  isLoading: boolean;
}

const initialState: BankAccountsState = {
  items: [],
  selectedItem: undefined,
  isLoading: false,
};

export const bankAccountsActions = {
  getAll: createAsyncThunk('bankAccounts/getAll', async () => {
    const data = await getBankAccounts();
    return data.body;
  }),
  getById: createAsyncThunk(
    'bankAccounts/getById',
    async (accountId: string) => {
      const data = await getBankAccountById(accountId);
      return data.body;
    },
  ),
};

const bankAccountsSlice = createSlice({
  name: 'bankAccounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all case
      .addCase(bankAccountsActions.getAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bankAccountsActions.getAll.fulfilled, (state, action) => {
        const bankAccounts = action.payload;
        state.items = bankAccounts;
        state.isLoading = false;
      })
      .addCase(bankAccountsActions.getAll.rejected, (state) => {
        state.isLoading = false;
      })
      // Fetch by id case
      .addCase(bankAccountsActions.getById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bankAccountsActions.getById.fulfilled, (state, action) => {
        const bankAccount = action.payload;
        state.selectedItem = bankAccount;
        state.isLoading = false;
      })
      .addCase(bankAccountsActions.getById.rejected, (state) => {
        state.isLoading = false;
      })
      // Logout fallback, clear all data
      .addCase(authenticationActions.logout.fulfilled, () => initialState);
  },
});

export const bankAccountReducer = bankAccountsSlice.reducer;
