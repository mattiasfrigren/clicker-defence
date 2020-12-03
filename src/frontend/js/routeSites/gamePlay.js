import React, { memo, useEffect, useState } from "react";
import Tile from "../components/maptile";
import { GameMap } from "../../../backend/data/gamemap";
import Wave from '../components/wave';

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
        />
      );
    });
  });

   

  return (
    <div >
      {drawMap}
 <Wave/>
    </div>
  );
};

export default GamePlay;
