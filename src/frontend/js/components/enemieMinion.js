import React,{useState, useEffect, Component} from 'react';
import {GameMap} from '../../../backend/data/gamemap';

 const Minion = () =>{

    let [moveX, setMoveX] = useState(0);
    let [moveY, setMoveY] = useState(0);
    let [moveSpeedY, setMoveSpeedY] = useState(1);
    let [moveSpeedX, setMoveSpeedX] = useState(0);
    let [minionHealth, setMinionHealth] = useState(10);
    let [isDead, setDead] = useState(false);

    const getDirection = () =>{
        
        let elemDir = (moveSpeedY ===1 || moveSpeedX ===1) ? 16 : -16;
        let elem = (moveSpeedY ===1 || moveSpeedY ===-1) ? document.getElementById(((moveY +elemDir) +":"+(moveX))) : document.getElementById(((moveY) +":"+(moveX +elemDir))) ;
    
        if(elem!==null){
           
           if(elem.className ==="grass"){
               
               
            let leftElem = document.getElementById(((moveY) +":"+(moveX-16)));
            
            let righttElem = document.getElementById(((moveY) +":"+(moveX+16)));
            
            let bottomElem = document.getElementById(((moveY +16) +":"+(moveX)));
        
            let topElem = document.getElementById(((moveY -16) +":"+(moveX)));
      {/* send right*/}
            if(((bottomElem.className==="grass") && righttElem.className ==="water" && (moveSpeedY ===1 || moveSpeedX ===1)) ||
             (righttElem.className==="water" && leftElem.className==="grass" && topElem.className==="grass" && moveSpeedY===-1)){
        setMoveSpeedY(moveSpeedY = 0);
        setMoveSpeedX(moveSpeedX = 1);
            }
            
            else if((righttElem.className==="grass" && topElem.className==="grass" && bottomElem.className==="water" && leftElem.className==="water" && moveSpeedY!==-1) || 
            leftElem.className==="grass" && topElem.className==="grass" && bottomElem.className ==="water" && moveSpeedX ===-1){
                setMoveSpeedY(moveSpeedY = 1);
                setMoveSpeedX(moveSpeedX = 0);
                        {/* send bottom*/}
            }

            else if((bottomElem.className==="grass" && righttElem.className==="grass" && leftElem.className==="water" && moveSpeedY===1) ||
            bottomElem.className==="water" && righttElem.className==="grass" && leftElem.className==="water" && topElem.className==="grass" && moveSpeedY ===-1){
                setMoveSpeedY(moveSpeedY = 0);
                setMoveSpeedX(moveSpeedX = -1);
         {/* send left*/}

            }
            else if((righttElem.className ==="grass" && bottomElem.className==="grass" && topElem.className==="water" && leftElem!==null) ||
            (righttElem.className==="water" && bottomElem.className ==="grass" && leftElem.className ==="grass" && topElem.className==="water" && moveSpeedX===-1)){
                setMoveSpeedY(moveSpeedY = -1);
                setMoveSpeedX(moveSpeedX = 0);
             {/* send top*/}
            }
        
         
        }
        }
        
        setMoveX(moveX += moveSpeedX)
        setMoveY( moveY += moveSpeedY)

    }

    const hitMinion = () =>{
        console.log(minionHealth)
        setMinionHealth(minionHealth = minionHealth -1);
        if(minionHealth<=0){
            setDead(true);
        }
        console.log(isDead)
    }
    


    useEffect (() => {

        const moveMinion = setInterval(() =>
            getDirection()
        ,10);
        return () => {clearInterval(moveMinion)}
    },[moveSpeedX, moveSpeedY,moveX,moveY]);

    return (
    
        < div  
        className="minion"
        id="enemie"
        onClick = {hitMinion}
        style ={{left: moveX + "px", top: moveY + "px"}}
        >
        </div>
        
    );


};

export default Minion;