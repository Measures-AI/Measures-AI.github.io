import React from 'react';
import GetStartedForm from './ContactForm.jsx';
import styles from './GetStarted.module.css';

const GetStarted = () => (
  <section id="contact" className={styles.gettingStarted}>
    <h2>Get Started</h2>
    <div className={styles.gettingStartedForm}>
      <GetStartedForm />
    </div>
  </section>
);

export default GetStarted; 