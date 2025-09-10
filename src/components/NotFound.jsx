import React from 'react';
import styles from './NotFound.module.css';

const NotFound = () => {
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <a href="/" className={styles.logo}>
            Measures AI
          </a>
        </div>
      </header>
      
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.errorCode}>404</div>
          <h1 className={styles.title}>Page Not Found</h1>
          <p className={styles.description}>
            The page you're looking for doesn't exist or has been moved. 
            Let's get you back on track.
          </p>
          <div className={styles.actions}>
            <a href="/" className={`${styles.btn} ${styles.btnPrimary}`}>
              <i className="fas fa-home"></i>
              Go Home
            </a>
            <button 
              onClick={handleGoBack} 
              className={`${styles.btn} ${styles.btnSecondary}`}
            >
              <i className="fas fa-arrow-left"></i>
              Go Back
            </button>
          </div>
        </div>
      </main>
      
      <footer className={styles.footer}>
        <div className={styles.footerContent}>
          © 2024 Measures AI. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default NotFound; 