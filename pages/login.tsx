import React from "react";
import { useRouter } from "next/router";
import styles from "./Login.module.css";
import ViniloComponent from "./viniloComponent";

const LoginPage: React.FC = () => {
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push("/register");
  };

    return (
      <div className={styles.container}>
        <img className={styles.lengueta} src="lenguetaCaja.svg"></img>
        <div className={styles.containerVinilo}>
          <ViniloComponent />
        </div>
        <div className={styles.formContainer}>
          <form className={styles.form}>
            <img className={styles.login} src="Logo.png"></img>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="username">
                Usuario
              </label>
              <input className={styles.input} type="text" name="username" />
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="password">
                Contraseña
              </label>
              <input className={styles.input} type="password" name="password" />
            </div>
            <div className={styles.forgotPassword}>
              <a href="#">Recuperar Contraseña</a>
            </div>
            <button className={styles.submitbtn}>
              Login
            </button>
          </form>
          <form className={styles.registerContainer}  onSubmit={handleSubmit}>
            <span className={styles.registerText}>
              No tenes una cuenta?
            </span>
            <button className={styles.registerLink} type="submit">
              Registrate
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default LoginPage;