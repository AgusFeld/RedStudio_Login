import React from "react";
import styles from "./LoginPage.module.css";
import Image from "next/image";
import logo from "../public/RedStudio.png"

const LoginPage: React.FC = () => {
  
  return (
    <div className={styles.container}>
      <div className={styles.ball}></div>
      <div className={styles.ball1}></div>
      <div className={styles.ball2}></div>
      <div className={styles.ball3}></div>
      <div className={styles.formContainer}>
        <form className={styles.form}>
          <img className={styles.logo} src= './Logo.png' alt="Logo" />
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
          <button className={styles.submitButton} type="submit">
            Login
          </button>
        </form>
        <div className={styles.registerContainer}>
          <span className={styles.registerText}>
            No tenes una cuenta?
          </span>
          <a href="#" className={styles.registerLink}>
            Registrate
          </a>
        </div>
      </div>
      <div className={styles.background} />
    </div>
  );
};

export default LoginPage;