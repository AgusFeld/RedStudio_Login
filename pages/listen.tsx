import React, { useState } from 'react';
import { useRouter } from "next/router";
import styles from "./listen.module.css";
import ViniloComponent from "./viniloComponent";

const Listen: React.FC = () => {

    return(
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.containerVinilo}>
                    <ViniloComponent />
                </div>
                <div className={styles.bar}></div>
                <img className={styles.loop} src="Loop.svg"/>
                <img className={styles.random} src="Random.svg"/>
                <div className={styles.interact}>
                    <img className={styles.img} src="Back.svg"/>
                    <img className={styles.play} src="Play.svg"/>
                    <img className={styles.img} src="Forward.svg"/>
                </div>
            </div>
        </div>
    );
};

export default Listen;