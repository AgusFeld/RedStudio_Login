import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import styles from "./home.module.css";
import axios from 'axios';

const Home: React.FC = () => {

    const [selectedImages, setSelectedImages] = useState([false, false, false, false, false]);
    const [songs, setSongs] = useState<Song[]>([]);
    const [filteredSongs, setFilteredSongs] = useState<Song[]>([]);
    const router = useRouter();


    const toggleSelect = (index: number) => {
        const updatedSelectedImages = [...selectedImages];
        updatedSelectedImages[index] = !selectedImages[index];
        setSelectedImages(updatedSelectedImages);
    
        const selectedGenres = updatedSelectedImages.reduce(
          (acc: string[], isSelected: boolean, i: number) => {
            if (isSelected) {
              // Map de índices a géneros según el orden establecido en la interfaz
              const genres = ['Jazz', 'Blues', 'Disco', 'Rock', 'Reggae'];
              acc.push(genres[i]);
            }
            return acc;
          },
          []
        );
    
        if (selectedGenres.length > 0) {
          const filteredSongs = songs.filter((song) => selectedGenres.includes(song.genre));
          setFilteredSongs(filteredSongs);
        } else {
          // Si no hay géneros seleccionados, mostrar todas las canciones
          setFilteredSongs(songs);
        }
      };

    interface Song {
        name: string;
        genre: string;
      }

    const fetchUserSongs = async () => {
        try {
        const response = await axios.get('/api/music'); // Ruta a tu API que devuelve las canciones del usuario
        if (response.data) {
            setSongs(response.data);
        }
        } catch (error) {
        console.error('Error fetching user songs:', error);
        }
    };

    useEffect(() => {
        // Llamar a la función para obtener las canciones del usuario cuando el componente se monte
        fetchUserSongs();
    }, []);

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
                                    {songs.map((song, index) => (
                                        <div key={index} className={styles.song}>
                                        <button className={styles.subtract}>
                                            <img src="Subtract.png" alt="" />
                                        </button>
                                        <div>Nombre: {song.name}</div>
                                        <div>Género: {song.genre}</div>
                                        </div>
                                    ))}
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