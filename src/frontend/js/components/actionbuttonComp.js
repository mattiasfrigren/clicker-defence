import React, {useContext, useState, useEffect, useRef} from 'react'
import {PlayerContext} from '../context/playerContext';
import PopUp from './popupComp';

const ActionButtonComponent = ({id, className, leftPos, topPos, imageSrc, iconName }) => {

  const playerContext = useContext(PlayerContext);
  const [isPopUpShown, setIsPopUpShown] = useState(false)
  

  const [costDamageMultiplyer, setCostDamageMultiplyer] = useState(1.2);
  const [playerDamage, setPlayerDamage] = useState(1);
  const [playerHealth, setPlayerHealth] = useState(1);
  const [playerGold, setPlayerGold] = useState(1);
  const [playerCritChance, setPlayerCritChance] = useState(0);

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

const buyCriticalChance = () =>{

  const cost =10;
  if(playerGold>= (cost * costDamageMultiplyer)){
    playerContext.setPlayerAttribute({"money": (playerGold - (cost*costDamageMultiplyer))});
    setCostDamageMultiplyer(costDamageMultiplyer + 0.4);
    playerContext.setPlayerAttribute({"cirticalChance":(playerCritChance +0.5)})
    
  }
  else{
    console.log(playerGold + " not enough money")
  }
}

const buyHealth = () =>{
  const cost =10;
  if(playerGold>= (cost * costDamageMultiplyer)){
    playerContext.setPlayerAttribute({"money": (playerGold - (cost*costDamageMultiplyer))});
    setCostDamageMultiplyer(costDamageMultiplyer + 0.4);
    playerContext.setPlayerAttribute({"health":(playerHealth +1)})
    
  }
  else{
    console.log(playerGold + " not enough money")
  }
}

const buyIncome = () =>{
  const cost =10;
  if(playerGold>= (cost * costDamageMultiplyer)){
    playerContext.setPlayerAttribute({"income": (playerGold - (cost*costDamageMultiplyer))});
    setCostDamageMultiplyer(costDamageMultiplyer + 0.4);
    playerContext.setPlayerAttribute({"health":(playerHealth +1)})
    
  }
  else{
    console.log(playerGold + " not enough money")
  }

}



const randomPotion = () =>{
  var randomNumber = Math.floor(Math.random()*5);
  switch (randomNumber) {
    case 1:
      buyDamage();
      console.log(buyDamage.name)
      break;
  case 2:
    buyCriticalChance();
    console.log(buyCriticalChance.name)
    break;
    default:
      buyHealth();
      console.log(buyHealth.name)
      break;
  }

}


const renderButton = (  
  <div>
    
<button id={id}
key={Math.random() * 100000000}
className = {className}
onClick ={ iconName ==="Punch" ? buyDamage : (iconName ==="CriticalStrike") ? buyCriticalChance : (iconName ==="Healing") ? buyHealth : randomPotion}
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

useEffect(()=>{
  playerContext.getPlayerValue(setPlayerDamage,"damage");
  playerContext.getPlayerValue(setPlayerHealth,"health");
  playerContext.getPlayerValue(setPlayerGold,"money");
  playerContext.getPlayerValue(setPlayerCritChance,"cirticalChance");
  
})

  return (
   <div> {renderButton}</div>);
};

export default ActionButtonComponent;