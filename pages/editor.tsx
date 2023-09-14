import React, { useState } from "react";
import styles from "./editor.module.css";
import { Howl, Howler } from "howler";

const Editor: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<Array<number | null>>(
    Array.from({ length: 40 }, () => null) // Adjust the length to match the number of columns
  );

  // Define the available sounds for each row
  const sounds = [
    "sound1.mp3",
    "sound2.mp3",
    "sound3.mp3",
    "sound4.mp3",
    "sound5.mp3",
    "sound6.mp3"
  ];

  // Handle row selection
  const handleRowSelect = (colIndex: number, rowIndex: number) => {
    const newSelectedRows = [...selectedRows];
    newSelectedRows[colIndex] = rowIndex;
    setSelectedRows(newSelectedRows);
  };

  // Function to convert cell values into sounds
  const convertCellsToSounds = () => {
    const selectedSounds = selectedRows.map((rowIndex) => {
      if (rowIndex !== null && rowIndex >= 0 && rowIndex < sounds.length) {
        return sounds[rowIndex];
      }
      return ""; // You can replace this with a default sound if needed
    });
    return selectedSounds;
  };

  // Function to play music track
  const playMusicTrack = () => {
    const selectedSounds = convertCellsToSounds();

    // Create an array to store Howl objects for each selected sound
    const soundObjects = selectedSounds.map((soundFile) => new Howl({ src: [soundFile] }));
    
    // Play the sounds sequentially
    const playNextSound = (index: number) => {
      if (index < soundObjects.length) {
        soundObjects[index].play();
        soundObjects[index].on("end", () => {
          playNextSound(index + 1); // Play the next sound when the current sound ends
        });
      }
    };
    
    playNextSound(0); // Start playing the first sound
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
