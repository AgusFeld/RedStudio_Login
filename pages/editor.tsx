import React, { useState } from "react";
import styles from "./editor.module.css";

const Editor: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<Array<number | null>>(
    Array.from({ length: 10 }, () => null)
  );

  // Define the available sounds for each row
  const sounds = ["sound1.mp3", "sound2.mp3", "sound3.mp3", "sound4.mp3", "sound5.mp3", "sound6.mp3"];

  // Handle row selection
  const handleRowSelect = (colIndex: number, rowIndex: number) => {
    const newSelectedRows = [...selectedRows];
    newSelectedRows[colIndex] = rowIndex;
    setSelectedRows(newSelectedRows);
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
        {Array.from({ length: 4 }, (_, colIndex) => (
        <div key={colIndex} className={styles.gridItem}>
          {Array.from({ length: 10 }, (_, colIndex) => (
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
        ))}
      </div>
    </div>
  );
};

export default Editor;