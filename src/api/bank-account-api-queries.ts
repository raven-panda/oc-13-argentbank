import { buildApiResponseFixture } from '@/__fixtures__/apiResponseFixture';
import { bankAccountFixtures } from '@/__fixtures__/bankAccountFixtures';
import type { TransactionUpdateRequest } from '@/definitions/api/bank-account';

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
      bankAccountFixtures.accountsSummaries.find((a) => a.id === id),
    );

  throw new Error(
    'This route is not implemented on backend side yet. Please use fixtures.',
  );
}

/**
 * Request GET to /bank-accounts/:id/transactions/last-month
 * @returns Request resulted user's transactions data of the bank account identified by given ID
 */
export async function getLastMontTransactionsByBankAccountId(
  bankAccountId: string,
) {
  if (isFixtureEnabled)
    return buildApiResponseFixture(
      bankAccountFixtures.transactions.filter(
        (a) => a.bankAccountId === bankAccountId,
      ),
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
  transactionId: string,
  body: TransactionUpdateRequest,
) {
  if (isFixtureEnabled) {
    const transaction = bankAccountFixtures?.transactions.find(
      (t) => t.id === transactionId,
    );

    const updatedTransaction = transaction
      ? {
          ...transaction,
          category: body?.category ?? transaction.userNotes,
          userNotes: body?.userNotes ?? transaction.userNotes,
        }
      : undefined;

    if (bankAccountFixtures?.transactions && updatedTransaction)
      bankAccountFixtures.transactions = [
        ...bankAccountFixtures.transactions.filter(
          (t) => t.id !== updatedTransaction.id,
        ),
        updatedTransaction,
      ];

    return updatedTransaction;
  }

  throw new Error(
    'This route is not implemented on backend side yet. Please use fixtures.',
  );
}
