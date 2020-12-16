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
  onClick,
  name,
}) => {
  const playerContext = useContext(PlayerContext);
  const [isPopUpShown, setIsPopUpShown] = useState(false);

  const [playerDamage, setPlayerDamage] = useState(1);
  const [playerHealth, setPlayerHealth] = useState(1);
  const [playerGold, setPlayerGold] = useState(1);
  let [wave, setWave] = useState([]);
  let [numberOfMinions, setNumberOfMinions] = useState(13);

  const addWave = () => {
    setWave((wave) => [...wave, <Minion />]);
    setNumberOfMinions((numberOfMinions = numberOfMinions + 1));
    console.log(wave);
  };

  const nextWave = (e) => {
    e.target.disabled =true;
      console.log(e.target.disabled)
    setNumberOfMinions(0);
    setWave([]);
    setTimeout(()=>{
        e.target.disabled=false
    },68000)
  };
 

  const currentWave = wave.map((minion, index) => (
    <div key={index}>{minion}</div>
  ));

  useEffect(() => {
    if (numberOfMinions < 13) {
      setTimeout(() => addWave(), 2000);
    }
  }, [numberOfMinions]);

  useEffect(() => {
    playerContext.getPlayerValue(setPlayerDamage, "admin", "damage");
    playerContext.getPlayerValue(setPlayerHealth, "admin", "health");
    playerContext.getPlayerValue(setPlayerGold, "admin", "money");
  
  });

  return className !== "menubutton" ? (
    <div>
       <div className="minionDiv">{currentWave}</div>
      <button
        id={id}
        key={Math.random() * 100000000}
        className={className}
        onClick={() => {
          console.log("done");
        }}
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
          content={10 + " current cost"}
        />
      ) : (
        <></>
      )}
    </div>
  ) : (
      <div>
    <div className="minionDiv">{currentWave}</div>
    <MenuButton
      id={id}
      className={MenuButton.name.toLowerCase()}
      onClick={nextWave}
      leftPos={leftPos}
      topPos={topPos}
      name={name}
    />
    </div>
  );
};

export default HandleEnemiesButton;
