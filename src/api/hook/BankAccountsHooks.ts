import { useQuery } from '@tanstack/react-query';
import type {
  BankAccountSummary,
  Transaction,
} from '../definitions/bank-account';
import {
  getBankAccountById,
  getBankAccounts,
  getLastMontTransactionsByBankAccountId,
  putBankAccountTransaction,
} from '../queries/bank-account-api-queries';
import type { ApiResponse } from '../definitions/api-response';
import { useState } from 'react';
import client from '../../queryClient';

export function useBankAccountsSummaries() {
  const { data: bankAccounts, isLoading } = useQuery<
    ApiResponse<BankAccountSummary[]>
  >({
    queryKey: ['getBankAccounts'],
    queryFn: getBankAccounts,
    retry: false,
  });

  return { bankAccounts: bankAccounts?.body, isLoading };
}

export function useBankAccount(id: string) {
  const { data: bankAccount, isLoading } = useQuery<
    ApiResponse<BankAccountSummary | undefined>
  >({
    queryKey: ['getBankAccountById'],
    queryFn: async () => await getBankAccountById(id),
    retry: false,
  });

  return { bankAccount: bankAccount?.body, isLoading };
}

export function useLastMonthTransactions(id: string) {
  const { data: transactions, isLoading } = useQuery<
    ApiResponse<Transaction[] | undefined>
  >({
    queryKey: ['getLastMontTransactionsByBankAccountId'],
    queryFn: async () => await getLastMontTransactionsByBankAccountId(id),
    retry: false,
  });

  return { transactions: transactions?.body, isLoading };
}

export function useEditBankAccountTransaction() {
  const [isLoading, setIsLoading] = useState(false);

  const editBankAccountTransaction = async (
    updatedTransaction: Transaction,
  ) => {
    setIsLoading(true);
    await putBankAccountTransaction(updatedTransaction.id, updatedTransaction);
    client.invalidateQueries({
      queryKey: ['getLastMontTransactionsByBankAccountId'],
    });
    setIsLoading(false);
  };

  return { editBankAccountTransaction, isLoading };
}
