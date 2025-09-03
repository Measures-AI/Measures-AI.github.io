import React from 'react';
import styles from './BottomCTA.module.css';
import { LeadForm } from './LeadForm';

export const BottomCTA = ({ title, copy, role, industry, cta, themeColor }) => {
  return (
    <section className={styles.bottomCTA}>
      <div className={styles.content}>
        <div className={styles.ctaContainer}>
          <div className={styles.textSection}>
            <h2 className={styles.title}>
              {title || 'Ready to see your data work harder?'}
            </h2>
            <p className={styles.copy}>
              {copy || 'Get a tailored walkthrough for your role and industry.'}
            </p>
          </div>
          <div className={styles.formSection}>
            <LeadForm role={role} industry={industry} cta={cta} themeColor={themeColor} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BottomCTA;
