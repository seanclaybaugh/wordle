import React, { useContext, useEffect } from 'react'
import { AppContext } from './App'


function Key({keyVal, bigKey}) {
  const { onEnter, onDelete, onSelectLetter, letterStatus } = useContext(AppContext);

  const selectLetter = () => {
    if (keyVal === "ENTER") {
      onEnter();
    } else if (keyVal === "DELETE") {
      onDelete();
    } else {
      onSelectLetter(keyVal);
    }
  }


  return (
  <div className={bigKey ? "key big":"key"} id={letterStatus[keyVal]} onClick={selectLetter}>
    {keyVal}
  </div>
  )
}

export default Key