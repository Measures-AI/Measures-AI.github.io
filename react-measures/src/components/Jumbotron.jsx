import React, { useEffect, useRef } from 'react';
import styles from './Jumbotron.module.css';

const Jumbotron = () => {
  const scrollingLinesRef = useRef(null);

  useEffect(() => {
    const container = scrollingLinesRef.current;
    if (!container) return;
    container.innerHTML = '';
    const lineCount = Math.ceil(window.innerWidth / 90) + 1;
    for (let i = 0; i < lineCount; i++) {
      const line = document.createElement('div');
      line.className = styles.line;
      container.appendChild(line);
    }
  }, []);

  return (
    <section className={styles.jumbotron}>
      <div className={styles.jumbotronText}>
        <h1>Why do people buy from you?</h1>
        <p>Not just a sales problem, CFOs, CPOs, and CTOs aslo need to know. <br /> Turn your sales pipeline into a cross-functional data engine.</p>
        <div className={styles.jumbotronButtons}>
          <a href="#contact" className={styles.contactBtn}>Contact Us</a>
          <a href="#opportunity" className={styles.learnMoreBtn}>Learn More</a>
        </div>
      </div>
      <div className={styles.animationContainer}>
        <div className={styles.scrollingLines} ref={scrollingLinesRef} />
      </div>
    </section>
  );
};

export default Jumbotron; 