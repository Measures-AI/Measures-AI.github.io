import React from 'react';
import styles from './HeroSection.module.css';
import { LeadForm } from './LeadForm';
import { DemoCard } from './DemoCard';

const renderStory = (story) => {
  if (Array.isArray(story)) {
    return story.map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < story.length - 1 && <br />}
      </React.Fragment>
    ));
  }
  return story;
};

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
  themeColors,
  backgroundColor,
  fontColor,
  // Backward compatibility
  themeColor 
}) => {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <div className={styles.heroGrid}>
          <div className={styles.leftContent}>
            <h1 className={styles.headline}>{headline}</h1>
            <p className={styles.story}>{renderStory(story)}</p>
            
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
                  themeColor={themeColors?.[0] || themeColor}
                />
              </div>
            </div>
          </div>
          
          <div className={styles.rightContent}>
            {Array.isArray(demoData) ? (
              <div className={styles.cardStack}>
                {demoData.map((cardData, index) => (
                  <DemoCard 
                    key={index}
                    demoData={cardData} 
                    themeColor={themeColors?.[index] || themeColor || '#7ecbff'} 
                  />
                ))}
              </div>
            ) : (
              // Backward compatibility for single card
              <DemoCard 
                demoData={demoData} 
                themeColor={themeColors?.[0] || themeColor} 
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
