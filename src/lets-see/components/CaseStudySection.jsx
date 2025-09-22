import React, { useState, useEffect } from 'react';
import styles from './CaseStudySection.module.css';
import { LeadForm } from './LeadForm';

export const CaseStudySection = ({ 
  leftImage, 
  logoImage, 
  logoAlt, 
  headline, 
  story, 
  quote,
  author,
  quoteRole,
  link,
  role,
  industry,
  cta,
  themeColor,
  pageHeadline,
  pageStory,
  slug,
  pageConfig = {}
}) => {
  const [showModal, setShowModal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleCtaClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const renderContent = () => {
    const imageElement = (
      <div className={styles.imageContainer}>
        <img 
          src={leftImage} 
          alt="Case study illustration" 
          className={styles.caseImage}
        />
      </div>
    );

    const logoElement = logoImage && (
      <div className={styles.logoContainer}>
        <img 
          src={logoImage} 
          alt={logoAlt} 
          className={styles.logo}
        />
      </div>
    );

    const headlineElement = <h2 className={styles.headline}>{headline}</h2>;
    
    const contentElements = (
      <>
        <p className={styles.story}>{story}</p>
        
        {quote && (
          <div className={styles.quoteContainer}>
            <blockquote className={styles.quote}>
              "{quote}"
            </blockquote>
            {(author || quoteRole) && (
              <div className={styles.quoteAttribution}>
                — {author}{quoteRole ? `, ${quoteRole}` : ''}
              </div>
            )}
          </div>
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
      </>
    );

    if (isMobile) {
      return (
        <div className={styles.caseStudyContainer}>
          <div className={styles.caseContent}>
            {imageElement}
            {logoElement}
            {headlineElement}
            {contentElements}
          </div>
        </div>
      );
    } else {
      return (
        <div className={styles.caseStudyContainer}>
          {imageElement}
          <div className={styles.caseContent}>
            {logoElement}
            {headlineElement}
            {contentElements}
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <section className={styles.caseStudy}>
        <div className={styles.content}>
          {renderContent()}
        </div>
      </section>

      {/* Modal */}
      {showModal && (
        <div className={styles.modalOverlay} onClick={handleCloseModal}>
          <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <button 
              className={styles.closeButton}
              onClick={handleCloseModal}
              onTouchStart={handleCloseModal}
              aria-label="Close modal"
            >
              ×
            </button>
            <LeadForm 
              role={role} 
              industry={industry} 
              cta={cta} 
              themeColor={themeColor}
              headline={pageHeadline}
              story={pageStory}
              slug={slug}
              pageConfig={pageConfig}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default CaseStudySection;
