import React, { useState, useEffect } from 'react';
import styles from './Header.module.css';

export const Header = () => {
  const [isScrollingComplete, setIsScrollingComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      if (mobile) {
        setIsScrollingComplete(true); // Disable effects on mobile
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    if (isMobile) return; // Skip scroll effects on mobile
    
    const handleHeroScrollComplete = (event) => {
      setIsScrollingComplete(event.detail.isComplete);
    };
    
    window.addEventListener('heroScrollComplete', handleHeroScrollComplete);
    
    return () => window.removeEventListener('heroScrollComplete', handleHeroScrollComplete);
  }, [isMobile]);
  
  return (
    <header className={`${styles.header} ${!isMobile && !isScrollingComplete ? styles.frozen : ''}`}>
      <div className={styles.content}>
        <a href="/" className={styles.logo}>
          Measures AI
        </a>
      </div>
    </header>
  );
};

export default Header;
