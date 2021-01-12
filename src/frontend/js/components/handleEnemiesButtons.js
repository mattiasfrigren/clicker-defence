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
  playerValues,
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
    e.target.disabled = true;
    playerContext.setIsGameRunning(true);
    setNumberOfMinions(0);
    setWave([]);
    setTimeout(() => {
      e.target.disabled = false;
    }, 68000);
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

  const renderButton =
    className !== "menubutton" ? (
      <div>
        <button
          id={id + name}
          key={Math.random() * 100000000}
          className={className}
          onClick={
            name !== "Lightning"
              ? () => {
                  console.log("done");
                }
              : castThunder
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
            content={10 + " current cost"}
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
          onClick={nextWave}
          leftPos={leftPos}
          topPos={topPos}
          name={name}
        />
      </div>
    );

  useEffect(() => {
    if (numberOfMinions < 13) {
      setTimeout(() => addWave(), 2000);
    }
  }, [numberOfMinions]);

  useEffect(() => {
    playerContext.getPlayerValue(setPlayerDamage, playerValues.props.location.state.userName, "damage");
    playerContext.getPlayerValue(setPlayerHealth, playerValues.props.location.state.userName, "health");
    playerContext.getPlayerValue(setPlayerGold, playerValues.props.location.state.userName, "money");
    
  });

  return (
    <div>
      {currentWave}
      {renderButton}
    </div>
  );
};

export default HandleEnemiesButton;
