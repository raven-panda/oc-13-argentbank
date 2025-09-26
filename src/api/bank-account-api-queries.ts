import { buildApiResponseFixture } from '../__fixtures__/apiResponseFixture';
import { bankAccountFixtures } from '../__fixtures__/bankAccountFixtures';
import type { TransactionUpdateRequest } from '../definitions/api/bank-account';

const isFixtureEnabled = import.meta.env.VITE_ENABLE_FIXTURE === 'true';

/**
 * Request GET to /bank-accounts
 * @returns Request resulted user's bank accounts data summarized
 * @
 */
export async function getBankAccounts() {
  if (isFixtureEnabled)
    return buildApiResponseFixture(bankAccountFixtures.accountsSummaries);

  throw new Error(
    'This route is not implemented on backend side yet. Please use fixtures.',
  );
}

/**
 * Request GET to /bank-accounts/:id
 * @returns Request resulted user's bank accounts data summarized
 */
export async function getBankAccountById(id: string) {
  if (isFixtureEnabled)
    return buildApiResponseFixture(
      bankAccountFixtures.accounts.find((a) => a.id === id),
    );

  throw new Error(
    'This route is not implemented on backend side yet. Please use fixtures.',
  );
}
/**
 * Request POST to /bank-accounts/:accountId/transactions/:transactionId
 * @returns Updated transaction data
 */
export async function putBankAccountTransaction(
  accountId: string,
  transactionId: string,
  body: TransactionUpdateRequest,
) {
  if (isFixtureEnabled) {
    const account = bankAccountFixtures.accounts.find(
      (a) => a.id === accountId,
    );
    const transaction = account?.transactions.find(
      (t) => t.id === transactionId,
    );

    const updatedTransaction = transaction
      ? {
          ...transaction,
          category: body?.category ?? transaction.userNotes,
          userNotes: body?.userNotes ?? transaction.userNotes,
        }
      : undefined;

    if (account?.transactions && updatedTransaction)
      account.transactions = [
        ...account.transactions.filter((t) => t.id !== updatedTransaction.id),
        updatedTransaction,
      ];

    return updatedTransaction;
  }

  throw new Error(
    'This route is not implemented on backend side yet. Please use fixtures.',
  );
}
