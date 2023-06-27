import react from "react";
import styles from "./register.module.css";
import ViniloComponent from "./viniloComponent";
import { useRouter } from "next/router";

const RegisterPage: React.FC = () => {
    const router = useRouter();

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      router.push("/");
    };

        return (
            <div className={styles.container}>
                <div className={styles.vinilo}>
                    <ViniloComponent />
                </div>
                <img className={styles.lengueta2} src="lenguetaCaja2.svg"></img>
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
                        <div className={styles.inputGroup}>
                            <label className={styles.label} htmlFor="password">
                                Confirmar contraseña
                            </label>
                            <input className={styles.input} type="password" name="password" />
                        </div>
                        <div className={styles.forgotPassword}>
                            <a href="#">Recuperar Contraseña</a>
                        </div>
                        <button className={styles.submitbtn}>
                            Register
                        </button>
                    </form>
                    <form className={styles.registerContainer} onSubmit={handleSubmit}>
                        <span className={styles.registerText}>
                            Ya tenes una cuenta?
                        </span>
                        <button className={styles.registerLink} type="submit">
                            Loguéate
                        </button>
                    </form>
                </div>
            </div>
        )
}

export default RegisterPage