import { Link, Outlet } from '@tanstack/react-router';
import styles from '../assets/css/components/layout.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

export default function MainLayout() {
  return (
    <>
      <NavHeader />
      <Outlet />
      <Footer />
    </>
  );
}

function NavHeader() {
  return (
    <nav className={styles.mainNavHeader}>
      <Link to="/">
        <img src="argent-bank-logo.png" alt="Argent Bank Logo" width={200} />
      </Link>
      <Link to="/sign-in" className={styles.signInButton}>
        <FontAwesomeIcon icon={faUserCircle} /> Sign In
      </Link>
    </nav>
  );
}

function Footer() {
  return (
    <footer className={styles.mainFooter}>
      <p>Copyright 2020 Argent Bank</p>
    </footer>
  );
}
