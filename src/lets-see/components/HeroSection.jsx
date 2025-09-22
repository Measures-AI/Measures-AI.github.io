import React, { useState } from 'react';
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
  themeColor,
  slug,
  pageConfig = {}
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.content}>
          <div className={styles.heroGrid}>
            <div className={styles.leftContent}>
              <h1 className={styles.headline}>{headline}</h1>
              <div className={styles.story}>
                {Array.isArray(story) 
                  ? story.map((line, index) => (
                      <React.Fragment key={index}>
                        {line}
                        {index < story.length - 1 && <br />}
                      </React.Fragment>
                    ))
                  : story
                }
              </div>
              
              {points && points.length > 0 && (
                <div className={styles.points}>
                  {points.map((point, index) => (
                    <div key={index} className={styles.point}>
                      {point.icon && (
                        <i 
                          className={`fas fa-${point.icon} ${styles.pointIcon}`}
                          style={{ color: themeColor || '#7ecbff' }}
                        ></i>
                      )}
                      <span 
                        className={styles.pointText}
                        style={{ color: themeColor || '#7ecbff' }}
                      >
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
                
                {/* Desktop form */}
                <div className={styles.formContainer}>
                  <LeadForm 
                    role={role} 
                    industry={industry} 
                    cta={cta}
                    fields={fields}
                    themeColor={themeColor}
                    headline={headline}
                    story={story}
                    slug={slug}
                    pageConfig={pageConfig}
                  />
                </div>
                
                {/* Mobile CTA button */}
                <button 
                  className={styles.mobileCTAButton}
                  onClick={openModal}
                  style={{ backgroundColor: themeColor || '#4f46e5' }}
                >
                  {cta || 'Request demo'}
                </button>
              </div>
              
              <div className={styles.mobileCard}>
                <DemoCard demoData={demoData} themeColor={themeColor} />
              </div>
            </div>
            
            <div className={styles.rightContent}>
              <DemoCard demoData={demoData} themeColor={themeColor} />
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={closeModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={styles.modalClose} onClick={closeModal}>
              <i className="fas fa-times"></i>
            </button>
            <div className={styles.modalHeader}>
              <h3 className={styles.modalTitle}>Get Started</h3>
              <p className={styles.modalSubtitle}>Tell us about yourself and we'll be in touch.</p>
            </div>
            <LeadForm 
              role={role} 
              industry={industry} 
              cta={cta}
              fields={fields}
              themeColor={themeColor}
              headline={headline}
              story={story}
              slug={slug}
              pageConfig={pageConfig}
              onSuccess={closeModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default HeroSection;
