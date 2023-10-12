import React, { useState } from "react";
import styles from "./editor.module.css";
import { Howl, Howler } from "howler";

const Editor: React.FC = () => {
  // Estado para almacenar las filas seleccionadas en la cuadrícula
  const [selectedRows1, setSelectedRows1] = useState<Array<number | null>>(
    Array.from({ length: 40 }, () => null)
  );
  const [selectedRows2, setSelectedRows2] = useState<Array<number | null>>(
    Array.from({ length: 40 }, () => null)
  );
  const [selectedRows3, setSelectedRows3] = useState<Array<number | null>>(
    Array.from({ length: 40 }, () => null)
  );
  const [selectedRows4, setSelectedRows4] = useState<Array<number | null>>(
    Array.from({ length: 40 }, () => null)
  );
  const [selectedRows5, setSelectedRows5] = useState<Array<number | null>>(
    Array.from({ length: 40 }, () => null)
  );

  // Definir los sonidos disponibles para cada fila
  const sounds = [
    "sound1.mp3",
    "sound2.mp3",
    "sound3.mp3",
    "sound4.mp3",
    "sound5.mp3",
    "sound6.mp3",
  ];

  const handleRowSelect = (setSelectedRows: React.Dispatch<React.SetStateAction<(number | null)[]>>, colIndex: number, rowIndex: number) => {
    setSelectedRows((prevSelectedRows) => {
      prevSelectedRows[colIndex] = rowIndex;
      return [...prevSelectedRows];
    });
  };
  

  // Función para convertir los valores de las celdas en nombres de sonido
  const convertCellsToSounds = (selectedRows: Array<number | null>) => {
    const selectedSounds = selectedRows.map((rowIndex) => {
      if (rowIndex !== null && rowIndex >= 0 && rowIndex < sounds.length) {
        return sounds[rowIndex];
      }
      return "";
    });
    return selectedSounds;
  };

  // Función para reproducir la pista de música
  const playMusicTrack = () => {
    const selectedSounds1 = convertCellsToSounds(selectedRows1);
    const selectedSounds2 = convertCellsToSounds(selectedRows2);
    const selectedSounds3 = convertCellsToSounds(selectedRows3);
    const selectedSounds4 = convertCellsToSounds(selectedRows4);
    const selectedSounds5 = convertCellsToSounds(selectedRows5);

    // Create Howl objects for each sound selected
    const soundObjects1 = selectedSounds1.map((soundFile) => new Howl({ src: [soundFile] }));
    const soundObjects2 = selectedSounds2.map((soundFile) => new Howl({ src: [soundFile] }));
    const soundObjects3 = selectedSounds3.map((soundFile) => new Howl({ src: [soundFile] }));
    const soundObjects4 = selectedSounds4.map((soundFile) => new Howl({ src: [soundFile] }));
    const soundObjects5 = selectedSounds5.map((soundFile) => new Howl({ src: [soundFile] }));

    // Function to play sounds sequentially
    const playNextSound = (soundObjects: Howl[], index: number) => {
      if (index < soundObjects.length) {
        soundObjects[index].play();
        soundObjects[index].on("end", () => {
          playNextSound(soundObjects, index + 1);
        });
      }
    };

    playNextSound(soundObjects1, 0);
    playNextSound(soundObjects2, 0);
    playNextSound(soundObjects3, 0);
    playNextSound(soundObjects4, 0);
    playNextSound(soundObjects5, 0);
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
                  className={`${styles.cell} ${selectedRows1[colIndex] === rowIndex ? styles.selected : ""}`}
                  onClick={() => handleRowSelect(setSelectedRows1, colIndex, rowIndex)}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.create}>2</div>
        <div className={styles.gridItem}>
          {Array.from({ length: 40 }, (_, colIndex) => (
            <div key={colIndex} className={styles.column}>
              {Array.from({ length: 6 }, (_, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`${styles.cell} ${selectedRows2[colIndex] === rowIndex ? styles.selected : ""}`}
                  onClick={() => handleRowSelect(setSelectedRows2, colIndex, rowIndex)}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.create}>3</div>
        <div className={styles.gridItem}>
          {Array.from({ length: 40 }, (_, colIndex) => (
            <div key={colIndex} className={styles.column}>
              {Array.from({ length: 6 }, (_, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`${styles.cell} ${selectedRows3[colIndex] === rowIndex ? styles.selected : ""}`}
                  onClick={() => handleRowSelect(setSelectedRows3, colIndex, rowIndex)}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.create}>4</div>
        <div className={styles.gridItem}>
          {Array.from({ length: 40 }, (_, colIndex) => (
            <div key={colIndex} className={styles.column}>
              {Array.from({ length: 6 }, (_, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`${styles.cell} ${selectedRows4[colIndex] === rowIndex ? styles.selected : ""}`}
                  onClick={() => handleRowSelect(setSelectedRows4, colIndex, rowIndex)}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.create}>5</div>
        <div className={styles.gridItem}>
          {Array.from({ length: 40 }, (_, colIndex) => (
            <div key={colIndex} className={styles.column}>
              {Array.from({ length: 6 }, (_, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`${styles.cell} ${selectedRows5[colIndex] === rowIndex ? styles.selected : ""}`}
                  onClick={() => handleRowSelect(setSelectedRows5, colIndex, rowIndex)}
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
