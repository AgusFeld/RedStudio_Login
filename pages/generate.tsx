import React from "react";
import { useRouter } from "next/router";
import styles from "./generate.module.css"

const Generate: React.FC = () => {

    return(
        
        <div className = {styles.container}>
            <div className={styles.formContainer}>
                <img className={styles.login} src="Logo.png"></img>
                <div className={styles.botones}>
                    <div className={styles.column}></div>
                    <div className={styles.column}></div>
                </div>
            </div>
        </div>

    );
};

export default Generate;