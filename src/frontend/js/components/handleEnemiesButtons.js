import React, { useContext, useState, useEffect, useRef } from "react";
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
  onClick,
  name,
 
}) => {
  const playerContext = useContext(PlayerContext);
  const [isPopUpShown, setIsPopUpShown] = useState(false);
  const [bombDamage, setBombDamage] = useState(1);
  const [bombDamageMultiplyer, setBombDamageMultiplyer] = useState(1);
  const [bombCost, setBombCost] = useState(30);
  const [bombCostMultiplyer, setBombCostMultiplyer] = useState(1);
  const [lightningStrikes, setLightningStrikes] = useState(1);
  
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

  const bombInfo = "current cost: " +(bombCost *bombCostMultiplyer) + " damage: " +bombDamage;
  const svenInfo = "current cost: " +(svenCost *svenCostMultiplyer) + " damage: " +svenDamage;
  const lightingInfo = "number of strikes left: " +(lightningStrikes) + "will damage u for: " + (Math.floor(playerHealth/2));
  
  const addEnemie = () => {
    setWave((wave) => [...wave, <Minion level ={currentLevel} />]);
    setNumberOfMinions((numberOfMinions = numberOfMinions + 1));
    console.log(wave);
   
  };

  const startWave = (e) => {
    e.target.disabled = true;
    setNumberOfMinions(0);
    playerContext.setIsGameRunning(true);
    setWave([]);
    setTimeout(() => {
      e.target.disabled = false;
      playerContext.setPlayerItemAttribute("minionValues",{level : (currentLevel+1)});
    }, 88000);
   
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

  const renderButton =
    className !== "menubutton" ? (
      <div>
        <button
          id={id + name}
          key={Math.random() * 100000000}
          className={className}
          onClick={
            (name === "Lightning") ?  castThunder : (name ==="Bomb") ? upgradeBomb :(name ==="Scary") ? upgradeSven : () =>console.log("done")
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
            content= {(name ==="Bomb") ? bombInfo : (name==="Scary") ? svenInfo : (name==="Lightning") ? lightingInfo : "to be more info"}
          />
        ) : (
          <></>
        )}
      </div>
    ) : (
      <div>
        <MenuButton
          id={id}
          className={MenuButton.name.toLowerCase()}
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
    if(playerContext.isGameOver){
      setNumberOfMinions(25)
      setWave([]);
    }
  },[playerContext.isGameOver])

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
