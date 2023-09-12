import React from "react";
import { useRouter } from "next/router";
import styles from "./editor.module.css"

const Editor: React.FC = () => {

    return(
        <div className={styles.container}>
            <div className={styles.top}></div>
            <div className={styles.blank}>
                <div className={styles.black}></div>
                <div className={styles.grey}></div>
            </div>
            <div className={styles.formContainer}>
                <div className={styles.create}>1</div>
                <div className={styles.gridItem}>2</div>
                <div className={styles.gridItem}>3</div>
                <div className={styles.gridItem}>4</div>
                <div className={styles.gridItem}>5</div>
                <div className={styles.gridItem}>6</div>
            </div>
        </div>
    );
};

export default Editor;