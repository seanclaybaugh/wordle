import React, { useEffect, useState, createContext, useCallback } from 'react';
import '../styles.css';
import axios from 'axios';
import Board from './Board';
import Keyboard from './Keyboard';
import { boardDefault } from '../Words';
export const AppContext = createContext();
const API_KEY = process.env.REACT_APP_WORD_GENERATOR_KEY


const App = () => {
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0})
  const [board, setBoard] = useState(boardDefault());
  const [answer, setAnswer] = useState("RIGHT");

  useEffect(async ()=> {
    // const options = {
    //   method: "GET",
    //   url: "https://random-words5.p.rapidapi.com/getMultipleRandom",
    //   params: { count: "5", wordLength: "5" },
    //   headers: {
    //     "X-RapidAPI-Host": "random-words5.p.rapidapi.com",
    //     "X-RapidAPI-Key": API_KEY,
    //   },
    // };
    // const words = await axios.request(options)
    // console.log(words.data)
    // setAnswer(words.data[0].toUpperCase())
  }, [])

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
    let currentWord = board[currAttempt.attempt].join('')

    if (currentWord === answer) {
      alert("Good job buddy! You so smart!");
      setBoard(boardDefault())
      setCurrAttempt({ attempt: 0, letterPos: 0 });
    } else {
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
    }


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