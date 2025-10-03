import { useQuery } from '@tanstack/react-query';
import type {
  BankAccount,
  BankAccountSummary,
} from '../definitions/api/bank-account';
import {
  getBankAccountById,
  getBankAccounts,
} from '../api/bank-account-api-queries';
import type { ApiResponse } from '../definitions/api/api-response';

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
    ApiResponse<BankAccount | undefined>
  >({
    queryKey: ['getBankAccountById'],
    queryFn: async () => await getBankAccountById(id),
    retry: false,
  });

  return { bankAccount: bankAccount?.body, isLoading };
}
