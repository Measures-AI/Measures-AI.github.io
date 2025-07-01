import React from 'react';
import styles from './FrostedGlass.module.css';

const FrostedGlass = () => {
  return (<>

    <div className={styles.frostedGlass}>
      <div className={styles.outerFrame}></div>
      <div className={styles.frostedGlassBackdrop}>
        {/* <img src="/platform.svg" alt="Measures Platform Logo" className={styles.platformLogo} /> */}
      </div>
      <div className={styles.machineFrame}>
        <div className={styles.machineTop}></div>
        <div className={styles.machineBottom}></div>
        <div className={styles.machineLeft}></div>
        <div className={styles.machineRight}></div>
        <div className={styles.machineFront}></div>
        <div className={styles.machineBack}></div>
      </div>
    </div>
  </>
  );
};

export default FrostedGlass; 