import React from 'react';
import styles from './FeatureRowsSection.module.css';

export const FeatureRowsSection = ({ title, subtitle, rows }) => {
  return (
    <section className={styles.featureRows}>
      <div className={styles.content}>
        {title && <h2 className={styles.title}>{title}</h2>}
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        
        <div className={styles.featuresGrid}>
          {(rows || []).map((feature, index) => (
            <div key={index} className={styles.featureItem}>
              <div className={styles.imageContainer}>
                <img 
                  src={feature.image} 
                  alt={feature.title} 
                  className={styles.featureImage}
                />
              </div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureText}>{feature.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureRowsSection;
