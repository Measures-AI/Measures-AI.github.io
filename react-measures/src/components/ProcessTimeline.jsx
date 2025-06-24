import React, { useEffect, useRef } from 'react';
import styles from './ProcessTimeline.module.css';

const steps = [
  { title: 'Step 1', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris.' },
  { title: 'Step 2', text: 'Vivamus hendrerit arcu sed erat molestie vehicula. Sed auctor neque eu tellus.' },
  { title: 'Step 3', text: 'Phasellus molestie magna non est bibendum non venenatis nisl tempor.' },
  { title: 'Step 4', text: 'Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor posuere.' },
];

const ProcessTimeline = () => {
  const timelineRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const timelineContainer = timelineRef.current;
    const processSection = sectionRef.current;
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
  }, []);

  return (
    <section id="process" className={styles.process} ref={sectionRef}>
      <div className={styles.processText}>
        <h2>Our Process</h2>
        <p>Live results in as little as 2 weeks.</p>
      </div>
      <div id="process-timeline" className={styles.processTimeline}>
        <div ref={timelineRef} className={styles.timelineContainer}></div>
        {steps.map((step, idx) => (
          <div className={styles.stepContainer} key={idx}>
            <div className={styles.step}>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProcessTimeline; 