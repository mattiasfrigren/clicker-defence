import React, { useContext , useEffect, useState } from "react";
import { PlayerContext } from "../context/playerContext";

const Player = (props) => {
  const playerContext = useContext(PlayerContext);
  
  const [playerDamage, setPlayerDamage] = useState(1);
  const [playerHealth, setPlayerHealth] = useState(1);
  const [playerGold, setPlayerGold] = useState(1);
  const [playerCritChance, setPlayerCritChance] = useState(0);
  const [playerIncome, setPlayerIncome] = useState(0);
  const [isGameRunning, setIsGameRunning] = useState(false);


  const getIncome = () =>{
    playerContext.setPlayerAttribute({"money":(playerGold +playerIncome)})
    
  }
 
  useEffect(()=>{
    console.log(props.props.location.state)
    playerContext.getPlayerValue(setPlayerDamage,props.props.location.state.userName,"damage");
    playerContext.getPlayerValue(setPlayerHealth,props.props.location.state.userName,"health");
    playerContext.getPlayerValue(setPlayerGold,props.props.location.state.userName,"money");
    playerContext.getPlayerValue(setPlayerCritChance,props.props.location.state.userName,"cirticalChance");
    playerContext.getPlayerValue(setPlayerIncome,props.props.location.state.userName,"income");
    setIsGameRunning(playerContext.isGameRunning);
  })

  useEffect (() => {
    if(isGameRunning){
    setTimeout(() => 
      getIncome(),2000);
    }   
});

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
