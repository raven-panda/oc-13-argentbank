export type AccountBalanceType = 'AVAILABLE' | 'CURRENT';
export type TransactionPaymentType = 'ELECTRONIC';
export type TransactionCategoryType =
  | 'FOOD'
  | 'SCHOOL_STUDIES'
  | 'HEALTH'
  | 'HOUSING'
  | 'VEHICLE'
  | 'HOBBIES'
  | 'VACATIONS'
  | 'PETS'
  | 'TAXES'
  | 'OTHER';

export interface BankAccountSummary {
  id: string;
  name: string;
  balanceAmount: number;
  lastDigits: string;
  balanceType: AccountBalanceType;
}

export interface BankAccount extends BankAccountSummary {
  transactions: Transaction[];
}

export interface Transaction {
  id: string;
  bankAccountId: string;
  description: string;
  type: TransactionPaymentType;
  category: string;
  userNotes: string;
  date: string;
  costAmount: number;
  balanceAmount: number;
}

export type TransactionUpdateRequest = Pick<
  Transaction,
  'category' | 'userNotes'
>;
