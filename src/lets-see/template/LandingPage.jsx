import React from 'react';
import styles from './LandingPage.module.css';
import { LeadForm } from '../components/LeadForm';
import { TrackingProvider } from '../components/TrackingProvider';

export const LandingPage = ({ config }) => {
  const { role, industry, headline, subheadline, demoData, points, cta } = config || {};

  return (
    <TrackingProvider>
      <div className={styles.page}>
        <header className={styles.header}>
          <div className={styles.brand}>Measures AI</div>
        </header>

        <section className={styles.hero}>
          <div className={styles.heroText}>
            <div className={styles.headline}>
              {headline || 'Measure everything that matters.'}
            </div>
            <div className={styles.subheadline}>
              {subheadline || 'Operational intelligence tailored for your team.'}
            </div>

            <div className={styles.points}>
              {(points || []).map((p, idx) => (
                <div className={styles.point} key={idx}>{p}</div>
              ))}
            </div>
          </div>
          <LeadForm role={role} industry={industry} cta={cta} />
        </section>

        <section className={styles.demoCard}>
          <div className={styles.demoTitle}>{(demoData && demoData.title) || 'Demo Data'}</div>
          {demoData && demoData.image ? (
            <img className={styles.demoImage} src={demoData.image} alt="demo" />
          ) : null}
          <div className={styles.demoBullets}>
            {(demoData && demoData.bullets ? demoData.bullets : [
              'Example KPI 1',
              'Example KPI 2',
              'Example KPI 3',
            ]).map((b, i) => (<div key={i}>• {b}</div>))}
          </div>
        </section>

        <footer className={styles.footer}>
          <div>© {new Date().getFullYear()} Measures AI</div>
        </footer>
      </div>
    </TrackingProvider>
  );
};
