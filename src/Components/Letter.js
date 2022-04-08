import React, {useContext, useEffect} from 'react'
import { AppContext } from './App'

function Letter({letterPos, attemptVal}) {
  const { board, answer, currAttempt, setLetterStatus, letterStatus } = useContext(AppContext);

  const letter = board[attemptVal][letterPos]

  const correct = answer.toUpperCase()[letterPos] === letter;
  const almost = !correct && letter !== "" && answer.toUpperCase().includes(letter)
  const letterState =
  currAttempt.attempt > attemptVal &&
  (correct ? "correct" : almost ? "almost" : "error");


  return (
    <div className="letter" id={letterState || ''}>{letter}</div>
  )
}

export default Letter;