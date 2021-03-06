import React, { useContext, useState } from "react";
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
import Skull from "../../../backend/resoruces/images/icons/skull.png";
import {AuthContext} from '../context/authenticatContext';
import InfoPage from './information';

const handleEnemiesButtonIcons = [
  [Lightning,"Lightning"],
  [Scary,"Scary"],
  [Random,"Random"],
  [Bomb,"Bomb"],
  [Skull,"Skull"]
];

const playerActionButtonIcons = [
  [Punch,"Punch"],
  [Attack,"CriticalStrike"],
  [Healing,"Healing"],
  [Moneybag,"MoneyBag"],
  [Randompotion,"Randompotion"],
];



const InGameMenu = () => {
  const menuButtonsName = ["Start", "Info", "Save and Exit"];
 
  const authContext = useContext(AuthContext);
  const [showInfo, setShowInfo] = useState(false);

  const logOut = () =>{
    authContext.signOut();
  }


  const info = () =>{
     setShowInfo(!showInfo);
  }

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
      <div className={"menubutton" + "div"}>
        <MenuButton
          key={Math.random() * 100000000}
          id={name + index}
          className={"menubutton"}
          onClick={(name==="Save and Exit") ? logOut : (name==="Info")? info :null}
          leftPos={60}
          topPos={10 * index}
          name={name}
        />
      </div>
    ) : (
      <div className={"menubutton" + "div"}>
        <HandleEnemiesButton
          key={Math.random() * 100000000}
          id={name + index}
          className={"menubutton"}
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
    {showInfo ?  <InfoPage/> :null}
    {handleEnemiesActionButtons}
      {playerActionButtons}
    </div>
  );
};

export default InGameMenu;

