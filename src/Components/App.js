import React, { useEffect, useState, createContext, useCallback } from 'react';
import '../styles.css';
import Board from './Board';
import Keyboard from './Keyboard';
import { boardDefault } from '../Words';
export const AppContext = createContext();


const App = () => {
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0})
  const [board, setBoard] = useState(boardDefault);
  const [answer, setAnswer] = useState("right")


  const onSelectLetter = (keyVal) => {
     if (currAttempt.letterPos > 4) return;
    const newBoard = [...board]
    newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
    setBoard(newBoard)
    setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos + 1});
    }

  const onDelete = () => {
    if (currAttempt.letterPos === 0) return;
    const newBoard = [...board];
    newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
    setBoard(newBoard);
    setCurrAttempt({
      ...currAttempt,
      letterPos: currAttempt.letterPos -1,
    });
  }

  const onEnter = () => {
    if (currAttempt.letterPos !== 5) return;

    setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
  }


  return (
    <div className="App">
      <nav>
        <h1>Wordle Clone</h1>
      </nav>

      <AppContext.Provider value={{ board, setBoard, currAttempt, setCurrAttempt, onEnter, onDelete, onSelectLetter, answer }}>
        <div className="game">
          <Board />
          <Keyboard />
        </div>
      </AppContext.Provider>

    </div>
  );
}

export default App;