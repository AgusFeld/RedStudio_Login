import React from "react";
import { useRouter } from "next/router";
import styles from "./landing.module.css"
import Boton from "./botonComponent"

const Landing: React.FC = () => {
    const router = useRouter();

    const signUp = (event: React.FormEvent) => {
        event.preventDefault();
        router.push("/register");
      };
    
    const signIn = (event: React.FormEvent) => {
        event.preventDefault();
        router.push("/login");
      };

    return(
        <div className={styles.container}>
            <div className={styles.bar}>
                <img className={styles.logo} src="Logo.png"></img>
                <div className={styles.div2}>
                    <a href="#">
                        <button className={styles.text}>
                            Create Music
                        </button>
                    </a>
                </div>
                <div className={styles.div3}>
                    <a href="login">
                        <button className={styles.text1}>
                            Sign In
                        </button>
                    </a>
                </div>
                <div className={styles.div1}>
                    <a href="register">
                        <button className={styles.boton}>
                            Sign Up
                        </button>
                    </a>
                </div> 
            </div>
            <div className={styles.background}>
                <img className={styles.img1} src="img1.png"></img>
                <div className={styles.div4}>
                    <a href="#">
                        <button className={styles.btn}>
                            Create Music
                        </button>
                    </a>
                </div>
                <img className={styles.img2} src="img2.png"></img>
                <img className={styles.img3} src="img3.png" />
                <img className={styles.img4} src="img4.png" />
                <img className={styles.img5} src="img5.png" />
                <img className={styles.img6} src="img6.png" />
            </div>
            <div className={styles.foot}></div>
        </div>
    );
};

export default Landing;