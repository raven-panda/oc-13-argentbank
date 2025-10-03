import { useParams } from '@tanstack/react-router';
import { useBankAccount } from '../hook/BankAccountsHooks';
import styles from '../assets/css/transactions-page.module.css';
import { getAccountBalanceTypeLabel } from '../utils/BankAccountUtils';
import { formatWithThousandsSeparator } from '../utils/FormatUtils';
import { LoaderIndicator } from '../components/layout/LoaderIndicator';

export default function TransactionPage() {
  const { bankAccountId } = useParams({
    from: '/protected/bank-account/$bankAccountId/transactions',
  });
  const { bankAccount, isLoading } = useBankAccount(bankAccountId);

  return (
    <>
      <header className={styles.transactionsPageHeader}>
        {isLoading ? (
          <LoaderIndicator />
        ) : (
          <>
            <h1>{bankAccount?.name}</h1>
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
      <main className={styles.bodyContainer}></main>
    </>
  );
}
