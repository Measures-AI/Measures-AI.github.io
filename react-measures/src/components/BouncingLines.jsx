import React, { useEffect, useRef } from 'react';
import styles from './BouncingLines.module.css';

const BouncingLines = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    function renderLines() {
      if (!container) return;
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
    }
    renderLines();
    window.addEventListener('resize', renderLines);
    return () => {
      window.removeEventListener('resize', renderLines);
    };
  }, []);

  return (
    <div className={styles.bouncingLinesContainer}>
      <div className={styles.bouncingLines} ref={containerRef}></div>
    </div>
  );
};

export default BouncingLines; 