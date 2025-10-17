import { configureStore } from '@reduxjs/toolkit';
import { transactionsReducer } from './slices/TransactionsSlice';
import { bankAccountReducer } from './slices/BankAccountsSlice';
import { transactionEnumRefsReducer } from './slices/enum-refs/TransactionEnumRefsSlice';
import { authenticationReducer } from './slices/AuthenticationSlice';

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
