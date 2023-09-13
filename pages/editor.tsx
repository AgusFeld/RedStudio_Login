import React, { useState } from "react";
import styles from "./editor.module.css";

const Editor: React.FC = () => {
  const [selectedRows, setSelectedRows] = useState<Array<number | null>>(
    Array.from({ length: 40 }, () => null) // Adjust the length to match the number of columns
  );

  // Define the available sounds for each row
  const sounds = ["sound1.mp3", "sound2.mp3", "sound3.mp3", "sound4.mp3", "sound5.mp3", "sound6.mp3"];

  // Handle row selection
  const handleRowSelect = (colIndex: number, rowIndex: number) => {
    const newSelectedRows = [...selectedRows];
    newSelectedRows[colIndex] = rowIndex;
    setSelectedRows(newSelectedRows);
  };

  // Function to save the selected cells
  const saveSelectedCells = () => {
    // Filter out null values (unselected cells)
    const selectedCells = selectedRows.filter((rowIndex) => rowIndex !== null);

    // Now, you can send the selectedCells data to your backend
    // For example, you can make an API call or include it in a form submission
    // Replace the following line with your backend communication code
    console.log("Selected Cells:", selectedCells);
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
      <button onClick={saveSelectedCells}>Save Selected Cells</button>
    </div>
  );
};

export default Editor;
