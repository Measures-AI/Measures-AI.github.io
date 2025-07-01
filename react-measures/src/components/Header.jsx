import React, { useState } from 'react';
import styles from './Header.module.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  // Hide nav on mobile unless menuOpen, always show on desktop
  // Use window.matchMedia to check if mobile, but for SSR safety, just use CSS for hiding

  return (
    <header className={styles.header}>
      <div className={styles.logo}>Measures AI</div>
      <button
        className={styles.hamburger}
        aria-label="Toggle navigation menu"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
        <span className={styles.bar}></span>
      </button>
      <nav>
        <ul
          className={
            menuOpen
              ? styles.navList + ' ' + styles.navListOpen
              : styles.navList
          }
        >
          <li><a href="#opportunity">About</a></li>
          <li><a href="#insight">Our Insights</a></li>
          <li><a href="#process">Our Process</a></li>
          {/* <li><a href="#mission">Mission & Vision</a></li> */}
          <li><a href="#contact">Get Started</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
