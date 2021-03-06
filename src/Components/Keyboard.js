import React, { useCallback, useEffect, useContext } from 'react';
import Key from './Key';
import { AppContext } from './App';

function Keyboard() {

  const { onDelete, onEnter, onSelectLetter, letterStatus } = useContext(AppContext);

  const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
  const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
  const keys3 = ["Z", "X", "C", "V", "B", "N", "M"]

    const handleKeyboard = useCallback((event) => {
      if (event.key === "Enter") {
        onEnter();
      } else if (event.key === "Backspace") {
        onDelete();
      }
      if (event.key.length === 1 && event.key.match(/[a-z]/i)){
        onSelectLetter(event.key.toUpperCase())
      }
    });

    useEffect(() => {
      document.addEventListener("keydown", handleKeyboard);
      return () => {
        document.removeEventListener("keydown", handleKeyboard);
      };
    }, [handleKeyboard]);

  return (
    <div className="keyboard" onKeyDown={handleKeyboard}>
      <div className="line1">
        {keys1.map((key) => {
          return <Key keyVal={key} key={key} />;
        })}
      </div>
      <div className="line2">
        {keys2.map((key) => {
          return <Key keyVal={key} key={key} />;
        })}
      </div>
      <div className="line3">
        <Key keyVal={"ENTER"} bigKey={true} />
        {keys3.map((key) => {
          return <Key keyVal={key} key={key} />;
        })}
        <Key keyVal={"DELETE"} bigKey={true}/>
      </div>
    </div>
  );
}

export default Keyboard;