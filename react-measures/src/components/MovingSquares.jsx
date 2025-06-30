import React, { useEffect, useRef } from 'react';
import styles from './MovingSquares.module.css';

const MovingSquares = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    function renderSquares() {
      if (!container) return;
      container.innerHTML = '';
      const squareCount = Math.ceil(window.innerWidth / 50);
      for (let i = 0; i < squareCount; i++) {
        const square = document.createElement('div');
        square.className = styles.square;
        container.appendChild(square);
      }
    }
    renderSquares();
    window.addEventListener('resize', renderSquares);
    return () => {
      window.removeEventListener('resize', renderSquares);
    };
  }, []);

  return (
    <div className={styles.movingSquaresContainer}>
      <div className={styles.movingSquares} ref={containerRef}></div>
    </div>
  );
};

export default MovingSquares; 