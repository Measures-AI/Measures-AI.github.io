import React from 'react';
import styles from './Insights.module.css';
import Carousel from './Carousel';

const cardData = [
  {
    title: "Website issues are impacting $XX,XXX in orders.",
    text: "These are primarily affecting product Y. Some notes:",
    bullets: [
      "Most issues are related to payment issues and package tracking errors.",
      "Customer complaints about website functionality have increased by 15% in the last quarter."
    ],
    data: { type: 'line', values: [
      { name: 'Jan', value: 1424 },
      { name: 'Feb', value: 1532 },
      { name: 'Mar', value: 878 },
      { name: 'Apr', value: 2001 },
      { name: 'May', value: 1987 },
      { name: 'Jun', value: 1876 },
      { name: 'Jul', value: 1765 },
      { name: 'Aug', value: 1654 }
    ] }
  },
  {
    title: "Churn risk: $XX,XXX in ARR at increased risk for 4 key accounts.",
    text: "Communication frequency has dropped for enterprise clients in sector Z, risking $XX,XXX in annual revenue.",
    bullets: [
      "Interactions with enterprise clients in sector Z have dropped 23% since last renewal, impacting $X,XXX in monthly fees.",
      "Support tickets for onboarding delays have doubled since March, threatening $Y,XXX in upsell potential."
    ],
    data: { type: 'bar', values: [
      { name: 'Q1', value: 8000 },
      { name: 'Q2', value: 6000 },
      { name: 'Q3', value: 4000 },
      { name: 'Q4', value: 7000 }
    ] }
  },
  {
    title: "Renewal negotiations: $XX,XXX in ARR at risk due to stalled contracts.",
    text: "Several key accounts have not responded to renewal outreach, and contract negotiations are delayed.",
    bullets: [
      "4 accounts have not replied to renewal emails sent in the last 30 days.",
      "Legal review delays cited in 2 contracts, impacting $Y,YYY in potential renewals."
    ],
    data: { type: 'line', values: [
      { name: 'Jan', value: 3 },
      { name: 'Feb', value: 2 },
      { name: 'Mar', value: 5 },
      { name: 'Apr', value: 4 }
    ] }
  },
  {
    title: "Feature adoption drives $XX,XXX in expansion revenue.",
    text: "62% of users enabled Module Q, unlocking $XX,XXX in upsell opportunities.",
    bullets: [
      "Top 10 accounts show 80%+ enablement rate, correlating with $X,XXX in additional MRR.",
      "SMB segment lags at XX% adoption, leaving $Y,YYY in unrealized revenue."
    ],
    data: { type: 'bar', values: [
      { name: 'Enterprise', value: 8200 },
      { name: 'Mid-Market', value: 6800 },
      { name: 'SMB', value: 3700 }
    ] }
  },
  {
    title: "Billing errors: $X,XXX in disputed invoices this cycle.",
    text: "Disputes in usage-based plans are delaying $X,XXX in cash flow.",
    bullets: [
      "Automated reconciliation failed for X large customers, holding up $Y,YYY in payments.",
      "Manual intervention required for X% of invoices, costing $Z,ZZZ in operational overhead."
    ],
    data: { type: 'line', values: [
      { name: 'Jan', value: 2000 },
      { name: 'Feb', value: 4000 },
      { name: 'Mar', value: 7000 },
      { name: 'Apr', value: 5000 },
      { name: 'May', value: 6000 }
    ] }
  },
  {
    title: "Support ticket surge: $X,XXX in potential churn flagged.",
    text: "A spike in support tickets from key accounts may indicate dissatisfaction and risk of churn.",
    bullets: [
      "Ticket volume from top 5 accounts increased 40% over the last quarter.",
      "Most common topics: onboarding confusion and feature requests."
    ],
    data: { type: 'bar', values: [
      { name: 'Q1', value: 30 },
      { name: 'Q2', value: 42 },
      { name: 'Q3', value: 60 },
      { name: 'Q4', value: 85 }
    ] }
  },
  {
    title: "Pipeline drop-off: $XX,XXX in lost opportunities this month.",
    text: "Several high-value prospects have dropped out of the sales pipeline after initial meetings.",
    bullets: [
      "3 enterprise prospects went dark after first call, representing $X,XXX in potential ARR.",
      "Feedback cited: unclear pricing and delayed follow-up."
    ],
    data: { type: 'line', values: [
      { name: 'Week 1', value: 5 },
      { name: 'Week 2', value: 3 },
      { name: 'Week 3', value: 7 },
      { name: 'Week 4', value: 2 }
    ] }
  },
];

const Insights = () => (
  <section id="insight" className={styles.insight}>
    <div className={styles.insightText}>
      <h2>Our Insights</h2>
    </div>
    <p className={styles.insightTagline}>Real insights from real data, no humans necessary.</p>
    <div className={styles.carouselContainer}>
      <Carousel cards={cardData} />
    </div>
  </section>
);

export default Insights; 