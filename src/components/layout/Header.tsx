import { Link } from '@tanstack/react-router';
import { useAuth } from '../auth/hook/AuthHooks';
import styles from '@/assets/css/components/layout.module.css';
import { faSignOut, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LayoutHeader() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className={styles.mainHeader}>
      <Link to="/">
        <img src="/argent-bank-logo.png" alt="Argent Bank Logo" width={200} />
      </Link>
      {isAuthenticated ? (
        <div className={styles.authenticatedUserInfos}>
          <Link to="/bank-account" className={styles.headerButton}>
            <FontAwesomeIcon icon={faUserCircle} /> {user?.firstName}{' '}
            {user?.lastName}
          </Link>
          <button onClick={() => logout()} className={styles.headerButton}>
            <FontAwesomeIcon icon={faSignOut} /> Sign Out
          </button>
        </div>
      ) : (
        <Link to="/sign-in" className={styles.headerButton}>
          <FontAwesomeIcon icon={faUserCircle} /> Sign In
        </Link>
      )}
    </nav>
  );
}
