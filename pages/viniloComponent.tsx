import React from "react";
import styles from "./ViniloComponent.module.css";

const ViniloComponent: React.FC = () => {
  return (
    <div>
      <div className={styles.E1}></div>
      <div className={styles.E2}></div>
      <div className={styles.E3}></div>
      <div className={styles.E4}></div>
      <div className={styles.E5}></div>
      <div className={styles.E6}></div>
      <div className={styles.E7}></div>
      <div className={styles.E8}></div>
      <div className={styles.Rectangle1}></div>
      <div className={styles.Rectangle2}></div>
      <div className={styles.E9}></div>
      <div className={styles.E11}>
        <img className={styles.img} src="discoRedStudio.png" alt="Vinilo" />
      </div>
      <div className={styles.E10}></div>
    </div>
  );
};

export default ViniloComponent;