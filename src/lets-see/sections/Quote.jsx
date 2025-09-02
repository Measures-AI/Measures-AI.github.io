import React from 'react';
import styles from '../template/LandingPage.module.css';

export const Quote = ({ text, author, role }) => {
  return (
    <section className={styles.sectionWrap + ' ' + styles.quote}>
      <div className={styles.quoteText}>“{text}”</div>
      {(author || role) ? (
        <div className={styles.quoteMeta}>— {author}{role ? `, ${role}` : ''}</div>
      ) : null}
    </section>
  );
};

export default Quote;
