import React, { useEffect, useRef, useState } from 'react';
import styles from './ProcessSection.module.css';

export const ProcessSection = ({ title, subtitle, items }) => {
  const timelineRef = useRef(null);
  const sectionRef = useRef(null);
  const [isLargeMobile, setIsLargeMobile] = useState(true);

  useEffect(() => {
    const timelineContainer = timelineRef.current;
    const processSection = sectionRef.current;
    
    function renderLines() {
      if (typeof window !== 'undefined') {
        setIsLargeMobile(window.innerWidth > 900);
      }
      if (!timelineContainer || !processSection) return;
      
      timelineContainer.innerHTML = '';
      const sectionHeight = processSection.offsetHeight;
      const numLines = Math.floor(sectionHeight / 50);
      const spacing = 40;
      
      for (let i = 0; i < numLines; i++) {
        const line = document.createElement('div');
        line.className = styles.verticalLine;
        line.style.marginTop = i === 0 ? '0px' : `${spacing}px`;
        line.style.marginBottom = '0';
        
        if (i === 0 || i === numLines - 1) {
          line.classList.add(styles.verticalLineLarge);
        }
        
        timelineContainer.appendChild(line);
      }
    }
    
    renderLines();
    
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', renderLines);
      return () => {
        window.removeEventListener('resize', renderLines);
      };
    }
  }, []);

  return (
    <section className={styles.process} ref={sectionRef}>
      <div className={styles.content}>
        <div className={styles.processHeader}>
          <h2 className={styles.title}>{title}</h2>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        </div>
        
        <div className={styles.processTimeline}>
          <div ref={timelineRef} className={styles.timelineContainer}></div>
          <div className={styles.stepsGrid}>
            {(items || []).map((step, idx) => (
              <React.Fragment key={idx}>
                {/* Always put steps on left, images on right */}
                <div className={styles.stepContainer}>
                  <div className={styles.step}>
                    <h3 className={styles.stepTitle}>{step.title}</h3>
                    <p className={styles.stepText}>{step.text}</p>
                  </div>
                </div>
                <div className={styles.imageContainer}>
                  <img 
                    src={step.image} 
                    alt={`${step.title} illustration`}
                    className={styles.stepImage}
                  />
                </div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
