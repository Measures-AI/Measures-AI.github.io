import React from 'react';
import styles from './MissionVision.module.css';

const MissionVision = () => (
  <section id="mission" className={styles.mission}>
    <div className={styles.missionText}>
      <h2>Our Mission</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
    </div>
    <div className={styles.missionText}>
      <h2>Our Vision</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula.</p>
    </div>
  </section>
);

export default MissionVision; 