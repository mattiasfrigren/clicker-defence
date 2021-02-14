import React, {useState, useContext, useEffect} from "react";
import {PlayerContext} from '../context/playerContext';
import '../../css/gameovercss.css';
import MenuButton from './menuButtonComp';
import DeadPlayer from '../../../backend/resoruces/images/minionimgs/deadplayer.png';
import Jump from '../../../backend/resoruces/images/minionimgs/jump.gif';
const GameOver = () => {

    const [visable, setVisable] = useState(false);

const playerContext = useContext(PlayerContext);

const content = "Game Over"
const totalMinion =5;

const smirkingMinions = [...Array(totalMinion)].map(()=>{
  return( <img src={Jump} alt={Jump} className="jumpimg" ></img>)
})

const resetGame = () =>{
   playerContext.resetPlayerValues();
   setVisable(false);
   playerContext.setIsGameOver(false);
   playerContext.setResetGame(true);
   document.getElementById("Start0").disabled =false;
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
  <img id="deadplayerimg" src={DeadPlayer} alt={DeadPlayer}></img>
  <div id="smirkminiondiv">{smirkingMinions}</div>

  <MenuButton
  id= {"resetButton"}
  onClick= {resetGame}
  name ={"Reset Game"}
  />
    </div>

  : <></> ) ;
};

export default GameOver;
