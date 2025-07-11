import React from 'react';
import styles from './Jumbotron.module.css';
import ConveyorBelt from './ConveyorBelt';

const Jumbotron = () => {
  return (
    <section className={styles.jumbotron}>
      <div className={styles.jumbotronText}>
        <h1>Turn sales and support into financial insight.</h1>
        <p>Turn your customer communications into cross-functional data engines.<br />Accelerate decision-making and reduce ambiguity.</p>
        <div className={styles.jumbotronButtons}>
          <a href="#contact" className={styles.contactBtn}>Get Started</a>
          <a href="#opportunity" className={styles.learnMoreBtn}>Learn More</a>
        </div>
      </div>
      <ConveyorBelt />
    </section>
  );
};

export default Jumbotron; 