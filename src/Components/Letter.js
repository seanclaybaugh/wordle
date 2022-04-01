import React, {useContext} from 'react'
import { AppContext } from './App'

function Letter({letterPos, attemptVal}) {
  const { board, answer, currAttempt } = useContext(AppContext);

  const letter = board[attemptVal][letterPos]

  const correct = answer.toUpperCase()[letterPos] === letter;
  const almost = !correct && letter !== "" && answer.toUpperCase().includes(letter)
  const letterState =
  currAttempt.attempt > attemptVal &&
  (correct ? "correct" : almost ? "almost" : "error");

  return (
    <div className="letter" id={letterState.toString()}>{letter}</div>
  )
}

export default Letter