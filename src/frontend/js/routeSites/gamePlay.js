import React, { memo, useEffect, useState, useContext } from "react";
import Tile from "../components/maptile";
import { GameMap } from "../../../backend/commonutils/gamemap";
import Wave from "../components/wave";
import Player from "../components/player";
import ButtonComponent from '../components/buttonComp';
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
import Grass from '../../../backend/resoruces/images/tiles/grasstile.png'
import Water from '../../../backend/resoruces/images/tiles/water.png'

const ButtonIcons = [
  Punch,
  Healing,
  Lightning,
  Moneybag,
  Randompotion,
  Scary,
  Attack,
  Random,
  Bomb,
  Heart
];

const GamePlay = () => {
  const drawMap = GameMap.map(function (row, index) {
    var i = index;

    return row.map(function (cell, index) {
      return (
        <Tile
          id={i * 3 + ":" + index * 1.5}
          className={cell === 1 ? "water" : "grass"}
          leftPos={1.5 * index}
          topPos={3 * i}
          key={Math.random() * 100000000}
          imageSrc={cell === 0 ? Grass:Water}
        />
      );
    });
  });

const testFunc =(e) =>{
  console.log(e.type);
}

  const drawButtons = ButtonIcons.map(function(icon, index) {
    return(
<div key ={Math.random()* 10000000} id="inGameButtonDiv">
  <ButtonComponent
  key ={Math.random()* 10000000}
  id = {"iconButton"+index}
  className ={"iconButtons"}
  onClick = {testFunc}
  leftPos = {9.9 *index}
  topPos = {90}
  imageSrc = {icon}
  >
  </ButtonComponent>
</div>
    );

  });

  return (
    <div>
      {drawMap}
      <Wave />
      <Player />
      {drawButtons}
    </div>
  );
};

export default GamePlay;
