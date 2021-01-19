import React, { useRef } from "react";
import MenuButton from "./menuButtonComp";
import HandleEnemiesButton from "./handleEnemiesButtons";
import ActionButtonComponent from './actionbuttonComp';
import Punch from "../../../backend/resoruces/images/icons/punch.png";
import Healing from "../../../backend/resoruces/images/icons/healing.png";
import Lightning from "../../../backend/resoruces/images/icons/lightning.png";
import Moneybag from "../../../backend/resoruces/images/icons/moneybag.png";
import Randompotion from "../../../backend/resoruces/images/icons/randompotion.png";
import Scary from "../../../backend/resoruces/images/icons/scary.png";
import Attack from "../../../backend/resoruces/images/icons/attack.png";
import Random from "../../../backend/resoruces/images/icons/random.png";
import Bomb from "../../../backend/resoruces/images/icons/bomb.png";
import Heart from "../../../backend/resoruces/images/icons/heart.png";

const handleEnemiesButtonIcons = [
  [Lightning,"Lightning"],
  [Scary,"Scary"],
  [Random,"Random"],
  [Bomb,"Bomb"]
];

const playerActionButtonIcons = [
  [Punch,"Punch"],
  [Attack,"CriticalStrike"],
  [Healing,"Healing"],
  [Moneybag,"MoneyBag"],
  [Randompotion,"Randompotion"],
  [Heart,"Heart"]
];



const InGameMenu = () => {
  const menuButtonsName = ["Start", "Info", "Option", "Save and Exit"];
  const ref = useRef(null);

  const start = () => {
    console.log(ref.current);
    
  };

  const playerActionButtons = playerActionButtonIcons.map(function ([icon,iconName], index) {
    return (
      <div key={Math.random() * 10000000} id="inGameButtonDiv">
        <ActionButtonComponent
          key={Math.random() * 10000000}
          id={"iconButton" + index}
          iconName ={iconName}
          className={"iconButtons"}
          leftPos={9.9 * (index + handleEnemiesButtonIcons.length )}
          topPos={90}
          imageSrc={icon}
        ></ActionButtonComponent>
      </div>
    );
  });
  
  const handleEnemiesActionButtons = handleEnemiesButtonIcons.map(function ([icon,iconName], index) {
    return (
      <div key={Math.random() * 10000000} id="inGameButtonDiv">
        <HandleEnemiesButton
          key={Math.random() * 10000000}
          id={"iconButton" + index}
          className={"iconButtons"}
          leftPos={9.9 * index}
          topPos={90}
          imageSrc={icon}
          name={iconName}
        ></HandleEnemiesButton>
      </div>
    );
  });

  const mapMenuButtons = menuButtonsName.map((name, index) => {
    return name !== "Start" ? (
      <div className={MenuButton.name.toLowerCase() + "div"}>
        <MenuButton
          key={Math.random() * 100000000}
          id={name + index}
          className={MenuButton.name.toLowerCase()}
          onClick={start}
          leftPos={60}
          topPos={10 * index}
          name={name}
        />
      </div>
    ) : (
      <div className={MenuButton.name.toLowerCase() + "div"}>
        <HandleEnemiesButton
          key={Math.random() * 100000000}
          id={name + index}
          className={MenuButton.name.toLowerCase()}
          onClick={start}
          leftPos={60}
          topPos={10 * index}
          name={name}
        />
      </div>
    );
  });

  return (
    <div>
    <div id="inGameMenu">
      
      {mapMenuButtons}

      <div id={"menuImgHolder"} className={"menubuttondiv"}></div>
    </div>
    
    {handleEnemiesActionButtons}
      {playerActionButtons}
    </div>
  );
};

export default InGameMenu;

{/** set us for this rend aswell. might need to change the css a lite bit for screen purpose in the new div. 
alsow make sure att the ButtonComp will rename to "actionButtonComp" or something since there are 2 types of action buttons. "handkeEnemies"
and the other one that will effect thep action button player and playstyle. 
                            U CAN DO DIS!!!!!!
*/}
