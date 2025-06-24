import React from 'react';
import styles from './Header.module.css';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.logo}>Measures AI</div>
    <nav>
      <ul className={styles.navList}>
        <li><a href="#opportunity">About</a></li>
        <li><a href="#insight">Our Insights</a></li>
        <li><a href="#process">Our Process</a></li>
        <li><a href="#mission">Mission & Vision</a></li>
        <li><a href="#contact">Contact Us</a></li>
      </ul>
    </nav>
  </header>
);

export default Header;
