import React, {useContext, useState, useEffect, useRef} from 'react'
import {PlayerContext} from '../context/playerContext';
import PopUp from './popupComp';

const ButtonComponent = ({id, className, leftPos, topPos, imageSrc }) => {

  const playerContext = useContext(PlayerContext);
  const [isPopUpShown, setIsPopUpShown] = useState(false)
  

  const [costDamageMultiplyer, setCostDamageMultiplyer] = useState(1.2);
  const [playerDamage, setPlayerDamage] = useState(1);
  const [playerHealth, setPlayerHealth] = useState(1);
  const [playerGold, setPlayerGold] = useState(1);

  const buyDamage =() =>{
    const cost =10;
    console.log(costDamageMultiplyer)
    if(playerGold>= (cost * costDamageMultiplyer)){
      playerContext.setPlayerAttribute({"money": (playerGold - (cost*costDamageMultiplyer))});
      setCostDamageMultiplyer(costDamageMultiplyer + 0.4);
      playerContext.setPlayerAttribute({"damage":(playerDamage +2)})
      
    }
    else{
      console.log(playerGold + " not enough money")
    }
    console.log(costDamageMultiplyer);
}

useEffect(()=>{
  playerContext.getPlayerValue(setPlayerDamage,"admin","damage");
  playerContext.getPlayerValue(setPlayerHealth,"admin","health");
  playerContext.getPlayerValue(setPlayerGold,"admin","money");

})

  return (  
    <div>
      
<button id={id}
key={Math.random() * 100000000}
className = {className}
onClick ={buyDamage}
style={{ left: leftPos + "vw", top: topPos + "vh" }}
onMouseEnter={()=> setIsPopUpShown(true)}
onMouseLeave ={()=> setIsPopUpShown(false)}
>
<img src ={imageSrc}
alt={imageSrc}
className ={className}
>
</img>
</button>
{isPopUpShown ? (<PopUp 
key={Math.random() * 100000000}
id={id}
content={ (10 * costDamageMultiplyer) + " current cost"}
/>) :  (<></>) }
</div>
  );
};

export default ButtonComponent;