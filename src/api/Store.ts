import { configureStore } from '@reduxjs/toolkit';
import { authenticationReducer } from './slices/AuthenticationSlice';
import { bankAccountReducer } from './slices/BankAccountsSlice';
import { transactionEnumRefsReducer } from './slices/enum-refs/TransactionEnumRefsSlice';
import { transactionsReducer } from './slices/TransactionsSlice';

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    transactions: transactionsReducer,
    bankAccount: bankAccountReducer,
    transactionEnumRefs: transactionEnumRefsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
