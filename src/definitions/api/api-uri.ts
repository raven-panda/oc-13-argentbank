export const API_BASE_URL = import.meta.env.VITE_API_URL;

export const LOGIN_URI = '/user/login';
export const PROFILE_URI = '/user/profile';
export const BANK_ACCOUNTS_URI = '/bank-account';
export const BANK_ACCOUNT_BY_ID_URI = '/bank-account/:id';
export const TRANSACTION_BY_ID =
  '/bank-account/:accountId/transaction/:transactionId';
