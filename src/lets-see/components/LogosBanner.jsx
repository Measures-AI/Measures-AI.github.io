import React from 'react';
import styles from './LogosBanner.module.css';

export const LogosBanner = ({ logos }) => {
  if (!logos || logos.length === 0) return null;

  // Split logos into two rows - show more logos
  const firstRow = logos.slice(0, Math.ceil(logos.length * 0.6));
  const secondRow = logos.slice(Math.ceil(logos.length * 0.6));

  return (
    <section className={styles.logosBanner}>
      <div className={styles.logosContainer}>
        <div className={styles.logoRow}>
          {firstRow.map((logo, index) => (
            <div key={index} className={styles.logoItem}>
              <img 
                src={logo.image} 
                alt={logo.alt} 
                className={styles.logoImage}
              />
            </div>
          ))}
        </div>
        <div className={`${styles.logoRow} ${styles.logoRowOffset}`}>
          {secondRow.map((logo, index) => (
            <div key={index} className={styles.logoItem}>
              <img 
                src={logo.image} 
                alt={logo.alt} 
                className={styles.logoImage}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LogosBanner;
