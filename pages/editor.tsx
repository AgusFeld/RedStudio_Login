import React, { useState } from "react";
import styles from "./editor.module.css";
import { Howl, Howler } from "howler";

const Editor: React.FC = () => {
  // Estado para almacenar las filas seleccionadas en la cuadrícula
  const [selectedRows, setSelectedRows] = useState<Array<number | null>>(
    Array.from({ length: 40 }, () => null) // Inicialmente todas las filas están deseleccionadas (null)
  );

  // Definir los sonidos disponibles para cada fila
  const sounds = [
    "sound1.mp3",
    "sound2.mp3",
    "sound3.mp3",
    "sound4.mp3",
    "sound5.mp3",
    "sound6.mp3"
  ];

  // Manejar la selección de filas en la cuadrícula
  const handleRowSelect = (colIndex: number, rowIndex: number) => {
    // Crear una copia del array selectedRows
    const newSelectedRows = [...selectedRows];
    // Establecer la fila seleccionada en la posición colIndex
    newSelectedRows[colIndex] = rowIndex;
    // Actualizar el estado selectedRows con la nueva selección
    setSelectedRows(newSelectedRows);
  };

  // Función para convertir los valores de las celdas en nombres de sonido
  const convertCellsToSounds = () => {
    // Mapear las filas seleccionadas a nombres de archivo de sonido
    const selectedSounds = selectedRows.map((rowIndex) => {
      // Verificar si rowIndex es válido y dentro de los límites de sounds
      if (rowIndex !== null && rowIndex >= 0 && rowIndex < sounds.length) {
        return sounds[rowIndex]; // Devolver el nombre del sonido correspondiente
      }
      return ""; // Devolver una cadena vacía si no hay una selección válida
    });
    return selectedSounds; // Devolver un array de nombres de sonido
  };

  // Función para reproducir la pista de música
  const playMusicTrack = () => {
    const selectedSounds = convertCellsToSounds(); // Obtener los nombres de sonido seleccionados

    // Crear un array para almacenar objetos Howl para cada sonido seleccionado
    const soundObjects = selectedSounds.map((soundFile) => new Howl({ src: [soundFile] }));
    
    // Función para reproducir los sonidos secuencialmente
    const playNextSound = (index: number) => {
      // Verificar si index está dentro de los límites del array soundObjects
      if (index < soundObjects.length) {
        soundObjects[index].play(); // Reproducir el sonido en la posición index
        // Configurar un evento "end" para reproducir el siguiente sonido cuando el actual termine
        soundObjects[index].on("end", () => {
          playNextSound(index + 1);
        });
      }
    };
    
    playNextSound(0); // Comenzar a reproducir el primer sonido en la secuencia
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}></div>
      <div className={styles.blank}>
        <div className={styles.black}></div>
        <div className={styles.grey}></div>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.create}>1</div>
        <div className={styles.gridItem}>
          {Array.from({ length: 40 }, (_, colIndex) => (
            <div key={colIndex} className={styles.column}>
              {Array.from({ length: 6 }, (_, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`${styles.cell} ${
                    selectedRows[colIndex] === rowIndex ? styles.selected : ""
                  }`}
                  onClick={() => handleRowSelect(colIndex, rowIndex)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <button onClick={playMusicTrack}>Play Music Track</button>
    </div>
  );
};

export default Editor;
