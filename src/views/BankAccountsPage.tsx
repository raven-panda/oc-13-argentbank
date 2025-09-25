import styles from '../assets/css/profile-page.module.css';
import UsernameEdit from '../components/profile/UsernameEdit';
import { useAuth } from '../hook/AuthHooks';

export default function BankAccountsPage() {
  const { user, loading } = useAuth();

  if (loading) {
    return <>Chargement...</>;
  } else if (!user) {
    return <>Une erreur s'est produite.</>;
  }

  return (
    <main className={styles.bodyContainer}>
      <h1>Welcome back</h1>
      <UsernameEdit
        userFirstName={user.firstName}
        userLastName={user.lastName}
      />
    </main>
  );
}
