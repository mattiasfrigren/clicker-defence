import React, { createContext, useState, } from "react";
import dataService from '../../../backend/firebase/firebaseService';
export const PlayerContext = createContext();

export default ({ children }) => {

  const [playerHealth, setPlayerHealth] = useState(10);
  const [playerGold, setPlayerGold] = useState(0);
  const [isThunder, setIsThunder] = useState(false);
  const [criticalChance, setCriticalChance] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);

function getPlayerValue(setAttribute, key, attribute) {
  dataService.getPlayerAttribute(key,attribute).on("value", snap =>{
    setAttribute(snap.val());
  });
}

function setPlayerAttribute(newAttribute) {
  
    dataService.update("admin",newAttribute)
 }
 
 function createNewPlayer(data){

  const postTemplate ={
    name: data.userName,
    password: data.password,
    email: data.email,
    uid :"",
    criticalChance: 0,
    damage: 1,
    health: 20,
    income: 0,
    money: 20,
}
dataService.create(postTemplate)
 }

 function getPlayer(user){
  return dataService.signInPlayer(user);
 }
 function isSignIn(){
   dataService.isPlayerOnline();
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
          createNewPlayer,
          getPlayer,
          isSignIn,
        }}
      >
        {children}
      </PlayerContext.Provider>
    </div>
  );
};
