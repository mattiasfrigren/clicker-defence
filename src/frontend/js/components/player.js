import React, { useContext , useEffect, useState } from "react";
import { PlayerContext } from "../context/playerContext";

const Player = () => {
  const playerContext = useContext(PlayerContext);
  
  const [playerDamage, setPlayerDamage] = useState(1);
  const [playerHealth, setPlayerHealth] = useState(1);
  const [playerGold, setPlayerGold] = useState(1);
  
  
  useEffect(()=>{
    playerContext.getPlayerValue(setPlayerDamage,"admin","damage");
    playerContext.getPlayerValue(setPlayerHealth,"admin","health");
    playerContext.getPlayerValue(setPlayerGold,"admin","money");
 
  })
  return (
    <div id="playerValues">
      <p>{playerHealth} health</p>
      <p>{playerGold} pengar</p>
       <p>{playerDamage} damage</p>
    </div>
  );
};

export default Player;
