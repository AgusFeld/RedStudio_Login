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
                        <div className={styles.customSelect}>
                            <select required className={styles.btn} placeholder="Género">
                                <option value="" disabled selected hidden>Género</option>
                                <option value="">Pop</option>
                                <option value="">Rock</option>
                                <option value="">Electrónica</option>
                            </select>
                            <img className={styles.img} src="parlante.svg"></img>
                        </div>
                        <div className={styles.customSelect}>
                            <select required className={styles.btn} placeholder="Género">
                                <option value="" disabled selected hidden>Duración</option>
                                <option value="">Pop</option>
                                <option value="">Rock</option>
                                <option value="">Electrónica</option>
                            </select>
                            <img className={styles.img} src="clock.svg"></img>
                        </div>
                        <div className={styles.customSelect}>
                            <select required className={styles.btn} placeholder="Género">
                                <option value="" disabled selected hidden>Escala</option>
                                <option value="">Pop</option>
                                <option value="">Rock</option>
                                <option value="">Electrónica</option>
                            </select>
                            <img className={styles.img} src="escala.svg"></img>
                        </div>
                    </div>
                    <div className={styles.column}>
                    <div className={styles.customSelect}>
                            <select required className={styles.btn} placeholder="Género">
                                <option value="" disabled selected hidden>Instrumentos</option>
                                <option value="">Pop</option>
                                <option value="">Rock</option>
                                <option value="">Electrónica</option>
                            </select>
                            <img className={styles.img} src="guitarra.svg"></img>
                        </div>
                        <div className={styles.customSelect}>
                            <select required className={styles.btn} placeholder="Género">
                                <option value="" disabled selected hidden>Tempo</option>
                                <option value="">Pop</option>
                                <option value="">Rock</option>
                                <option value="">Electrónica</option>
                            </select>
                            <img className={styles.img} src="metronomo.svg"></img>
                        </div>
                        <div className={styles.customSelect}>
                            <select required className={styles.btn} placeholder="Género">
                                <option value="" disabled selected hidden>2° Género</option>
                                <option value="">Pop</option>
                                <option value="">Rock</option>
                                <option value="">Electrónica</option>
                            </select>
                            <img className={styles.img} src="parlante.svg"></img>
                        </div>
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