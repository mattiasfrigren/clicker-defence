import React, { useState, useEffect, useContext } from "react";
import { PlayerContext } from "../context/playerContext";

const Minion = () => {
  const playerContext = useContext(PlayerContext);

  let [moveX, setMoveX] = useState(0);
  let [moveY, setMoveY] = useState(0);
  let [moveSpeedY, setMoveSpeedY] = useState(4);
  let [moveSpeedX, setMoveSpeedX] = useState(0);
  let [minionHealth, setMinionHealth] = useState(10);
  let [isDead, setDead] = useState(false);

  const getDirection = () => {
    
    let elemDir = moveSpeedY === 4 || moveSpeedX === 4 ? 16 : -16;
    let elem =
      moveSpeedY === 4 || moveSpeedY === -4
        ? document.getElementById(moveY + elemDir + ":" + moveX)
        : document.getElementById(moveY + ":" + (moveX + elemDir));

    if (elem !== null) {
       
      if (elem.className === "grass") {
        let leftElem = document.getElementById(moveY + ":" + (moveX - 16));

        let righttElem = document.getElementById(moveY + ":" + (moveX + 16));

        let bottomElem = document.getElementById(moveY + 16 + ":" + moveX);

        let topElem = document.getElementById(moveY - 16 + ":" + moveX);
        {
          /* send right*/
        }
        if (
          (bottomElem.className === "grass" &&
            righttElem.className === "water" &&
            (moveSpeedY === 4 || moveSpeedX === 4)) ||
          (righttElem.className === "water" &&
            leftElem.className === "grass" &&
            topElem.className === "grass" &&
            moveSpeedY === -4)
        ) {
          setMoveSpeedY((moveSpeedY = 0));
          setMoveSpeedX((moveSpeedX = 4));
        } else if (
          (righttElem.className === "grass" &&
            topElem.className === "grass" &&
            bottomElem.className === "water" &&
            leftElem.className === "water" &&
            moveSpeedY !== -4) ||
          (leftElem.className === "grass" &&
            topElem.className === "grass" &&
            bottomElem.className === "water" &&
            moveSpeedX === -4)
        ) {
          setMoveSpeedY((moveSpeedY = 4));
          setMoveSpeedX((moveSpeedX = 0));
          {
            /* send bottom*/
          }
        } else if (
          (bottomElem.className === "grass" &&
            righttElem.className === "grass" &&
            leftElem.className === "water" &&
            moveSpeedY === 4) ||
          (bottomElem.className === "water" &&
            righttElem.className === "grass" &&
            leftElem.className === "water" &&
            topElem.className === "grass" &&
            moveSpeedY === -4)
        ) {
          setMoveSpeedY((moveSpeedY = 0));
          setMoveSpeedX((moveSpeedX = -4));
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
            moveSpeedX === -4)
        ) {
          setMoveSpeedY((moveSpeedY = -4));
          setMoveSpeedX((moveSpeedX = 0));
          {
            /* send top*/
          }
        }
      }
    }

    setMoveX((moveX += moveSpeedX));
    setMoveY((moveY += moveSpeedY));
    if(moveY ===464 && moveX===160){
        setDead(true)
       
    }
  };

  const hitMinion = (e) => {
    console.log(e.type);
    console.log(minionHealth);
    setMinionHealth((minionHealth = minionHealth - playerContext.damage));
    if (minionHealth <= 0) {
      setDead(true);
    }
  };

  useEffect(() => {
    if (!isDead) {
      setTimeout(() => getDirection(), 20);
    }

  }, [ moveX, moveY]);

  useEffect(() => {
    console.log(isDead + " is it dead?")
  }, [isDead]);

  return !isDead ? (
    <div
      className="minion"
      id="enemie"
      onClick={hitMinion}
      style={{ left: moveX + "px", top: moveY + "px" }}
    ></div>
  ) : (
    <></>
  );
};

export default Minion;
