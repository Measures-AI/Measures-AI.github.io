import React from 'react';
import styles from '../template/LandingPage.module.css';

export const FeatureRows = ({ title, subtitle, rows }) => {
  return (
    <section className={styles.sectionWrap}>
      <div className={styles.sectionTitle}>{title}</div>
      {subtitle ? <div className={styles.sectionSubtitle}>{subtitle}</div> : null}
      <div className={styles.featureRows}>
        {(rows || []).map((r, i) => (
          <div className={styles.featureRow} key={i}>
            {(i % 2 === 0) ? (
              <>
                {r.image ? <img className={styles.featureRowImage} src={r.image} alt="" /> : <div />}
                <div className={styles.featureRowText}>
                  {r.title ? <div className={styles.benefitTitle}>{r.title}</div> : null}
                  {r.text ? <div>{r.text}</div> : null}
                </div>
              </>
            ) : (
              <>
                <div className={styles.featureRowText}>
                  {r.title ? <div className={styles.benefitTitle}>{r.title}</div> : null}
                  {r.text ? <div>{r.text}</div> : null}
                </div>
                {r.image ? <img className={styles.featureRowImage} src={r.image} alt="" /> : <div />}
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeatureRows;
