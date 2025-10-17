import { buildApiResponseFixture } from '../__fixtures__/apiResponseFixture';
import {
  transactionCategoryReferencesFixture,
  transactionPaymentTypeReferencesFixture,
} from '../__fixtures__/enumReferencesFixture';

const isFixtureEnabled = import.meta.env.VITE_ENABLE_FIXTURE === 'true';

/**
 * Request GET to /enum-refs/transactions-types
 * @returns Request resulted transaction payment types enum-label pairs
 * @
 */
export async function getTransactionPaymentTypesEnumReferences() {
  if (isFixtureEnabled)
    return buildApiResponseFixture(transactionPaymentTypeReferencesFixture);

  throw new Error(
    'This route is not implemented on backend side yet. Please use fixtures.',
  );
}

/**
 * Request GET to /enum-refs/transactions-categories
 * @returns Request resulted transaction categories enum-label pairs
 * @
 */
export async function getTransactionCategoriesEnumReferences() {
  if (isFixtureEnabled)
    return buildApiResponseFixture(transactionCategoryReferencesFixture);

  throw new Error(
    'This route is not implemented on backend side yet. Please use fixtures.',
  );
}
