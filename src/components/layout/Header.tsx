import { Link } from '@tanstack/react-router';
import { useAuth } from '../../hook/AuthHooks';
import styles from '../../assets/css/components/layout.module.css';
import { faSignOut, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function LayoutHeader() {
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className={styles.mainHeader}>
      <Link to="/">
        <img src="argent-bank-logo.png" alt="Argent Bank Logo" width={200} />
      </Link>
      {isAuthenticated ? (
        <div className={styles.authenticatedUserInfos}>
          <p>
            <FontAwesomeIcon icon={faUserCircle} /> {user?.firstName}{' '}
            {user?.lastName}
          </p>
          <Link
            onClick={() => logout()}
            to="/sign-in"
            className={styles.signInButton}
          >
            <FontAwesomeIcon icon={faSignOut} /> Sign Out
          </Link>
        </div>
      ) : (
        <Link to="/sign-in" className={styles.signInButton}>
          <FontAwesomeIcon icon={faUserCircle} /> Sign In
        </Link>
      )}
    </nav>
  );
}
