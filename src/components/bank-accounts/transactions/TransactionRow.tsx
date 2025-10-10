import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from '../../../assets/css/components/table.module.css';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { format as formatDate } from 'date-format-parse';
import type { Transaction } from '../../../definitions/api/bank-account';

export default function TransactionRow({
  transaction,
}: {
  transaction: Transaction;
}) {
  return (
    <tr>
      <td className={styles.tableChevron}>
        <FontAwesomeIcon icon={faChevronUp} />
      </td>
      <td>{formatDate(new Date(transaction.date), 'MMMM DD, YYYY')}</td>
      <td>{transaction.description}</td>
      <td>${transaction.costAmount}</td>
      <td>${transaction.balanceAmount}</td>
    </tr>
  );
}
