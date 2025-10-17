import styles from '../../../assets/css/components/table.module.css';
import type { Transaction } from '../../../api/definitions/bank-account';
import TransactionRow from './TransactionRow';

export function TransactionsTable({
  transactions,
}: {
  transactions: Transaction[] | undefined;
}) {
  return (
    <table className={styles.expandableTable} cellSpacing={0} cellPadding={12}>
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
        {transactions?.length ? (
          transactions.map((transaction) => (
            <TransactionRow transaction={transaction} />
          ))
        ) : (
          <tr>
            <td colSpan={5}>No transactions registered yet.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
