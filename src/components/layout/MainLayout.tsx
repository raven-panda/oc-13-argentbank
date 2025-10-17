import { Outlet } from '@tanstack/react-router';
import styles from '@/assets/css/components/layout.module.css';
import LayoutHeader from './Header';

export default function MainLayout() {
  return (
    <div className={styles.layoutCtr}>
      <LayoutHeader />
      <Outlet />
      <footer className={styles.mainFooter}>
        <p>Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
}
