import React from 'react';
import styles from '../template/LandingPage.module.css';

export const LogoCloud = ({ title, subtitle, logos }) => {
  return (
    <section className={styles.sectionWrap + ' ' + styles.logoCloud}>
      <div className={styles.sectionTitle}>{title}</div>
      {subtitle ? <div className={styles.sectionSubtitle}>{subtitle}</div> : null}
      <div className={styles.logoGrid}>
        {(logos || []).map((src, i) => (
          <div className={styles.logoItem} key={i}>
            <img className={styles.logoImg} src={src} alt="logo" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default LogoCloud;
