import React from "react";
import { useRouter } from "next/router";
import styles from "./home.module.css"

const Home: React.FC = () => {

    return(

        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.bar}>
                    <img className={styles.logo} src="Logo.png"></img>
                </div>
                <div className={styles.abajo}>
                    <div className={styles.filtro}></div>
                </div>
            </div>
        </div>

    );
};

export default Home;