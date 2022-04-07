import React, { useContext } from 'react'
import { AppContext } from './App'


function Key({keyVal, bigKey}) {
  const { onEnter, onDelete, onSelectLetter, answer, board, currAttempt } = useContext(AppContext);

  const selectLetter = () => {
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  }
  //const letterState =

  return (
  <div className={bigKey ? "key big":"key"} onClick={selectLetter}>
    {keyVal}
  </div>
  )
}

export default Key