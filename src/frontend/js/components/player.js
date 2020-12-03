import React, { useContext } from "react";
import { PlayerContext } from "../context/playerContext";

const Player = () => {
  const playerContext = useContext(PlayerContext);

  return (
    <div id="playerValues">
      <p>{playerContext.playerGold} pengar</p>
      <p>{playerContext.damage} damage</p>
      <p>{playerContext.playerHealth} playerHealth</p>
    </div>
  );
};

export default Player;
