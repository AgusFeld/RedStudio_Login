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
                    <div className={styles.filtro}>
                        <div className={styles.text}>
                            <div className={styles.a}>Filtros</div>
                        </div>
                        <div className={styles.seleccionar}>
                            <div className={styles.elecciones}>
                                <h1 className={styles.b}>Jazz</h1>
                                <h1 className={styles.b}>Blues</h1>
                                <h1 className={styles.b}>Disco</h1>
                                <h1 className={styles.b}>Rock</h1>
                                <h1 className={styles.b}>Reggae</h1>
                            </div>
                            <div className={styles.tick}></div>
                        </div>
                    </div>
                    <div className={styles.buscador}></div>
                </div>
            </div>
        </div>

    );
};

export default Home;