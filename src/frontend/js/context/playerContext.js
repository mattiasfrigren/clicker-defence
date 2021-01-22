import React, { createContext, useState } from "react";
import dataService from "../../../backend/firebase/firebaseService";
export const PlayerContext = createContext();

export default ({ children }) => {
  const [playerHealth, setPlayerHealth] = useState(10);
  const [playerGold, setPlayerGold] = useState(0);
  const [isThunder, setIsThunder] = useState(false);
  const [criticalChance, setCriticalChance] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [corruption, setCorruption] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);

  function getPlayerValue(setAttribute, attribute) {
    dataService
      .getPlayerAttribute(dataService.firebaseAuth().currentUser.uid, attribute)
      .on("value", (snap) => {
        setAttribute(snap.val());
      });
  }

  function setPlayerAttribute(newAttribute) {
    dataService.update(
      dataService.firebaseAuth().currentUser.uid,
      newAttribute
    );
  }
  function setPlayerItemAttribute( itemToUpdate,newAttribute){
    dataService.updateItemValues(
      dataService.firebaseAuth().currentUser.uid,itemToUpdate,
      newAttribute
    );
  }
  function resetPlayerValues(){
    dataService.resetValues(dataService.firebaseAuth().currentUser.uid);
  }

  return (
    <div>
      <PlayerContext.Provider
        value={{
          getPlayerValue,
          setPlayerAttribute,
          playerHealth,
          setPlayerHealth,
          playerGold,
          setPlayerGold,
          isThunder,
          setIsThunder,
          criticalChance,
          setCriticalChance,
          isGameRunning,
          setIsGameRunning,
          setPlayerItemAttribute,
          corruption,
          setCorruption,
          isGameOver,
          setIsGameOver,
          resetPlayerValues,
        }}
      >
        {children}
      </PlayerContext.Provider>
    </div>
  );
};
