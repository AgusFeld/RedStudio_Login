import React from "react";
import { useRouter } from "next/router";
import styles from "./generate.module.css"

const Generate: React.FC = () => {

    return(
        
        <div className = {styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.title}>
                    <img className={styles.logo} src="Logo.png"></img>
                </div>
                <div className={styles.botones}>
                    <div className={styles.column}>
                        <select required className={styles.btn} placeholder="Género">
                            <option value="" disabled selected hidden>Género</option>
                            <option value="">Pop</option>
                            <option value="">Rock</option>
                            <option value="">Electrónica</option>
                        </select>
                        <button className={styles.btn}>Duración</button>
                        <button className={styles.btn}>Escala</button>
                    </div>
                    <div className={styles.column}>
                        <button className={styles.btn}>Instrumentos</button>
                        <button className={styles.btn}>Tempo</button>
                        <button className={styles.btn}>Segundo Género</button>
                    </div>
                </div>
                <div className={styles.title}>
                    <button className={styles.submit}>Generar</button>
                </div>
            </div>
        </div>

    );
};

export default Generate;