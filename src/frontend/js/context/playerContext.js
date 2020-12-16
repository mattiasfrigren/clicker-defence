import React, { createContext, useEffect, useState, } from "react";
import dataService from '../../../backend/firebase/firebaseService';
export const PlayerContext = createContext();

export default ({ children }) => {

  const [playerHealth, setPlayerHealth] = useState(10);
  const [playerGold, setPlayerGold] = useState(0);

  

function getPlayerValue(setAttribute, key, attribute) {
  dataService.getPlayerAttribute(key,attribute).on("value", snap =>{
    setAttribute(snap.val());
  });
}

function setPlayerAttribute(newAttribute) {
  
    dataService.update("admin",newAttribute)
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
          
        }}
      >
        {children}
      </PlayerContext.Provider>
    </div>
  );
};
