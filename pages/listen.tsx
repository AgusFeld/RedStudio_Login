import React, { useState } from 'react';
import { useRouter } from "next/router";
import styles from "./listen.module.css";
import ViniloComponent from "./viniloComponent";

const Listen: React.FC = () => {
    

    return(
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.disco}>
                    <div className={styles.titulo}>Mil Horas - Los Abuelos de la Nada</div>
                    <img className={styles.discoContainer} src="div.record.png" alt="" />
                    <img className={styles.brazo} src="div.arm-container.png" alt="" />
                </div>
                <div className={styles.cola}>
                    <div className={styles.colatxt}>Cola</div>
                </div>
            </div>
        </div>
    );
};

export default Listen;