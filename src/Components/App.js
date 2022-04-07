import React, { useEffect, useState, createContext, useCallback } from 'react';
import '../styles.css';
import axios from 'axios';
import Board from './Board';
import Keyboard from './Keyboard';
import { boardDefault } from '../Words';
export const AppContext = createContext();
const API_KEY = process.env.REACT_APP_WORD_GENERATOR_KEY


/*
TODOS:
- Check word validity on enter
- End game Lose consdition
- Keys color change
- Get green to show on Win condition
*/

const App = () => {
  const [currAttempt, setCurrAttempt] = useState({attempt: 0, letterPos: 0})
  const [board, setBoard] = useState(boardDefault());
  const [answer, setAnswer] = useState("RIGHT");
  const [wordIndex, setWordIndex] = useState({words:[], index:0});

  useEffect(async ()=> {
    const options = {
      method: "GET",
      url: "https://random-words5.p.rapidapi.com/getMultipleRandom",
      params: { count: "20", wordLength: "5" },
      headers: {
        "X-RapidAPI-Host": "random-words5.p.rapidapi.com",
        "X-RapidAPI-Key": API_KEY,
      },
    };
    const words = await axios.request(options)
    console.log(words.data)
    setWordIndex({index: 0, words: words.data})
    setAnswer(words.data[wordIndex.index].toUpperCase())
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
      setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });

      setTimeout(()=>{
        alert("Good job buddy!");
        setBoard(boardDefault())
        setCurrAttempt({ attempt: 0, letterPos: 0 });
        setWordIndex({...wordIndex, index: wordIndex.index+1})
        setAnswer(wordIndex.words[wordIndex.index + 1].toUpperCase());
      }, 100);

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