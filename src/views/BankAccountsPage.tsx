import styles from '../assets/css/bank-accounts-page.module.css';
import { BankAccountSummary } from '../components/bank-accounts/BankAccountSummary';
import UsernameEdit from '../components/profile/UsernameEdit';
import { useAuth } from '../hook/AuthHooks';
import { useBankAccountsSummaries } from '../hook/BankAccountsHooks';

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
        'Chargement...'
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
