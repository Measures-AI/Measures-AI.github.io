import ConveyorBelt from './ConveyorBelt';
import styles from './Jumbotron.module.css';

const Jumbotron = () => {
  return (
    <section className={styles.jumbotron}>
      <div className={styles.jumbotronText}>
        <h1>Turn sales, support, and reviews into insight.</h1>
        <p>Convert your customer communications into cross-functional data engines.<br />Accelerate decision-making and reduce ambiguity.</p>
        <div className={styles.jumbotronButtons}>
          <a href="#contact" className={styles.contactBtn}>Book a Demo</a>
          <a href="#opportunity" className={styles.learnMoreBtn}>Learn More</a>
        </div>
      </div>
      <ConveyorBelt />
    </section>
  );
};

export default Jumbotron; 