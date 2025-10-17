import type { BankAccountSummary } from '@/api/definitions/bank-account';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getBankAccountById,
  getBankAccounts,
} from '../queries/bank-account-api-queries';

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

export const bankAccountsApi = {
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
      .addCase(bankAccountsApi.getAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bankAccountsApi.getAll.fulfilled, (state, action) => {
        const bankAccounts = action.payload;
        state.items = bankAccounts;
        state.isLoading = false;
      })
      .addCase(bankAccountsApi.getAll.rejected, (state) => {
        state.isLoading = false;
      })
      // Fetch by id case
      .addCase(bankAccountsApi.getById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(bankAccountsApi.getById.fulfilled, (state, action) => {
        const bankAccount = action.payload;
        state.selectedItem = bankAccount;
        state.isLoading = false;
      })
      .addCase(bankAccountsApi.getById.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const bankAccountReducer = bankAccountsSlice.reducer;
