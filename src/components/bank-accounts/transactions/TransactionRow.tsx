import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { format as formatDate } from 'date-format-parse';
import {
  useState,
  type EventHandler,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';
import type { Transaction } from '../../../api/definitions/bank-account';
import { useTransactionEnumReferences } from '../../../api/hook/EnumRefsHooks';
import styles from '../../../assets/css/components/table.module.css';
import EditableTransactionRowData from './EditableTransactionRowData';

export default function TransactionRow({
  transaction,
}: {
  transaction: Transaction;
}) {
  const [open, setOpen] = useState(false);
  const {
    categories,
    paymentTypes,
    isLoading: isRefsLoading,
  } = useTransactionEnumReferences();

  const openRow: EventHandler<
    KeyboardEvent<HTMLTableRowElement> | MouseEvent<HTMLTableRowElement>
  > = (e) => {
    if ('code' in e && e.code !== 'Enter' && e.code !== 'Space') return;

    e.preventDefault();
    setOpen((prev) => !prev);
  };

  const getPaymentTypeLabel = () => {
    if (isRefsLoading) return 'Loading...';

    return (
      paymentTypes?.find((c) => c.id === transaction.type)?.label ??
      'Not defined'
    );
  };

  return (
    <>
      <tr
        className={styles.transactionRow}
        onClick={openRow}
        onKeyDown={openRow}
        tabIndex={0}
      >
        <td className={styles.tableChevron}>
          <FontAwesomeIcon
            icon={faChevronUp}
            className={open ? '' : 'fa-rotate-180'}
          />
        </td>
        <td>{formatDate(new Date(transaction.date), 'MMMM DD, YYYY')}</td>
        <td>{transaction.description}</td>
        <td>${transaction.costAmount}</td>
        <td>${transaction.balanceAmount}</td>
      </tr>
      <tr
        className={styles.transactionDetails}
        data-open={open}
        aria-hidden={!open}
      >
        <td colSpan={1}></td>
        <td colSpan={4}>
          <div className={styles.transactionEditDetail}>
            <p>
              <strong>Transaction Type : </strong>
              {getPaymentTypeLabel()}
            </p>
          </div>
          <EditableTransactionRowData
            transaction={transaction}
            isRefsLoading={isRefsLoading}
            categories={categories}
          />
        </td>
      </tr>
    </>
  );
}
