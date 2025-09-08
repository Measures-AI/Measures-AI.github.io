import React, { useState } from 'react';
import styles from './CaseStudySection.module.css';
import { LeadForm } from './LeadForm';

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

export const CaseStudySection = ({ 
  leftImage, 
  logoImage, 
  logoAlt, 
  headline, 
  story, 
  quote, 
  link,
  role,
  industry,
  cta,
  themeColor
}) => {
  const [showModal, setShowModal] = useState(false);

  const handleCtaClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <section className={styles.caseStudy}>
        <div className={styles.content}>
          <div className={styles.caseStudyContainer}>
            <div className={styles.imageContainer}>
              <img 
                src={leftImage} 
                alt="Case study illustration" 
                className={styles.caseImage}
              />
            </div>
            
            <div className={styles.caseContent}>
              {logoImage && (
                <div className={styles.logoContainer}>
                  <img 
                    src={logoImage} 
                    alt={logoAlt} 
                    className={styles.logo}
                  />
                </div>
              )}
              
              <h2 className={styles.headline}>{headline}</h2>
              
              <p className={styles.story}>{renderStory(story)}</p>
              
              {quote && (
                <blockquote className={styles.quote}>
                  "{quote}"
                </blockquote>
              )}
              
              <div className={styles.buttonContainer}>
                {link && (
                  <a 
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.readButton}
                  >
                    Read this case study
                  </a>
                )}
                <button 
                  onClick={handleCtaClick}
                  className={styles.ctaButton}
                  style={{ backgroundColor: themeColor || '#4f46e5' }}
                >
                  {cta || 'Schedule a demo'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.closeButton}
              onClick={handleCloseModal}
            >
              ×
            </button>
            <LeadForm role={role} industry={industry} cta={cta} themeColor={themeColor} />
          </div>
        </div>
      )}
    </>
  );
};

export default CaseStudySection;
