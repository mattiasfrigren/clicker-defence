import React, { useContext , useEffect, useState } from "react";
import { PlayerContext } from "../context/playerContext";

const Player = () => {
  const playerContext = useContext(PlayerContext);
  
  const [playerDamage, setPlayerDamage] = useState(1);
  const [playerHealth, setPlayerHealth] = useState(1);
  const [playerGold, setPlayerGold] = useState(1);
  const [playerCritChance, setPlayerCritChance] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);

 
  useEffect(()=>{
    playerContext.getPlayerValue(setPlayerDamage, "damage");
    playerContext.getPlayerValue(setPlayerHealth,"health");
    playerContext.getPlayerValue(setPlayerGold,"money");
    playerContext.getPlayerValue(setPlayerCritChance,"criticalChance");
    setIsGameRunning(playerContext.isGameRunning);
  })

  useEffect (() => {
   if(playerHealth <=0){
     playerContext.setIsGameOver(true);
   }

},[playerHealth]);

  return (
    <div id="playerValues">
      <p>{playerCritChance} criticalChance</p>
      <p>{playerHealth} health</p>
      <p>{playerGold} pengar</p>
       <p>{playerDamage} damage</p>
    </div>
  );
};

export default Player;
