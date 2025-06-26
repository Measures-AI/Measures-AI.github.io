import React, { useEffect, useRef } from 'react';
import FrostedGlass from './FrostedGlass';
import styles from './ScrollingLines.module.css';

const ScrollingLines = () => {
  const scrollingLinesRef = useRef(null);

  useEffect(() => {
    const container = scrollingLinesRef.current;
    function renderLines() {
      if (!container) return;
      container.innerHTML = '';
      const lineCount = Math.ceil(window.innerWidth / 90) + 1;
      for (let i = 0; i < lineCount; i++) {
        const line = document.createElement('div');
        line.className = styles.line;
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
    <>
      <div className={styles.animationContainer}>
        <div className={styles.scrollingLines} ref={scrollingLinesRef} />
      </div>
      <FrostedGlass />
    </>
  );
};

export default ScrollingLines; 