import React from 'react';
import styles from './Header.module.css';

export const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.content}>
        <a href="/" className={styles.logo}>
          Measures AI
        </a>
      </div>
    </header>
  );
};

export default Header;
