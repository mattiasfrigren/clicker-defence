import React, { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../context/playerContext";


const Minion = (level) => {
  const playerContext = useContext(PlayerContext);

  let [moveX, setMoveX] = useState(0);
  let [moveY, setMoveY] = useState(0);
  let [moveSpeedY, setMoveSpeedY] = useState(0.5);
  let [moveSpeedX, setMoveSpeedX] = useState(0);
  let [minionHealth, setMinionHealth] = useState(level.level*10);
  let [isDead, setDead] = useState(false);
  let [coinWorth, setCoinWorth] = useState(1);
  let [deathAnimation, setDeathAnimation] = useState(false);

  const [bombDamage, setBombDamage] = useState(1);
  const [corruptionDamage, setCorruptionDamage] = useState(1);
  const [playerDamage, setPlayerDamage] = useState(1);
  const [playerHealth, setPlayerHealth] = useState(1);
  const [playerGold, setPlayerGold] = useState(1);
  const [playerCritChance, setPlayerCritChance] = useState(0);
  let timer = null;


  const currentElemDir = () => {
    if (moveSpeedY === 0.5) {
      return 3;
    } else if (moveSpeedY === -0.5) {
      return -3;
    } else if (moveSpeedX === 0.5) {
      return 1.5;
    } else {
      return -1.5;
    }
  };
{/** checks the direction the minion is going and if the tile infront of it is grass type. 
if its a grass type it gets the new direction for the minion. and it alsow moves the minion forward
*/}
  const getDirection = () => {
    let elemDir = currentElemDir();
    let elem =
      moveSpeedY === 0.5 || moveSpeedY === -0.5
        ? document.getElementById(moveY + elemDir + ":" + moveX)
        : document.getElementById(moveY + ":" + (moveX + elemDir));

    if (elem !== null) {
      if (elem.className === "grass") {
        let leftElem = document.getElementById(moveY + ":" + (moveX - 1.5));

        let righttElem = document.getElementById(moveY + ":" + (moveX + 1.5));

        let bottomElem = document.getElementById(moveY + 3 + ":" + moveX);

        let topElem = document.getElementById(moveY - 3 + ":" + moveX);

        {
          /* send right*/
        }
        if (
          (bottomElem.className === "grass" &&
            righttElem.className === "water" &&
            (moveSpeedY === 0.5 || moveSpeedX === 0.5)) ||
          (righttElem.className === "water" &&
            leftElem.className === "grass" &&
            topElem.className === "grass" &&
            moveSpeedY === -0.5)
        ) {
          setMoveSpeedY((moveSpeedY = 0));
          setMoveSpeedX((moveSpeedX = 0.5));
        } else if (
          (righttElem.className === "grass" &&
            topElem.className === "grass" &&
            bottomElem.className === "water" &&
            leftElem.className === "water" &&
            moveSpeedY !== -0.5) ||
          (leftElem.className === "grass" &&
            topElem.className === "grass" &&
            bottomElem.className === "water" &&
            moveSpeedX === -0.5)
        ) {
          setMoveSpeedY((moveSpeedY = 0.5));
          setMoveSpeedX((moveSpeedX = 0));
          {
            /* send bottom*/
          }
        } else if (
          (bottomElem.className === "grass" &&
            righttElem.className === "grass" &&
            leftElem.className === "water" &&
            moveSpeedY === 0.5) ||
          (bottomElem.className === "water" &&
            righttElem.className === "grass" &&
            leftElem.className === "water" &&
            topElem.className === "grass" &&
            moveSpeedY === -0.5)
        ) {
          setMoveSpeedY((moveSpeedY = 0));
          setMoveSpeedX((moveSpeedX = -0.5));
          {
            /* send left*/
          }
        } else if (
          (righttElem.className === "grass" &&
            bottomElem.className === "grass" &&
            topElem.className === "water" &&
            leftElem !== null) ||
          (righttElem.className === "water" &&
            bottomElem.className === "grass" &&
            leftElem.className === "grass" &&
            topElem.className === "water" &&
            moveSpeedX === -0.5)
        ) {
          setMoveSpeedY((moveSpeedY = -0.5));
          setMoveSpeedX((moveSpeedX = 0));
          {
            /* send top*/
          }
        }
      }
      if(elem.slot !== null){
        explodedTile(elem.slot)
      }
    }

    setMoveX((moveX += moveSpeedX));
    setMoveY((moveY += moveSpeedY));
    if (moveY === 87 && moveX === 15) {
      playerContext.setPlayerAttribute({"health":(playerHealth-1)});
      setDead(true);
    }

    isMinionDead();
  };


  const explodedTile = (slotValue) =>{
    if(slotValue ==="exploded"){
    setMinionHealth(minionHealth = minionHealth-bombDamage);
    }
  }

  const isMinionDead =() =>{
    if (minionHealth <= 0) {
      playerContext.setPlayerAttribute({money: (playerGold +(level.level +coinWorth))});
      setDead(true);
      playDeathAnimation();
    }
  }

  const hitMinion = () => {
    
    if(playerCritChance >= (Math.floor(Math.random()*101))){
      setMinionHealth((minionHealth = minionHealth - (playerDamage * 2)));
    }
    else{ 
    setMinionHealth((minionHealth = minionHealth - playerDamage));
    
  }
  };

  const playDeathAnimation = () =>{
    setDeathAnimation(true);
    setTimeout(()=> setDeathAnimation(false),1000);
  }

  const corruptMinion = () =>{
    var damageInterval =3;
    timer = setInterval(()=>{
      damageInterval = damageInterval -1;
      setMinionHealth(minionHealth= (minionHealth -corruptionDamage));
      if(damageInterval <=0){
        clearInterval(timer);
      }
    },1000)
  }

  const earthQuake = () =>{
    
    setMinionHealth(minionHealth = (minionHealth - Math.floor((level.level*10)/2)));
  }

  useEffect(()=>{
    if(playerContext.corruption){
      corruptMinion();
    }
  },[playerContext.corruption])

  useEffect(()=>{
    if(playerContext.isEarthQuake){
      earthQuake();
    }
  },[playerContext.isEarthQuake])

  useEffect(()=>{
    if(playerContext.isThunder){
      setMinionHealth(0);
      playerContext.setIsThunder(false);
    }

  },[playerContext.isThunder]);

  useEffect(() => {
    if (!isDead) {
      setTimeout(() => getDirection(), 40);
    }
  }, [moveX, moveY]);

  useEffect(() => {
  }, [isDead]);

  useEffect(()=>{
    playerContext.getPlayerValue(setPlayerDamage,"damage");
    playerContext.getPlayerValue(setPlayerHealth,"health");
    playerContext.getPlayerValue(setPlayerGold,"money");
    playerContext.getPlayerValue(setPlayerCritChance,"criticalChance");
    playerContext.getPlayerValue(setBombDamage, "bombValues/damage");
    playerContext.getPlayerValue(setCorruptionDamage, "svenValues/damage");
    
    playerContext.getPlayerValue(setCoinWorth, "minionValues/coinWorthMultiplyer");
   

  });

  return (!isDead && !deathAnimation) ? ( 
  
      <div
     
      slot ={"test"}
      className="minion"
      id="enemie"
      onClick={hitMinion}
      style={{ left: moveX - 1.2 + "vw", top: moveY - 3.6 + "vh" }}
    ></div>
  ) : (isDead && deathAnimation) ? (
    <div className="minion"
    id="deadenemie"
    style={{left:moveX-1.2 +"vw", top:moveY-3.6 +"vh"}}
    >
    </div>
  )
   :<></>;
};

export default Minion;
