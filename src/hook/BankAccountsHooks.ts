import { useQuery } from '@tanstack/react-query';
import { api } from '../queryClient';
import {
  BANK_ACCOUNT_BY_ID_URI,
  BANK_ACCOUNTS_URI,
} from '../definitions/api/api-uri';
import type {
  BankAccount,
  BankAccountSummary,
} from '../definitions/api/bank-account';

export function useBankAccountsSummaries() {
  const { data: bankAccounts, isLoading } = useQuery<BankAccountSummary[]>({
    queryKey: ['getProfile'],
    queryFn: async () => {
      const res = await api.get(BANK_ACCOUNTS_URI);
      return res.data.body;
    },
    retry: false,
  });

  return { bankAccounts, isLoading };
}

export function useBankAccount(id: string) {
  const { data: bankAccount, isLoading } = useQuery<BankAccount>({
    queryKey: ['getProfile'],
    queryFn: async () => {
      const res = await api.get(BANK_ACCOUNT_BY_ID_URI.replace(':id', id));
      return res.data.body;
    },
    retry: false,
  });

  return { bankAccount, isLoading };
}
