import React, { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../context/playerContext";

const Minion = () => {
  const playerContext = useContext(PlayerContext);

  let [moveX, setMoveX] = useState(0);
  let [moveY, setMoveY] = useState(0);
  let [moveSpeedY, setMoveSpeedY] = useState(0.5);
  let [moveSpeedX, setMoveSpeedX] = useState(0);
  let [minionHealth, setMinionHealth] = useState(5);
  let [isDead, setDead] = useState(false);
  let [coinWorth, setCoinWorth] = useState(1);

  const currentElemDir = () => {
    if (moveSpeedY === 0.5) {
      return 3;
    } else if (moveSpeedY === -0.5) {
      return -3;
    } else if (moveSpeedX === 0.5) {
      return 1.5;
    } else {
      return -1.5;
    }
  };

  const getDirection = () => {
    let elemDir = currentElemDir();
    let elem =
      moveSpeedY === 0.5 || moveSpeedY === -0.5
        ? document.getElementById(moveY + elemDir + ":" + moveX)
        : document.getElementById(moveY + ":" + (moveX + elemDir));

    if (elem !== null) {
      if (elem.className === "grass") {
        let leftElem = document.getElementById(moveY + ":" + (moveX - 1.5));

        let righttElem = document.getElementById(moveY + ":" + (moveX + 1.5));

        let bottomElem = document.getElementById(moveY + 3 + ":" + moveX);

        let topElem = document.getElementById(moveY - 3 + ":" + moveX);

        {
          /* send right*/
        }
        if (
          (bottomElem.className === "grass" &&
            righttElem.className === "water" &&
            (moveSpeedY === 0.5 || moveSpeedX === 0.5)) ||
          (righttElem.className === "water" &&
            leftElem.className === "grass" &&
            topElem.className === "grass" &&
            moveSpeedY === -0.5)
        ) {
          setMoveSpeedY((moveSpeedY = 0));
          setMoveSpeedX((moveSpeedX = 0.5));
        } else if (
          (righttElem.className === "grass" &&
            topElem.className === "grass" &&
            bottomElem.className === "water" &&
            leftElem.className === "water" &&
            moveSpeedY !== -0.5) ||
          (leftElem.className === "grass" &&
            topElem.className === "grass" &&
            bottomElem.className === "water" &&
            moveSpeedX === -0.5)
        ) {
          setMoveSpeedY((moveSpeedY = 0.5));
          setMoveSpeedX((moveSpeedX = 0));
          {
            /* send bottom*/
          }
        } else if (
          (bottomElem.className === "grass" &&
            righttElem.className === "grass" &&
            leftElem.className === "water" &&
            moveSpeedY === 0.5) ||
          (bottomElem.className === "water" &&
            righttElem.className === "grass" &&
            leftElem.className === "water" &&
            topElem.className === "grass" &&
            moveSpeedY === -0.5)
        ) {
          setMoveSpeedY((moveSpeedY = 0));
          setMoveSpeedX((moveSpeedX = -0.5));
          {
            /* send left*/
          }
        } else if (
          (righttElem.className === "grass" &&
            bottomElem.className === "grass" &&
            topElem.className === "water" &&
            leftElem !== null) ||
          (righttElem.className === "water" &&
            bottomElem.className === "grass" &&
            leftElem.className === "grass" &&
            topElem.className === "water" &&
            moveSpeedX === -0.5)
        ) {
          setMoveSpeedY((moveSpeedY = -0.5));
          setMoveSpeedX((moveSpeedX = 0));
          {
            /* send top*/
          }
        }
      }
    }

    setMoveX((moveX += moveSpeedX));
    setMoveY((moveY += moveSpeedY));
    if (moveY === 87 && moveX === 15) {
      playerContext.setPlayerHealth((playerHealth) => playerHealth - 1);
      setDead(true);
    }
  };

  const hitMinion = (e) => {
    console.log(e.type);
    console.log(minionHealth);
    setMinionHealth((minionHealth = minionHealth - playerContext.damage));
    if (minionHealth <= 0) {
      playerContext.setPlayerGold((playerGold) => playerGold + 1);
      console.log(playerContext.playerGold);
      setDead(true);
    }
  };

  useEffect(() => {
    if (!isDead) {
      setTimeout(() => getDirection(), 40);
    }
  }, [moveX, moveY]);

  useEffect(() => {
    console.log(isDead + " is it dead?");
  }, [isDead]);

  return !isDead ? (
    <div
      className="minion"
      id="enemie"
      onClick={hitMinion}
      style={{ left: moveX - 1.2 + "vw", top: moveY - 3.6 + "vh" }}
    ></div>
  ) : (
    <></>
  );
};

export default Minion;
