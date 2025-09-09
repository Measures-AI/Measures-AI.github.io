import React, { useState, useEffect, useRef } from 'react';
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
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isScrollingComplete, setIsScrollingComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const heroRef = useRef(null);
  const cardsRef = useRef(null);
  
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth <= 900;
      setIsMobile(mobile);
      if (mobile) {
        setIsScrollingComplete(true); // Disable effects on mobile
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  useEffect(() => {
    if (isMobile) return; // Skip scroll effects on mobile
    
    const handleScroll = () => {
      if (!heroRef.current || !cardsRef.current) return;
      
      const heroRect = heroRef.current.getBoundingClientRect();
      const cardsRect = cardsRef.current.getBoundingClientRect();
      
      // Calculate scroll progress through the cards section
      const scrollProgress = Math.max(0, Math.min(1, -cardsRect.top / (cardsRect.height - window.innerHeight)));
      
      // Determine which card should be "active" based on scroll
      const totalCards = Array.isArray(demoData) ? demoData.length : 1;
      const cardIndex = Math.min(totalCards - 1, Math.floor(scrollProgress * totalCards));
      setCurrentCardIndex(cardIndex);
      
      // Check if we've scrolled past all cards (third card is in first position)
      const isComplete = scrollProgress >= 1; // Adjust this threshold as needed
      setIsScrollingComplete(isComplete);
      
      // Broadcast scroll completion state to other components
      window.dispatchEvent(new CustomEvent('heroScrollComplete', { detail: { isComplete } }));
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial call
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [demoData, isMobile]);
  
  // Get current theme color based on active card
  const getCurrentThemeColor = () => {
    if (!themeColors || themeColors.length === 0) {
      return themeColor || '#7ecbff';
    }
    return themeColors[currentCardIndex] || themeColors[0];
  };
  
  return (
    <section className={styles.hero} ref={heroRef}>
      <div className={styles.content}>
        <div className={`${styles.heroGrid} ${!isMobile && !isScrollingComplete ? styles.frozenLayout : ''}`}>
          <div className={`${styles.leftContent} ${!isMobile && !isScrollingComplete ? styles.frozen : ''}`}>
            <h1 className={styles.headline}>{headline}</h1>
            <p className={styles.story}>{renderStory(story)}</p>
            
            {points && points.length > 0 && (
              <div className={styles.points}>
                {points.map((point, index) => {
                  const pointColor = themeColors && themeColors[index] ? themeColors[index] : (themeColor || '#7ecbff');
                  return (
                    <div key={index} className={styles.point}>
                      {point.icon && (
                        <i 
                          className={`fas fa-${point.icon} ${styles.pointIcon}`}
                          style={{ color: pointColor }}
                        ></i>
                      )}
                      <span 
                        className={styles.pointText}
                        style={{ color: pointColor }}
                      >
                        {point.text || point}
                      </span>
                    </div>
                  );
                })}
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
                  themeColor={getCurrentThemeColor()}
                />
              </div>
            </div>
          </div>
          
          <div className={styles.rightContent}>
            {Array.isArray(demoData) ? (
              <div className={styles.cardStack} ref={cardsRef}>
                {demoData.map((cardData, index) => (
                  <div 
                    key={index} 
                    className={`${styles.cardWrapper} ${isMobile && index > 0 ? styles.hiddenOnMobile : ''}`}
                  >
                    <DemoCard 
                      demoData={cardData} 
                      themeColor={themeColors?.[index] || themeColor || '#7ecbff'} 
                    />
                  </div>
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
