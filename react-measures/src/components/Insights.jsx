import React from 'react';
import styles from './Insights.module.css';
import Carousel from './Carousel';

const cardData = [
  { title: "Quality issues are impacting $XX,XXX in orders.", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { title: "Founder background drove $XXX,XXX in revenue last month.", text: "Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie." },
  { title: "Customized orders drive XX% more revenue per call.", text: "Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor." },
  { title: "Agents drive $XXX.XX in revenue per hour spent customizing orders.", text: "Ut in nulla enim. Phasellus molestie magna non est bibendum." },
  { title: "Revenue from graduation events is up %X,XXX this month.", text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { title: "Product Y most frequently experiences delivery complaints.", text: "Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie." },
  { title: "Billing issues are impacting $XX,XXX in orders.", text: "Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor." },
  { title: "Emphasizing feature Y reduces close times by XX%.", text: "Ut in nulla enim. Phasellus molestie magna non est bibendum." }
];

const Insights = () => (
  <section id="insight" className={styles.insight}>
    <div className={styles.insightText}>
      <h2>Our Insights</h2>
    </div>
    <p className={styles.insightTagline}>Real insights from real companies, no humans necessary.</p>
    <div className={styles.carouselContainer}>
      <Carousel cards={cardData} />
    </div>
  </section>
);

export default Insights; 