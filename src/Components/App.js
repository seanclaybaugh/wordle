import React, { useState, createContext }from 'react';
import '../styles.css';
import Board from './Board';
import Keyboard from './Keyboard';
import { boardDefault } from '../Words';
export const AppContext = createContext();


const App = () => {
  const [board, setBoard] = useState(boardDefault);
  return (
    <div className="App">
      <nav>
        <h1>Wordle Clone</h1>
      </nav>
      <AppContext.Provider value={{ board, setBoard }}>
        <Board />
        <Keyboard />
      </AppContext.Provider>
    </div>
  );
}

export default App;