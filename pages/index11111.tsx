import React from "react";
import styles from "./LandingPage.module.css";

const LandingPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.bar}>
        <img className={styles.logo} src= './Logo.png' alt="Logo" />
      </div>
    </div>
  );
};

export default LandingPage;