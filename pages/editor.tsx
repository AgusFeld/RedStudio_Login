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

  const selectedRowsArray = [
    selectedRows1,
    selectedRows2,
    selectedRows3,
    selectedRows4,
    selectedRows5,
  ];

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

  const [isMuteToggled, setIsMuteToggled] = useState(false);
  const [isSelect3Toggled, setIsSelect3Toggled] = useState(false);

  const handleMuteToggle = () => {
    setIsMuteToggled(!isMuteToggled);
    setIsSelect3Toggled(false); // Deselect Auriculares
  };

  const handleSelect3Toggle = () => {
    setIsSelect3Toggled(!isSelect3Toggled);
    setIsMuteToggled(false); // Deselect Mute
  };

  const muteClass = isMuteToggled ? `${styles.mute} ${styles.redBackground}` : styles.mute;
  const selectbtn3Class = isSelect3Toggled ? `${styles.selectbtn} ${styles.redBackground}` : styles.selectbtn;

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [songName, setSongName] = useState("");
  const [songGenre, setSongGenre] = useState("");

  const openForm = () => {
    setIsFormVisible(true);
  };

  const closeForm = () => {
    setIsFormVisible(false);
  };

  const handleSongNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSongName(event.target.value);
  };
  
  const handleSongGenreChange = (event: React.ChangeEvent) => {
    setSongGenre((event.target as HTMLSelectElement).value);
  }; 

  const handleSaveAndConvert = async () => {
    try {
      const response = await fetch('/api/musicUpload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ selectedRows1, selectedRows2, selectedRows3, selectedRows4, selectedRows5 }),
      });
    } catch (error) {
      console.error('Error al guardar:', error);
      alert('Ocurrió un error al guardar');
    }
    closeForm();
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <button>
          <img src="backbtn.png" alt="" />
        </button>
        <button onClick={playMusicTrack} className={styles.play}>
          <img src="playbtn.png" alt="" />
        </button>
        <button>
          <img src="forwardbtn.png" alt="" />
        </button>
      </div>
      <div className={styles.blank}>
        <div className={styles.black}></div>
        <div className={styles.grey}></div>
      </div>
      <div className={styles.formContainer}>
        <div className={styles.create}>
          <img src="tambor.png" alt="" />
          <div className={styles.options}>
            <button className={muteClass} onClick={handleMuteToggle}>
              M
            </button>
            <div className={styles.select}>
              <button className={styles.trash} onClick={() => {
                setSelectedRows1(Array.from({ length: 40 }, () => null));
              }}>
                <img src="trash.png" alt="" />
              </button>
              <button className={styles.trash} onClick={() => {
                setSelectedRows2([...selectedRows1]); // Update the state immediately
              }}>
                <img src="copy.png" alt="" />
              </button>
              <button className={selectbtn3Class} onClick={handleSelect3Toggle}>
                <img src="auriculares.png" alt="" />
              </button>
            </div>
          </div>
        </div>
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
        <div className={styles.create}>
          <img src="guitarra.png" alt="" />
          <div className={styles.options}>
            <button className={muteClass} onClick={handleMuteToggle}>
              M
            </button>
            <div className={styles.select}>
              <button className={styles.trash} onClick={() => {
                setSelectedRows2(Array.from({ length: 40 }, () => null));
              }}>
                <img src="trash.png" alt="" />
              </button>
              <button className={styles.trash} onClick={() => {
                setSelectedRows3([...selectedRows2]); // Update the state immediately
              }}>
                <img src="copy.png" alt="" />
              </button>
              <button className={selectbtn3Class} onClick={handleSelect3Toggle}>
                <img src="auriculares.png" alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.gridItem}>
          {Array.from({ length: 40 }, (_, colIndex) => (
            <div key={colIndex} className={styles.column}>
              {Array.from({ length: 6 }, (_, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`${styles.cell} ${selectedRows2[colIndex] === rowIndex ? styles.selected2 : ""}`}
                  onClick={() => handleRowSelect(setSelectedRows2, colIndex, rowIndex)}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.create}>
          <img src="teclado.png" alt="" />
          <div className={styles.options}>
            <button className={muteClass} onClick={handleMuteToggle}>
              M
            </button>
            <div className={styles.select}>
              <button className={styles.trash} onClick={() => {
                setSelectedRows3(Array.from({ length: 40 }, () => null));
              }}>
                <img src="trash.png" alt="" />
              </button>
              <button className={styles.trash} onClick={() => {
                setSelectedRows4([...selectedRows3]); // Update the state immediately
              }}>
                <img src="copy.png" alt="" />
              </button>
              <button className={selectbtn3Class} onClick={handleSelect3Toggle}>
                <img src="auriculares.png" alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.gridItem}>
          {Array.from({ length: 40 }, (_, colIndex) => (
            <div key={colIndex} className={styles.column}>
              {Array.from({ length: 6 }, (_, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`${styles.cell} ${selectedRows3[colIndex] === rowIndex ? styles.selected3 : ""}`}
                  onClick={() => handleRowSelect(setSelectedRows3, colIndex, rowIndex)}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.create}>
          <img src="platillos.png" alt="" />
          <div className={styles.options}>
            <button className={muteClass} onClick={handleMuteToggle}>
              M
            </button>
            <div className={styles.select}>
              <button className={styles.trash} onClick={() => {
                setSelectedRows4(Array.from({ length: 40 }, () => null));
              }}>
                <img src="trash.png" alt="" />
              </button>
              <button className={styles.trash} onClick={() => {
                setSelectedRows5([...selectedRows4]); // Update the state immediately
              }}>
                <img src="copy.png" alt="" />
              </button>
              <button className={selectbtn3Class} onClick={handleSelect3Toggle}>
                <img src="auriculares.png" alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.gridItem}>
          {Array.from({ length: 40 }, (_, colIndex) => (
            <div key={colIndex} className={styles.column}>
              {Array.from({ length: 6 }, (_, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`${styles.cell} ${selectedRows4[colIndex] === rowIndex ? styles.selected4 : ""}`}
                  onClick={() => handleRowSelect(setSelectedRows4, colIndex, rowIndex)}
                ></div>
              ))}
            </div>
          ))}
        </div>
        <div className={styles.create}>
          <img src="guitarra.png" alt="" />
          <div className={styles.options}>
            <button className={muteClass} onClick={handleMuteToggle}>
              M
            </button>
            <div className={styles.select}>
              <button className={styles.trash} onClick={() => {
                setSelectedRows5(Array.from({ length: 40 }, () => null));
              }}>
                <img src="trash.png" alt="" />
              </button>
              <button className={styles.trash} onClick={() => {
                setSelectedRows4([...selectedRows5]); // Update the state immediately
              }}>
                <img src="copy.png" alt="" />
              </button>
              <button className={selectbtn3Class} onClick={handleSelect3Toggle}>
                <img src="auriculares.png" alt="" />
              </button>
            </div>
          </div>
        </div>
        <div className={styles.gridItem}>
          {Array.from({ length: 40 }, (_, colIndex) => (
            <div key={colIndex} className={styles.column}>
              {Array.from({ length: 6 }, (_, rowIndex) => (
                <div
                  key={rowIndex}
                  className={`${styles.cell} ${selectedRows5[colIndex] === rowIndex ? styles.selected5 : ""}`}
                  onClick={() => handleRowSelect(setSelectedRows5, colIndex, rowIndex)}
                ></div>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.save}>
        <button className={styles.submitbtn} onClick={openForm}>Save</button>
      </div>
      {isFormVisible && (
        <div className={styles.convert}>
          <div className={styles.form}>
            <input
              className={styles.input}
              type="text"
              placeholder="Nombre de la cancion"
              value={songName}
              onChange={handleSongNameChange}
            />
            <select
              className={styles.input}
              value={songGenre}
              onChange={handleSongGenreChange}
            >
              <option value="" disabled>
                Selecciona un género
              </option>
              <option value="rock">Rock</option>
              <option value="pop">Pop</option>
              <option value="electronica">Electronica</option>
              {/* Agrega más opciones según tus necesidades */}
            </select>
            <button className={styles.convertbtn} onClick={handleSaveAndConvert}>
              Save and Convert
            </button>
          </div>
        </div>
      )}
    </div>      
  );
};

export default Editor;
