import React, { useEffect, useRef } from 'react';
import styles from './BouncingLines.module.css';

const BouncingLines = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    container.innerHTML = '';
    const bouncingLineCount = Math.ceil(window.innerWidth / 160);
    for (let i = 0; i < bouncingLineCount; i++) {
      const line = document.createElement('div');
      line.className = styles.bouncingLine;
      const bounceHeight = Math.floor(Math.random() * 60);
      line.style.setProperty('--bounce-height', `${bounceHeight}px`);
      line.style.setProperty('--delay', `${Math.random() * 2}s`);
      container.appendChild(line);
    }
  }, []);

  return (
    <div className={styles.bouncingLinesContainer}>
      <div className={styles.bouncingLines} ref={containerRef}></div>
    </div>
  );
};

export default BouncingLines; 