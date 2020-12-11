import React from "react";
import MenuButton from "./menuButtonComp";

const InGameMenu = () => {
  const menuButtonsName = ["Start", "Info", "Option", "Save and Exit"];

  const clickMe = (e) => {
    console.log(e.type);
  };

  const mapButtons = menuButtonsName.map((name, index) => {
    return (<div className={MenuButton.name.toLowerCase()+"div"}>
      <MenuButton
        id={name + index}
        className={MenuButton.name.toLowerCase()}
        onClick={clickMe}
        leftPos={60}
        topPos={10 * index}
        name ={name}
      />
      </div>
    );
  });

  return <div id="inGameMenu">{mapButtons}
  <div id={"menuImgHolder"} className={"menubuttondiv"}></div>
  </div>;
};

export default InGameMenu;
