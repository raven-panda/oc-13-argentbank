import { useBankAccounts } from '@/api/hook/BankAccountsHooks';
import styles from '@/assets/css/bank-accounts-page.module.css';
import { useAuth } from '@/components/auth/hook/AuthHooks';
import { BankAccountSummary } from '@/components/bank-accounts/BankAccountSummary';
import { LoaderIndicator } from '@/components/layout/LoaderIndicator';
import UsernameEdit from '@/components/profile/UsernameEdit';

export default function BankAccountsPage() {
  const { user, loading: userLoading } = useAuth();
  const { bankAccounts, isLoading } = useBankAccounts();

  if (!userLoading && !user) {
    return <>Une erreur s'est produite.</>;
  }

  return (
    <main className={styles.bodyContainer}>
      <h1>Welcome back</h1>
      <UsernameEdit
        userFirstName={user?.firstName}
        userLastName={user?.lastName}
        userLoading={userLoading}
      />
      {isLoading ? (
        <LoaderIndicator />
      ) : bankAccounts && bankAccounts.length > 0 ? (
        <ul className={styles.bankAccountsSummariesContainer}>
          {bankAccounts.map((account) => (
            <BankAccountSummary key={account.id} account={account} />
          ))}
        </ul>
      ) : (
        <>No bank accounts found.</>
      )}
    </main>
  );
}
