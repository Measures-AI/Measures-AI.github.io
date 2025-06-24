import React, { useEffect, useRef } from 'react';
import styles from './MovingSquares.module.css';

const MovingSquares = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    container.innerHTML = '';
    const squareCount = 40;
    for (let i = 0; i < squareCount; i++) {
      const square = document.createElement('div');
      square.className = styles.square;
      container.appendChild(square);
    }
  }, []);

  return (
    <div className={styles.movingSquaresContainer}>
      <div className={styles.movingSquares} ref={containerRef}></div>
    </div>
  );
};

export default MovingSquares; 