import React, { useEffect, useState } from "react";
import UseDragging from "./draggable";
import blackbomb from "../../../backend/resoruces/images/effects/bomb.png";
import explosion from "../../../backend/resoruces/images/effects/explosion.gif";

const Bomb = () => {
  let [ref, x, y, isDragging, setRefreshPos] = UseDragging(360, 0);
  const [text, setText] = useState("Bomb");
  let [seconds, setSeconds] = useState(3);
  const [isExploding, setIsExploding] = useState(false);
  const [elementsToExplode, SetElementsToExplode] = useState([]);
  const [readyCounter, setReadyCounter] = useState(true);

  let timer = null;

  const countDown = () => {
    SetElementsToExplode([]);
    timer = setInterval(() => {
      setText(seconds);
      console.log(seconds);
      setSeconds((seconds = seconds - 1));
      if (seconds <= -1) {
        clearInterval(timer);
        setSeconds(3);
        setText("");
        explode();
      }
    }, 1000);
  };
  const explode = () => {
    var bombCounter = 10;
    setIsExploding(true);
    getAllExplodedElements();
    setTimeout(() => {
      setIsExploding(false);
      setRefreshPos(true);
      setReadyCounter(false);

      timer = setInterval(() => {
        setText(bombCounter);
        bombCounter = bombCounter - 1;
        if (bombCounter <= 0) {
          clearInterval(timer);
          setText("");
          setReadyCounter(true);
        }
      }, 1000);
    }, 650);
  };

  const resetElements = () => {
    elementsToExplode.map((elem) => {
      return (elem.slot = "");
    });
  };

  const getAllExplodedElements = () => {
    var i = Math.floor(y * 0.16393442622950818) - 4;
    var rangeY = i + 16;
    var j = Math.floor(x * 0.078125) - 4;
    var rangeX = j + 12;

    for (let indexY = i; indexY < rangeY; indexY++) {
      for (let indexX = j; indexX < rangeX; indexX++) {
        let element = document.getElementById(indexY + ":" + indexX);

        if (element !== null) {
          let elementToRight = document.getElementById(
            indexY + ":" + (indexX + 1.5)
          );
          if (element.className === "water") {
            element.slot = "exploded";

            SetElementsToExplode((elementsToExplode) => [
              ...elementsToExplode,
              element,
            ]);
          }
          if (elementToRight.className === "water") {
            elementToRight.slot = "exploded";
            SetElementsToExplode((elementsToExplode) => [
              ...elementsToExplode,
              elementToRight,
            ]);
          }
        }
      }
    }
  };

  useEffect(() => {
    if (isExploding === false) {
      resetElements();
    }
  }, [isExploding]);

  return (
    <div
      id={"bomb"}
      ref={ref}
      style={{
        position: "absolute",
        width: isExploding ? 100 : 50,
        height: isExploding ? 100 : 50,
        backgroundImage: isExploding
          ? "url(" + explosion + ")"
          : "url(" + blackbomb + ")",
        backgroundSize: "cover",
        left: isExploding ? x - 25 : x,
        top: isExploding ? y - 15 : y,
        textAlign: "center ",
        opacity: readyCounter ? 1 : 0.6,
      }}
      onMouseUp={readyCounter ? countDown : null}
    >
      {" "}
      {text}{" "}
    </div>
  );
};

export default Bomb;
