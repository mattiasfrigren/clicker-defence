import React, { memo, useEffect, useState, useContext } from "react";
import Tile from "../components/maptile";
import { GameMap } from "../../../backend/commonutils/gamemap";
import Player from "../components/player";
import Grass from '../../../backend/resoruces/images/tiles/grasstile.png'
import Water from '../../../backend/resoruces/images/tiles/water.png'
import InGameMenu from '../components/inGameMenu';
import SpecialEffect from '../components/specialeffect';
import Sven from '../components/horror';
import Bomb from '../components/bomb';
import GameOver from '../components/gameOver';
import Tree from '../../../backend/resoruces/images/tiles/tree.png'
const GamePlay = () => {
  const drawMap = GameMap.map(function (row, index) {
    var i = index;

    return row.map(function (cell, index) {
      return (
        
        <Tile
          id={i * 3 + ":" + index * 1.5}
          className={cell === 1 ? "water" : (cell===0) ? "grass": "tree"}
          leftPos={1.5 * index}
          topPos={3 * i}
          key={Math.random() * 100000000}
          imageSrc={cell === 0 ? Grass: (cell===1)? Water : Tree}
        />
       
      );
      
    });
  });


  return (
    <div>
      {drawMap}
      
      <Sven/>
     <Bomb/>
      <Player />
      <InGameMenu />
     <SpecialEffect/>
     <GameOver/>
    </div>
  );
};

export default GamePlay;


