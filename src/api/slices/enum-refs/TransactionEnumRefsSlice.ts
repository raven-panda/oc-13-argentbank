import type { EnumReferences } from '@/api/definitions/enum-reference';
import {
  getTransactionCategoriesEnumReferences,
  getTransactionPaymentTypesEnumReferences,
} from '@/api/queries/enum-references-api-queries';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface TransactionsState {
  paymentTypesItems: EnumReferences;
  categoriesItems: EnumReferences;
  isLoading: boolean;
}

const initialState: TransactionsState = {
  paymentTypesItems: [],
  categoriesItems: [],
  isLoading: false,
};

export const transactionEnumRefsApi = {
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
      .addCase(transactionEnumRefsApi.getPaymentTypes.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        transactionEnumRefsApi.getPaymentTypes.fulfilled,
        (state, action) => {
          const bankAccounts = action.payload;
          state.paymentTypesItems = bankAccounts;
          state.isLoading = false;
        },
      )
      .addCase(transactionEnumRefsApi.getPaymentTypes.rejected, (state) => {
        state.isLoading = false;
      })
      // Fetch by id case
      .addCase(transactionEnumRefsApi.getCategories.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        transactionEnumRefsApi.getCategories.fulfilled,
        (state, action) => {
          const bankAccounts = action.payload;
          state.categoriesItems = bankAccounts;
          state.isLoading = false;
        },
      )
      .addCase(transactionEnumRefsApi.getCategories.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const transactionEnumRefsReducer = transactionEnumRefsSlice.reducer;
