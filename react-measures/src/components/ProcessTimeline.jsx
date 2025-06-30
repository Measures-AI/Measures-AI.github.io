import React, { useEffect, useRef } from 'react';
import styles from './ProcessTimeline.module.css';

const steps = [
  { title: 'Step 1: Platform', text: 'We deploy a secure, single-tenant, isolated environment for your data and measures to sit.' },
  { title: 'Step 2: Data', text: 'We establish live connections with the platforms you use to interact with customers.' },
  { title: 'Step 3: Measurement', text: 'Our models ingest and measure the data, both historically and in real-time.' },
  { title: 'Step 4: Insights', text: 'Notable insights are surfaced to you in a dashboard, with the ability to drill down or export as needed.' },
];

const ProcessTimeline = () => {
  const timelineRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const timelineContainer = timelineRef.current;
    const processSection = sectionRef.current;
    function renderLines() {
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
          line.style.width = '80px';
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
            <div className={styles.stepContainer} key={idx}>
              <div className={styles.step}>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessTimeline; 