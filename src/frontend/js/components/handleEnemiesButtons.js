import React, { useContext, useState, useEffect } from "react";
import { PlayerContext } from "../context/playerContext";
import MenuButton from "./menuButtonComp";
import PopUp from "./popupComp";
import Minion from "./enemieMinion";

const HandleEnemiesButton = ({
  id,
  className,
  leftPos,
  topPos,
  imageSrc,
  name,
 
}) => {
  const playerContext = useContext(PlayerContext);
  const [isPopUpShown, setIsPopUpShown] = useState(false);
  const [bombDamage, setBombDamage] = useState(1);
  const [bombDamageMultiplyer, setBombDamageMultiplyer] = useState(1);
  const [bombCost, setBombCost] = useState(30);
  const [bombCostMultiplyer, setBombCostMultiplyer] = useState(1);
  const [lightningStrikes, setLightningStrikes] = useState(1);
  const [isEarthQuakeReady, setIsEarthQuakeReady] = useState(true);
  const [isDiceReady, setIsDiceReady] = useState(true);
  
  const [svenDamage, setSvenDamage] = useState(1);
  const [svenDamageMultiplyer, setSvenDamageMultiplyer] = useState(1);
  const [svenCostMultiplyer, setSvenCostMultiplyer] = useState(1);
  const [svenCost, setSvenCost] = useState(50);

  let [currentLevel, setCurrentLevel] = useState(0);
  const [playerDamage, setPlayerDamage] = useState(1);
  const [playerHealth, setPlayerHealth] = useState(1);
  const [playerGold, setPlayerGold] = useState(1);
  let [wave, setWave] = useState([]);
  let [numberOfMinions, setNumberOfMinions] = useState(25);
  let [waveLenght, setWaveLenght ] = useState(92);

  let timer =null;
  let gambleTimer =null;
  let waveTimer = null;

  const bombInfo = "upgrade cost: " +(bombCost *bombCostMultiplyer) + " current damage: " +bombDamage;
  const svenInfo = "upgrade cost: " +(svenCost *svenCostMultiplyer) + " current damage: " +svenDamage;
  const lightingInfo = (lightningStrikes) + " strikes left will damage you for: " + (Math.floor(playerHealth/2));
  const earthquakeInfo = "shakes screen and damages all enemies for: " + Math.floor((currentLevel*10) /2) + " 60sec cooldown";
  const gambleInfo = "roll the dice and gamble with your money. 30sec cooldown";
  
  const addEnemie = () => {
    setWave((wave) => [...wave, <Minion level ={currentLevel} />]);
    setNumberOfMinions((numberOfMinions = numberOfMinions + 1));
   
  };

  const startWave = (e) => {
    e.target.disabled = true;
    setNumberOfMinions(0);
    playerContext.setIsGameRunning(true);
    setWave([]);
    
   
  };

  const currentWave = wave.map((minion, index) => (
    <div key={index} className={"minionDiv"}>
      {minion}
    </div>
  ));

  const castThunder = () => {
    if (lightningStrikes >0) {
      playerContext.setPlayerAttribute({ lightningStrikes: lightningStrikes - 1 });
      playerContext.setPlayerAttribute({health : (Math.floor(playerHealth/2))})
      playerContext.setIsThunder(true);
    } else {
      console.log("no more lightningStrikes left");
    }
  };

  const upgradeBomb = () =>{
    if(playerGold >= (bombCost *bombCostMultiplyer)){
      playerContext.setPlayerAttribute({ money: playerGold - (bombCost * bombCostMultiplyer)});
      playerContext.setPlayerItemAttribute("bombValues",{damage : (bombDamage * bombDamageMultiplyer)})
      playerContext.setPlayerItemAttribute("bombValues",{costMultiplyer : (bombCostMultiplyer + 1)})
    }
    else{
      console.log("no gold for it")
    }
  }

  const upgradeSven = () =>{
    if(playerGold >= (svenCost *svenCostMultiplyer)){
      playerContext.setPlayerAttribute({ money: playerGold - (svenCost * svenCostMultiplyer)});
      playerContext.setPlayerItemAttribute("svenValues",{damage : (svenDamage * svenDamageMultiplyer)})
      playerContext.setPlayerItemAttribute("svenValues",{costMultiplyer : (svenCostMultiplyer + 1)})
    }
    else{
      console.log("no gold for it")
    }
  }

  const castEarthQuake = () =>{
    
  if(isEarthQuakeReady){
var cooldown =60;
playerContext.setIsEarthQuake(true);

setTimeout(()=>{
  playerContext.setIsEarthQuake(false);
  setIsEarthQuakeReady(false);
  timer = setInterval(() => {
    cooldown = cooldown -1;
    if(cooldown <=0){
      clearInterval(timer);
      setIsEarthQuakeReady(true);
    }
  },1000);
},2000);
  }
  else{console.log("not ready")}
  }

  const rollDice = () =>{
    if(isDiceReady){
      setIsDiceReady(false);
      var cooldown =30;
    var randomNumber = Math.floor(Math.random()*6) +1;
    gambleTimer = setInterval(()=>{
      cooldown = cooldown-1;
      if(cooldown <=0){
        clearInterval(gambleTimer);
        setIsDiceReady(true)
      }
    },1000)
    switch(randomNumber){

      case 1:
        playerContext.setPlayerAttribute({ money: playerGold - (Math.floor(playerGold/2))});
    
      break;
      
      case 2:
        playerContext.setPlayerAttribute({ money: playerGold - (Math.floor(playerGold *0.40))});
   
        break;

        case 3:
          playerContext.setPlayerAttribute({ money: playerGold + (Math.floor(playerGold *0.10))});
        
          break;

          case 4:
            playerContext.setPlayerAttribute({ money: playerGold + (Math.floor(playerGold *0.20))});
        
            break;

            case 5:
              playerContext.setPlayerAttribute({ money: playerGold + (Math.floor(playerGold *0.30))});
            
              break;
        default:
          playerContext.setPlayerAttribute({ money: playerGold + (Math.floor(playerGold *0.50))});
         
        break;
    }
  }
  }

  const renderButton =
    className !== "menubutton" ? (
      <div>
        <button
          id={id + name}
          key={Math.random() * 100000000}
          className={className}
          onClick={
            (name === "Lightning") ?  castThunder : (name ==="Bomb") ? upgradeBomb :(name ==="Scary") ? upgradeSven : (name ==="Skull") ? castEarthQuake : rollDice
          }
          style={{ left: leftPos + "vw", top: topPos + "vh" }}
          onMouseEnter={() => setIsPopUpShown(true)}
          onMouseLeave={() => setIsPopUpShown(false)}
        >
          <img src={imageSrc} alt={imageSrc} className={className}></img>
        </button>
        {isPopUpShown ? (
          <PopUp
            key={Math.random() * 100000000}
            id={id}
            content= {(name ==="Bomb") ? bombInfo : (name==="Scary") ? svenInfo : (name==="Lightning") ? lightingInfo : (name==="Skull") ? earthquakeInfo : gambleInfo}
          />
        ) : (
          <></>
        )}
      </div>
    ) : (
      <div>
        <MenuButton
          id={id}
          className={"menubutton"}
          onClick={startWave}
          leftPos={leftPos}
          topPos={topPos}
          name={name}
        />
      </div>
    );

  useEffect(() => {
    if (numberOfMinions < 25 && !playerContext.isGameOver) {
      setTimeout(() => addEnemie(), 2000);
    }
   
  }, [numberOfMinions]);

  useEffect(()=>{
  if(name==="Start"){
if(playerContext.isGameRunning){
  waveTimer = setInterval(()=>{
    setWaveLenght(waveLenght= waveLenght-1);
    if(waveLenght <=0){
      document.getElementById("Start0").disabled =false;
playerContext.setIsGameRunning(false);
setWaveLenght(92);
playerContext.setPlayerItemAttribute("minionValues",{level : (currentLevel+1)});
clearInterval(waveTimer);
    }


  },1000);
  return () =>{
    clearInterval(waveTimer)
    playerContext.setIsGameRunning(false);
    setWaveLenght(92);
   }
}
}
  },[playerContext.isGameRunning])

  useEffect(()=>{
    if( playerContext.resetGame ){
      setNumberOfMinions(25)
      setWave([]);
      playerContext.setIsGameRunning(false)
      clearInterval(waveTimer);
      waveTimer = null;
      playerContext.setResetGame(false);
    }
    
  },[playerContext.resetGame])

  useEffect(() => {
    playerContext.getPlayerValue(setPlayerDamage,  "damage");
    playerContext.getPlayerValue(setPlayerHealth,  "health");
    playerContext.getPlayerValue(setPlayerGold,  "money");
    playerContext.getPlayerValue(setCurrentLevel, "minionValues/level");
    playerContext.getPlayerValue(setLightningStrikes, "lightningStrikes");
    
    playerContext.getPlayerValue(setBombDamage,  "bombValues/damage");
    playerContext.getPlayerValue(setBombDamageMultiplyer,  "bombValues/damageMultiplyer");
    playerContext.getPlayerValue(setBombCostMultiplyer,  "bombValues/costMultiplyer");

    playerContext.getPlayerValue(setSvenDamage,  "svenValues/damage");
    playerContext.getPlayerValue(setSvenDamageMultiplyer,  "svenValues/damageMultiplyer");
    playerContext.getPlayerValue(setSvenCostMultiplyer,  "svenValues/costMultiplyer");
   
    
  });

  return (
    <div>
      {currentWave}
      {renderButton}
    </div>
  );
};

export default HandleEnemiesButton;
