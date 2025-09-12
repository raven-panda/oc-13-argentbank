import { Link, Outlet } from '@tanstack/react-router';
import styles from '../assets/css/components/layout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOut, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '../hook/AuthHooks';

export default function MainLayout({
  isProtected = false,
}: {
  isProtected?: boolean;
}) {
  return (
    <>
      <NavHeader isProtected={isProtected} />
      <Outlet />
      <Footer />
    </>
  );
}

function NavHeader({ isProtected }: { isProtected: boolean }) {
  return (
    <nav className={styles.mainNavHeader}>
      <Link to="/">
        <img src="argent-bank-logo.png" alt="Argent Bank Logo" width={200} />
      </Link>
      {isProtected ? (
        <HeaderUserInfos />
      ) : (
        <Link to="/sign-in" className={styles.signInButton}>
          <FontAwesomeIcon icon={faUserCircle} /> Sign In
        </Link>
      )}
    </nav>
  );
}

function HeaderUserInfos() {
  const { user, logout } = useAuth();
  return (
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
  );
}

function Footer() {
  return (
    <footer className={styles.mainFooter}>
      <p>Copyright 2020 Argent Bank</p>
    </footer>
  );
}
