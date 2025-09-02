import React from 'react';
import styles from '../template/LandingPage.module.css';

export const Benefits3 = ({ title, subtitle, items }) => {
  return (
    <section className={styles.sectionWrap}>
      <div className={styles.sectionTitle}>{title}</div>
      {subtitle ? <div className={styles.sectionSubtitle}>{subtitle}</div> : null}
      <div className={styles.cardList + ' ' + styles.benefits3}>
        {(items || []).map((b, i) => (
          <div className={styles.card + ' ' + styles.benefitItem} key={i}>
            {b.title ? <div className={styles.benefitTitle}>{b.title}</div> : null}
            {b.text ? <div>{b.text}</div> : null}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Benefits3;
