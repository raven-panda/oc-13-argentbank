import type {
  ApiUriValueType,
  HttpMethod,
} from '../definitions/api/api-uri-keys';
import { bankAccountFixtures } from './bankAccountFixtures';
import { userFixtures } from './userFixtures';

type FixtureMap = {
  [K in ApiUriValueType]: {
    [M in HttpMethod]?: (params: Record<string, any>) => object | undefined;
  };
};

const fixturesMap: FixtureMap = {
  '/user/login': {
    post: () => ({
      token: '1234',
    }),
  },
  '/user/profile': {
    post: () => userFixtures.profile,
    put: () => userFixtures.profile,
  },
  '/bank-account': {
    get: () => bankAccountFixtures.accountsSummaries,
  },
  '/bank-account/:id': {
    get: (params) =>
      bankAccountFixtures.accounts.find((a) => a.id === params.id),
  },
  '/bank-account/:accountId/transaction/:transactionId': {
    put: (params) => {
      const account = bankAccountFixtures.accounts.find(
        (a) => a.id === params.accountId,
      );
      const transaction = account?.transactions.find(
        (t) => t.id === params.transactionId,
      );

      const updatedTransaction = transaction
        ? {
            ...transaction,
            category: params.body?.category ?? transaction.userNotes,
            userNotes: params.body?.userNotes ?? transaction.userNotes,
          }
        : undefined;

      if (account?.transactions && updatedTransaction)
        account.transactions = [
          ...account.transactions.filter((t) => t.id !== updatedTransaction.id),
          updatedTransaction,
        ];

      return updatedTransaction;
    },
  },
};

export default fixturesMap;
