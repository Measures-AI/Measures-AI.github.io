import React from 'react';
import styles from './ContactForm.module.css';

const GetStartedForm = () => (
  <form>
    <div className={styles.formGroup}>
      <label htmlFor="name">Name</label>
      <input type="text" id="name" name="name" required />
    </div>
    <div className={styles.formGroup}>
      <label htmlFor="email">Email</label>
      <input type="email" id="email" name="email" required />
    </div>
    <div className={styles.formGroup}>
      <label htmlFor="company">Company</label>
      <input type="text" id="company" name="company" />
    </div>
    <div className={styles.formGroup}>
      <label htmlFor="message">Message</label>
      <textarea id="message" name="message" required></textarea>
    </div>
    <button type="submit" className={styles.contactBtn}>Submit</button>
  </form>
);

export default GetStartedForm; 