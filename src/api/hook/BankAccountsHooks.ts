import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../Hooks';
import { bankAccountsActions } from '../slices/BankAccountsSlice';
import { transactionsActions } from '../slices/TransactionsSlice';

export function useBankAccounts() {
  const dispatch = useAppDispatch();
  const bankAccounts = useAppSelector((state) => state.bankAccount.items);
  const isLoading = useAppSelector(
    (state) => state.transactions.isLoading || state.bankAccount.isLoading,
  );

  useEffect(() => {
    dispatch(bankAccountsActions.getAll());
  }, [dispatch]);

  return { bankAccounts, isLoading };
}

function useBankAccountById(accountId: string) {
  const dispatch = useAppDispatch();
  const bankAccount = useAppSelector((state) => state.bankAccount.selectedItem);
  const isLoading = useAppSelector((state) => state.transactions.isLoading);

  useEffect(() => {
    dispatch(bankAccountsActions.getById(accountId));
  }, [dispatch, accountId]);

  return { bankAccount, isLoading };
}

function useLastMonthTransactions(accountId: string) {
  const dispatch = useAppDispatch();
  const transactions = useAppSelector((state) => state.transactions.items);
  const isLoading = useAppSelector((state) => state.transactions.isLoading);

  useEffect(() => {
    dispatch(transactionsActions.getLastMonth(accountId));
  }, [dispatch, accountId]);

  return { transactions, isLoading };
}

export function useBankAccountWithLastMonthTransactions(accountId: string) {
  const { bankAccount, isLoading: isBankAccountLoading } =
    useBankAccountById(accountId);
  const { transactions, isLoading: isTransactionsLoading } =
    useLastMonthTransactions(accountId);

  return {
    bankAccount,
    transactions,
    isLoading: isBankAccountLoading || isTransactionsLoading,
  };
}
