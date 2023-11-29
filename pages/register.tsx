import react from "react";
import styles from "./register.module.css";
import ViniloComponent from "./viniloComponent";
import { useRouter } from "next/router";
import { useState } from "react";

const RegisterPage: React.FC = () => {
  const router = useRouter();

  const change = (event: React.FormEvent) => {
    event.preventDefault();
    router.push("/login");
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password, confirmPassword }),
      });

      if (response.ok) {
        alert("Usuario registrado correctamente");
        setName("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        router.push("/login");
      } else {
        const data = await response.json();
        throw new Error(
          data.error || "Ocurrió un error al registrar el usuario"
        );
      }
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
      alert("Ocurrió un error al registrar el usuario");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.vinilo}>
        <ViniloComponent />
      </div>
      <img className={styles.lengueta2} src="lenguetaCaja2.svg"></img>
      <div className={styles.formContainer}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <img className={styles.login} src="Logo.png"></img>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="name">
              Username
            </label>
            <input
              className={styles.input}
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="email">
              Email
            </label>
            <input
              className={styles.input}
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="password">
              Contraseña
            </label>
            <input
              className={styles.input}
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label className={styles.label} htmlFor="confirmPassword">
              Confirmar contraseña
            </label>
            <input
              className={styles.input}
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className={styles.forgotPassword}>
            <a href="#">Recuperar Contraseña</a>
          </div>
          <button className={styles.submitbtn} type="submit">
            Register
          </button>
        </form>
        <form className={styles.registerContainer} onSubmit={change}>
          <span className={styles.registerText}>Ya tenes una cuenta?</span>
          <button className={styles.registerLink}>Loguéate</button>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
