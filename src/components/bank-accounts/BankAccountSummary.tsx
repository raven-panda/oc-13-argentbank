import { Link } from '@tanstack/react-router';
import type { BankAccountSummary } from '@/definitions/api/bank-account';
import styles from '@/assets/css/components/containers.module.css';
import { formatWithThousandsSeparator } from '@/utils/FormatUtils';
import { getAccountBalanceTypeLabel } from '@/utils/BankAccountUtils';

export function BankAccountSummary({
  account,
}: {
  account: BankAccountSummary;
}) {
  return (
    <li className={styles.bankAccountSummary}>
      <section>
        <h2 className={styles.cardSubTitle}>
          {account.name} (x{account.lastDigits})
        </h2>
        <h3 className={styles.cardMainTitle}>
          ${formatWithThousandsSeparator(account.balanceAmount)}
        </h3>
        <h4 className={styles.cardThirdTitle}>
          {getAccountBalanceTypeLabel(account.balanceType)}
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
