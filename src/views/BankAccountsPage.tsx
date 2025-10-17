import styles from '../assets/css/bank-accounts-page.module.css';
import { BankAccountSummary } from '../components/bank-accounts/BankAccountSummary';
import { LoaderIndicator } from '../components/layout/LoaderIndicator';
import UsernameEdit from '../components/profile/UsernameEdit';
import { useAuth } from '../components/auth/hook/AuthHooks';
import { useBankAccountsSummaries } from '../api/hook/BankAccountsHooks';

export default function BankAccountsPage() {
  const { user, loading: userLoading } = useAuth();
  const { bankAccounts, isLoading: bankAccountsLoading } =
    useBankAccountsSummaries();

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
      {bankAccountsLoading ? (
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
