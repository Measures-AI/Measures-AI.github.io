import React from 'react';
import styles from './QuoteSection.module.css';

export const QuoteSection = ({ text, author, role }) => {
  return (
    <section className={styles.quoteSection}>
      <div className={styles.content}>
        <blockquote className={styles.quote}>
          {text}
        </blockquote>
        {(author || role) && (
          <div className={styles.attribution}>
            — {author}{role ? `, ${role}` : ''}
          </div>
        )}
      </div>
    </section>
  );
};

export default QuoteSection;
