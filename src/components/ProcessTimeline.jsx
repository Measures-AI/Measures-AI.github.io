import React, { useEffect, useRef } from 'react';
import styles from './ProcessTimeline.module.css';
import { useState } from 'react';

const steps = [
  { 
    title: 'Step 1: Platform', 
    text: 'We deploy a secure, single-tenant, isolated environment for your data and measures to sit.',
    image: '/img/platform-graphic.svg'
  },
  { 
    title: 'Step 2: Data', 
    text: 'We establish live connections with the platforms you use to interact with customers.',
    image: '/img/data-graphic.svg'
  },
  { 
    title: 'Step 3: Measurement', 
    text: 'Our models ingest and measure the data, both historically and in real-time.',
    image: '/img/measurement-graphic.svg'
  },
  { 
    title: 'Step 4: Insights', 
    text: 'Notable insights are surfaced to you in a dashboard, with the ability to drill down or export as needed.',
    image: '/img/insights-graphic.svg'
  },
];

const ProcessTimeline = () => {
  const timelineRef = useRef(null);
  const sectionRef = useRef(null);
  const [isLargeMobile, setIsLargeMobile] = useState(window.innerWidth > 900);

  useEffect(() => {
    const timelineContainer = timelineRef.current;
    const processSection = sectionRef.current;
    function renderLines() {
      setIsLargeMobile(window.innerWidth > 900);
      if (!timelineContainer || !processSection) return;
      timelineContainer.innerHTML = '';
      const sectionHeight = processSection.offsetHeight;
      const numLines = Math.floor(sectionHeight / 50);
      const spacing = 40;
      for (let i = 0; i < numLines; i++) {
        const line = document.createElement('div');
        line.className = styles.verticalLine;
        line.style.marginTop = i === 0 ? '0px' : `${spacing}px`;
        line.style.marginBottom = 0;
        if (i === 0 || i === numLines - 1) {
          line.classList.add(styles.verticalLineLarge);
        }
        timelineContainer.appendChild(line);
      }
    }
    renderLines();
    window.addEventListener('resize', renderLines);
    return () => {
      window.removeEventListener('resize', renderLines);
    };
  }, []);

  return (
    <section id="process" className={styles.process} ref={sectionRef}>
      <div className={styles.processText}>
        <h2>Our Process</h2>
        <p>Live results in as little as 2 weeks.</p>
      </div>
      <div id="process-timeline" className={styles.processTimeline}>
        <div ref={timelineRef} className={styles.timelineContainer}></div>
        <div className={styles.stepsGrid}>
          {steps.map((step, idx) => (
            <React.Fragment key={idx}>
              {idx % 2 === 0 || !isLargeMobile ? (
                <>
                  <div className={styles.stepContainer}>
                    <div className={styles.step}>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </div>
                  <div className={styles.imageContainer}>
                    <img 
                      src={step.image} 
                      alt={`${step.title} illustration`}
                      className={styles.stepImage}
                      // onError={(e) => {
                      //   e.target.style.display = 'none';
                      // }}
                    />
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.imageContainer}>
                    <img 
                      src={step.image} 
                      alt={`${step.title} illustration`}
                      className={styles.stepImage}
                      // onError={(e) => {
                      //   e.target.style.display = 'none';
                      // }}
                    />
                  </div>
                  <div className={styles.stepContainer}>
                    <div className={styles.step}>
                      <h3>{step.title}</h3>
                      <p>{step.text}</p>
                    </div>
                  </div>
                </>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline; 