import type { AccountBalanceType } from '@/api/definitions/bank-account';

export const getAccountBalanceTypeLabel = (balanceType: AccountBalanceType) => {
  if (balanceType === 'CURRENT') return 'Current Balance';
  else return 'Available Balance';
};
