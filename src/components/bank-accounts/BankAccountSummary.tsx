import { Link } from '@tanstack/react-router';
import type {
  AccountBalanceType,
  BankAccountSummary,
} from '../../definitions/api/bank-account';
import styles from '../../assets/css/components/containers.module.css';
import { formatWithThousandsSeparator } from '../../utils/FormatUtils';

export function BankAccountSummary({
  account,
}: {
  account: BankAccountSummary;
}) {
  const getBalanceTypeLabel = (balanceType: AccountBalanceType) => {
    if (balanceType === 'CURRENT') return 'Current Balance';
    else return 'Available Balance';
  };

  return (
    <li className={styles.bankAccountSummary}>
      <section>
        <h2 className={styles.cardSubTitle}>{account.name}</h2>
        <h3 className={styles.cardMainTitle}>
          ${formatWithThousandsSeparator(account.balanceAmount)}
        </h3>
        <h4 className={styles.cardThirdTitle}>
          {getBalanceTypeLabel(account.balanceType)}
        </h4>
      </section>
      <Link
        className={styles.bankAccountSummaryLink}
        to={`/bank-account/$bankAccountId/transactions`}
        params={{ bankAccountId: account.id }}
      >
        View transactions
      </Link>
    </li>
  );
}
