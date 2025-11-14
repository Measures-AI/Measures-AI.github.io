import styles from './Opportunity.module.css';

const Opportunity = () => (
  <section id="opportunity" className={styles.opportunity}>
    <div className={styles.opportunityText}>
      <h2>Measure everything.</h2>
      <p>Built for Strategy, Product, and CX.</p>
      <p>We turn your multi-channel sales and support communications into measurements that drive decision-making. We go straight to the source, so you don't have to change your workflow. <br/><br/>Get answers, set priorities, and justify spend in real-time.</p>
      <a href="#contact" className={styles.contactBtn}>Book a Demo</a>
    </div>
    <div className={styles.graphicPlaceholder}>
      <img src="/img/ConveyorBeltGraphic.svg" alt="Conveyor Belt Graphic" style={{maxWidth: '100%', maxHeight: '100%'}} />
    </div>
  </section>
);

export default Opportunity; 