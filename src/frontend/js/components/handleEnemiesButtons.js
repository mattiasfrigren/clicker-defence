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

  const [playerDamage, setPlayerDamage] = useState(1);
  const [playerHealth, setPlayerHealth] = useState(1);
  const [playerGold, setPlayerGold] = useState(1);
  let [wave, setWave] = useState([]);
  let [numberOfMinions, setNumberOfMinions] = useState(25);


  const addEnemie = () => {
    setWave((wave) => [...wave, <Minion />]);
    setNumberOfMinions((numberOfMinions = numberOfMinions + 1));
    console.log(wave);
   
  };

  const startWave = (e) => {
    e.target.disabled = true;
    playerContext.setIsGameRunning(true);
    setNumberOfMinions(0);
    setWave([]);
    setTimeout(() => {
      e.target.disabled = false;
  
    }, 90000);
   
  };

  const currentWave = wave.map((minion, index) => (
    <div key={index} className={"minionDiv"}>
      {minion}
    </div>
  ));

  const castThunder = () => {
    const cost = 50;
    if (playerGold >= cost) {
      playerContext.setPlayerAttribute({ money: playerGold - cost });
      playerContext.setIsThunder(true);
    } else {
      console.log("not gold for it");
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

  const renderButton =
    className !== "menubutton" ? (
      <div>
        <button
          id={id + name}
          key={Math.random() * 100000000}
          className={className}
          onClick={
            (name === "Lightning") ?  castThunder : (name ==="Bomb") ? upgradeBomb : () =>console.log("done")
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
            content= {(name ==="Bomb") ? "current cost: " +(bombCost *bombCostMultiplyer) + "damage: " +bombDamage: "to be more info"}
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
    if (numberOfMinions < 25) {
      setTimeout(() => addEnemie(), 2000);
    }
  }, [numberOfMinions]);

  useEffect(() => {
    playerContext.getPlayerValue(setPlayerDamage,  "damage");
    playerContext.getPlayerValue(setPlayerHealth,  "health");
    playerContext.getPlayerValue(setPlayerGold,  "money");
    playerContext.getPlayerValue(setBombDamage,  "bombValues/damage");
    playerContext.getPlayerValue(setBombDamageMultiplyer,  "bombValues/damageMultiplyer");
    playerContext.getPlayerValue(setBombCostMultiplyer,  "bombValues/costMultiplyer");
   
    
  });

  return (
    <div>
      {currentWave}
      {renderButton}
    </div>
  );
};

export default HandleEnemiesButton;
