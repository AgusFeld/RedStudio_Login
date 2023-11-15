import React, { useState } from 'react';
import { useRouter } from "next/router";
import styles from "./home.module.css"

const Home: React.FC = () => {

    const [selectedImages, setSelectedImages] = useState([false, false, false, false, false]);

    const toggleSelect = (index : any) => {
        const updatedSelectedImages = [...selectedImages];
        updatedSelectedImages[index] = !selectedImages[index];
        setSelectedImages(updatedSelectedImages);
    };

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
                            <div className={styles.tick}>
                                {selectedImages.map((isSelected, index) => (
                                    <img
                                    key={index}
                                    className={styles.select}
                                    src={isSelected ? 'Select2.svg' : 'Select.svg'}
                                    onClick={() => toggleSelect(index)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={styles.buscador}>
                        <div className={styles.text}>
                            <div className={styles.aa}>Biblioteca</div>
                        </div>
                        <div className={styles.scroll}>
                            <div className={styles.overflowContainer}>
                                {/* Contenido que quieres que sea desplazable */}
                                <div className={styles.scrollableContent}>          
                                    <div className={styles.song}>
                                        <button className={styles.subtract}>
                                            <img src="Subtract.png" alt="" />
                                        </button>
                                    </div>
                                    <div className={styles.song}></div>
                                    <div className={styles.song}></div>
                                    <div className={styles.song}></div>
                                    <div className={styles.song}></div>
                                    <div className={styles.song}></div>
                                    <div className={styles.song}></div>
                                    <div className={styles.song}></div>
                                    <div className={styles.song}></div>
                                    <div className={styles.song}></div>
                                    <div className={styles.song}></div>
                                    <div className={styles.song}></div>
                                    <div className={styles.song}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default Home;