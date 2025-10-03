import { useParams } from '@tanstack/react-router';
import { useBankAccount } from '../hook/BankAccountsHooks';
import styles from '../assets/css/transactions-page.module.css';
import { getAccountBalanceTypeLabel } from '../utils/BankAccountUtils';
import { formatWithThousandsSeparator } from '../utils/FormatUtils';
import { LoaderIndicator } from '../components/layout/LoaderIndicator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { format as formatDate } from 'date-format-parse';

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
      <main className={styles.bodyContainer}>
        <table
          className={styles.transactionsTable}
          cellSpacing={0}
          cellPadding={12}
        >
          <thead>
            <tr>
              <th className={styles.tableChevron}></th>
              <th>DATE</th>
              <th>DESCRIPTION</th>
              <th>AMOUNT</th>
              <th>BALANCE</th>
            </tr>
          </thead>
          <tbody>
            {bankAccount?.transactions.map((transaction) => (
              <tr>
                <td className={styles.tableChevron}>
                  <FontAwesomeIcon icon={faChevronUp} />
                </td>
                <td>
                  {formatDate(new Date(transaction.date), 'MMMM DD, YYYY')}
                </td>
                <td>{transaction.description}</td>
                <td>${transaction.costAmount}</td>
                <td>${transaction.balanceAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </>
  );
}
