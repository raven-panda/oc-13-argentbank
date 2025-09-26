export type AccountBalanceType = 'AVAILABLE' | 'CURRENT';

export interface BankAccountSummary {
  id: string;
  name: string;
  balanceAmount: number;
  balanceType: AccountBalanceType;
}

export interface BankAccount extends BankAccountSummary {
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  description: string;
  type: string;
  category: string;
  userNotes: string;
  date: string;
  costAmount: number;
  balanceAmount: number;
}
