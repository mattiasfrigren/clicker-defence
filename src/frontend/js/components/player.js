import React, { useContext , useEffect, useState } from "react";
import { PlayerContext } from "../context/playerContext";

const Player = () => {
  const playerContext = useContext(PlayerContext);
  
  const [playerDamage, setPlayerDamage] = useState(1);
  const [playerHealth, setPlayerHealth] = useState(1);
  const [playerGold, setPlayerGold] = useState(1);
  const [playerCritChance, setPlayerCritChance] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [player, setPlayer] = useState("");
  const [highScore, setHighScore] = useState(0);
  const [currentLevel, setCurrentLevel] = useState(0);
  const [enemieSlots, setEnemieSlots] = useState([]);

  const getAllEnemiesSlots = () =>{
    setEnemieSlots(document.getElementsByClassName("minion"));
  }

  useEffect(()=>{
    playerContext.getPlayerValue(setPlayerDamage, "damage");
    playerContext.getPlayerValue(setPlayerHealth,"health");
    playerContext.getPlayerValue(setPlayerGold,"money");
    playerContext.getPlayerValue(setPlayerCritChance,"criticalChance");
    playerContext.getPlayerValue(setPlayer,"name");
    playerContext.getPlayerValue(setHighScore, "highscore");
    playerContext.getPlayerValue(setCurrentLevel, "minionValues/level");
    setIsGameRunning(playerContext.isGameRunning);
   
  })
  useEffect(()=>{
    getAllEnemiesSlots();
    console.log(enemieSlots)
  },[playerHealth])

  useEffect(()=>{
    if(currentLevel >highScore){
      playerContext.setPlayerAttribute({ highscore: currentLevel});
    }

  },[currentLevel]);

  useEffect (() => {
   if(playerHealth <=0){
     playerContext.setIsGameOver(true);
   }

},[playerHealth]);

  return (
    <div id="playerValues">
      <p className="playertag" id="playername"> {player} </p>
      <p className="playertag">High Score: {highScore} </p>
      <p className="playertag">CritChance: {playerCritChance} </p>
      <p className="playertag">Health: {playerHealth} </p>
      <p className="playertag">Gold: {playerGold} </p>
      <p className="playertag">Damage: {playerDamage} </p>
    </div>
  );
};

export default Player;
