import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLink = (to, label) => (
    <Link to={to} className={`${styles.link} ${location.pathname === to ? styles.active : ''}`}>
      {label}
    </Link>
  );

  return (
    <nav className={styles.navbar}>
      <div className={styles.brand}>💚 HealthTracker</div>
      <div className={styles.links}>
        {navLink('/', 'Dashboard')}
        {navLink('/log', 'Log Health')}
        {navLink('/history', 'History')}
      </div>
      <div className={styles.user}>
        <span>Hi, {user?.name}</span>
        <button className={styles.logout} onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}
