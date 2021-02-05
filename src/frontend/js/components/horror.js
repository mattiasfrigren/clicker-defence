import React,  { useContext,  useEffect, useState, useRef} from "react";
import { PlayerContext } from "../context/playerContext";
import UseDragging from './draggable';
import demon from '../../../backend/resoruces/images/itemImg/demonIdle.gif';
import attack from '../../../backend/resoruces/images/effects/demonAttack.gif';

const Sven = () => {
    const [ref, x, y, isDragging,setRefreshPos] = UseDragging(250, 0);
  
    const [attackReady, setAttackReady] = useState(false);
    const playerContext = useContext(PlayerContext);
    let timer=null;

 

  const castCorruption = () =>{
    if(attackReady){
    
    playerContext.setCorruption(true);
    setTimeout(()=>{
      playerContext.setCorruption(false);
      setAttackReady(false);
    },3000)
  }
  }


  
  useEffect(()=>{
    if(!attackReady){
      var castingTime =10;
      timer =setInterval(()=>{
        castingTime= castingTime -1;
        if(castingTime <=-1){
  clearInterval(timer);
  setAttackReady(true);
        }
      },1000)
    }
  },[attackReady])

    return (
      <div
      onClick={castCorruption}
        ref={ref}
        style={{
          position: "absolute",
          width: 100,
          height: 100,
          left: x,
          top: y,
          backgroundImage : playerContext.corruption ? "url("+attack+")" :"url(" + demon + ")",
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: attackReady ? "1" :"0.6", 
        }}
      >
        </div>
    );
  
};



export default Sven;
