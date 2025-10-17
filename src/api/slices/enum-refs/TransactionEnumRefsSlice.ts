import type { EnumReferences } from '@/api/definitions/enum-reference';
import {
  getTransactionCategoriesEnumReferences,
  getTransactionPaymentTypesEnumReferences,
} from '@/api/queries/enum-references-api-queries';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface TransactionsEnumRefsState {
  paymentTypesItems: EnumReferences;
  categoriesItems: EnumReferences;
  isLoading: boolean;
}

const initialState: TransactionsEnumRefsState = {
  paymentTypesItems: [],
  categoriesItems: [],
  isLoading: false,
};

export const transactionEnumRefsActions = {
  getPaymentTypes: createAsyncThunk(
    'transactionEnumRefs/getPaymentTypes',
    async () => {
      const data = await getTransactionPaymentTypesEnumReferences();
      return data.body;
    },
  ),
  getCategories: createAsyncThunk(
    'transactionEnumRefs/getCategories',
    async () => {
      const data = await getTransactionCategoriesEnumReferences();
      return data.body;
    },
  ),
};

const transactionEnumRefsSlice = createSlice({
  name: 'bankAccounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch payment type case
      .addCase(transactionEnumRefsActions.getPaymentTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        transactionEnumRefsActions.getPaymentTypes.fulfilled,
        (state, action) => {
          const bankAccounts = action.payload;
          state.paymentTypesItems = bankAccounts;
          state.isLoading = false;
        },
      )
      .addCase(transactionEnumRefsActions.getPaymentTypes.rejected, (state) => {
        state.isLoading = false;
      })
      // Fetch by id case
      .addCase(transactionEnumRefsActions.getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        transactionEnumRefsActions.getCategories.fulfilled,
        (state, action) => {
          const bankAccounts = action.payload;
          state.categoriesItems = bankAccounts;
          state.isLoading = false;
        },
      )
      .addCase(transactionEnumRefsActions.getCategories.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const transactionEnumRefsReducer = transactionEnumRefsSlice.reducer;
