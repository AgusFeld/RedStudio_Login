import React from "react";
import { useState } from 'react';
import { useRouter } from "next/router";
import styles from "./Login.module.css";
import ViniloComponent from "./viniloComponent";
import { setAuthToken } from './api/auth';

const LoginPage: React.FC = () => {
  const router = useRouter();

  const change = (event: React.FormEvent) => {
    event.preventDefault();
    router.push("/register");
  };

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('https://red-studio-login-j8hu.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert('Inicio de sesión exitoso');
        setEmail('');
        setPassword('');

        const data = await response.json();
        const token: string = data.token;
        setAuthToken(token); // Almacena el token usando la función exportada
      }
      else {
        const data1 = await response.json();
        throw new Error(data1.error || 'Ocurrió un error al iniciar sesión');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      alert('Ocurrió un error al iniciar sesión');
    }
  };

    return (
      <div className={styles.container}>
        <img className={styles.lengueta} src="lenguetaCaja.svg"></img>
        <div className={styles.containerVinilo}>
          <ViniloComponent />
        </div>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <img className={styles.login} src="Logo.png"></img>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="email">
                Email
              </label>
              <input className={styles.input} 
                type="email" 
                id="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}/>
            </div>
            <div className={styles.inputGroup}>
              <label className={styles.label} htmlFor="password">
                Contraseña
              </label>
              <input className={styles.input}
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className={styles.forgotPassword}>
              <a href="#">Recuperar Contraseña</a>
            </div>
            <button className={styles.submitbtn} type="submit">
              Login
            </button>
          </form>
          <form className={styles.registerContainer} onSubmit={change}>
            <span className={styles.registerText}>
              No tenes una cuenta?
            </span>
            <button className={styles.registerLink}>
              Registrate
            </button>
          </form>
        </div>
      </div>
    );
  };
  
  export default LoginPage;