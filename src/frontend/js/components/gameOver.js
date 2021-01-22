import React, {useState, useContext, useEffect} from "react";
import {PlayerContext} from '../context/playerContext';
import MenuButton from './menuButtonComp';

const GameOver = () => {

    const [visable, setVisable] = useState(false);

const playerContext = useContext(PlayerContext);

const content = "Game Over"

const resetGame = () =>{
   playerContext.resetPlayerValues();
   setVisable(false);
   playerContext.setIsGameOver(false);
}


useEffect(()=>{
    if(playerContext.isGameOver){
        setVisable(true);
    }
},[playerContext.isGameOver])

  return  ( visable ?
    
    <div id={"gameoverDiv"}
  ><p id ="gameoverTag">
    {content}
  </p>
  <MenuButton
  id= {"resetButton"}
  onClick= {resetGame}
  name ={"Reset Game"}
  />
    </div>

  : <></> ) ;
};

export default GameOver;
