import React from 'react';
import styles from '../template/LandingPage.module.css';
import { LeadForm } from '../components/LeadForm';

export const CenteredForm = ({ title, subtitle, role, industry, cta, headline, story, slug }) => {
  return (
    <section className={styles.sectionWrap + ' ' + styles.centeredForm}>
      <div className={styles.centeredFormText}>
        <div className={styles.sectionTitle}>{title}</div>
        {subtitle ? <div className={styles.sectionSubtitle}>{subtitle}</div> : null}
      </div>
      <LeadForm 
        role={role} 
        industry={industry} 
        cta={cta}
        headline={headline}
        story={story}
        slug={slug}
      />
    </section>
  );
};

export default CenteredForm;
