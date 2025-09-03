import React from 'react';
import styles from './HeroSection.module.css';
import { LeadForm } from './LeadForm';
import { DemoCard } from './DemoCard';

export const HeroSection = ({ 
  headline, 
  story, 
  points, 
  belowPoints, 
  fields, 
  demoData, 
  role, 
  industry, 
  cta,
  themeColor 
}) => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.heroGrid}>
          <div className={styles.leftContent}>
            <h1 className={styles.headline}>{headline}</h1>
            <p className={styles.story}>{story}</p>
            
            {points && points.length > 0 && (
              <div className={styles.points}>
                {points.map((point, index) => (
                  <div key={index} className={styles.point}>
                    {point.icon && (
                      <i className={`fas fa-${point.icon} ${styles.pointIcon}`}></i>
                    )}
                    <span className={styles.pointText}>
                      {point.text || point}
                    </span>
                  </div>
                ))}
              </div>
            )}
            
            <div className={styles.formSection}>
              {belowPoints && (
                <p className={styles.belowPoints}>{belowPoints}</p>
              )}
              <div className={styles.formContainer}>
                <LeadForm 
                  role={role} 
                  industry={industry} 
                  cta={cta}
                  fields={fields}
                  themeColor={themeColor}
                />
              </div>
            </div>
          </div>
          
          <div className={styles.rightContent}>
            <DemoCard demoData={demoData} themeColor={themeColor} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
