import { useParams } from '@tanstack/react-router';
import styles from '../assets/css/transactions-page.module.css';
import { TransactionsTable } from '../components/bank-accounts/transactions/TransactionsTable';
import { LoaderIndicator } from '../components/layout/LoaderIndicator';
import {
  useBankAccount,
  useLastMonthTransactions,
} from '../hook/BankAccountsHooks';
import { getAccountBalanceTypeLabel } from '../utils/BankAccountUtils';
import { formatWithThousandsSeparator } from '../utils/FormatUtils';

export default function TransactionPage() {
  const { bankAccountId } = useParams({
    from: '/protected/bank-account/$bankAccountId/transactions',
  });
  const { bankAccount, isLoading: isBankAccountLoading } =
    useBankAccount(bankAccountId);
  const { transactions, isLoading: isTransactionsLoading } =
    useLastMonthTransactions(bankAccountId);

  return (
    <>
      <header className={styles.transactionsPageHeader}>
        {isBankAccountLoading || isTransactionsLoading ? (
          <LoaderIndicator />
        ) : (
          <>
            <h1>
              {bankAccount?.name} (x{bankAccount?.lastDigits})
            </h1>
            <h2>
              $
              {bankAccount?.balanceAmount &&
                formatWithThousandsSeparator(bankAccount?.balanceAmount)}
            </h2>
            <h3>
              {bankAccount?.balanceType &&
                getAccountBalanceTypeLabel(bankAccount.balanceType)}
            </h3>
          </>
        )}
      </header>
      <main className={styles.bodyContainer}>
        <TransactionsTable
          transactions={transactions?.sort(
            (ta, tb) =>
              new Date(tb.date).getTime() - new Date(ta.date).getTime(),
          )}
        />
      </main>
    </>
  );
}
