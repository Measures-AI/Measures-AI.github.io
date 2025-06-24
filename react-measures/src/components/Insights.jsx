import React from 'react';
import styles from './Insights.module.css';
import Carousel from './Carousel';

const cardData = [
  {
    title: "Quality issues are impacting $XX,XXX in orders.",
    text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    data: { type: 'line', values: [
      { name: 'Jan', value: 10 },
      { name: 'Feb', value: 15 },
      { name: 'Mar', value: 8 },
      { name: 'Apr', value: 20 },
      { name: 'May', value: 12 }
    ] }
  },
  {
    title: "Founder background drove $XXX,XXX in revenue last month.",
    text: "Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie.",
    data: { type: 'bar', values: [
      { name: 'A', value: 30 },
      { name: 'B', value: 22 },
      { name: 'C', value: 18 },
      { name: 'D', value: 27 }
    ] }
  },
  {
    title: "Customized orders drive XX% more revenue per call.",
    text: "Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.",
    data: { type: 'line', values: [
      { name: 'Q1', value: 5 },
      { name: 'Q2', value: 9 },
      { name: 'Q3', value: 7 },
      { name: 'Q4', value: 14 }
    ] }
  },
  {
    title: "Agents drive $XXX.XX in revenue per hour spent customizing orders.",
    text: "Ut in nulla enim. Phasellus molestie magna non est bibendum.",
    data: { type: 'bar', values: [
      { name: 'Agent 1', value: 12 },
      { name: 'Agent 2', value: 19 },
      { name: 'Agent 3', value: 8 }
    ] }
  }
  // },
  // {
  //   title: "Revenue from graduation events is up %X,XXX this month.",
  //   text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //   data: { type: 'line', values: [
  //     { name: '2019', value: 7 },
  //     { name: '2020', value: 12 },
  //     { name: '2021', value: 18 },
  //     { name: '2022', value: 25 }
  //   ] }
  // },
  // {
  //   title: "Product Y most frequently experiences delivery complaints.",
  //   text: "Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie.",
  //   data: { type: 'bar', values: [
  //     { name: 'Late', value: 14 },
  //     { name: 'Damaged', value: 9 },
  //     { name: 'Wrong Item', value: 6 }
  //   ] }
  // },
  // {
  //   title: "Billing issues are impacting $XX,XXX in orders.",
  //   text: "Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor.",
  //   data: { type: 'line', values: [
  //     { name: 'Week 1', value: 3 },
  //     { name: 'Week 2', value: 7 },
  //     { name: 'Week 3', value: 5 },
  //     { name: 'Week 4', value: 11 }
  //   ] }
  // },
  // {
  //   title: "Emphasizing feature Y reduces close times by XX%.",
  //   text: "Ut in nulla enim. Phasellus molestie magna non est bibendum.",
  //   data: { type: 'bar', values: [
  //     { name: 'Before', value: 20 },
  //     { name: 'After', value: 12 }
  //   ] }
  // }
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