import React, {useContext, useState, useEffect, useRef} from 'react'
import {PlayerContext} from '../context/playerContext';
import PopUp from './popupComp';

const ActionButtonComponent = ({id, className, leftPos, topPos, imageSrc, iconName }) => {

  const playerContext = useContext(PlayerContext);
  const [isPopUpShown, setIsPopUpShown] = useState(false)
  
  const [minionWealthCost, setMinionWealthCost] = useState(1);
  const [costDamageMultiplyer, setCostDamageMultiplyer] = useState(1);
  const [playerDamage, setPlayerDamage] = useState(1);
  const [playerHealth, setPlayerHealth] = useState(1);
  const [playerGold, setPlayerGold] = useState(1);
  const [playerCritChance, setPlayerCritChance] = useState(0);
  const [minionWealth, setMinionWealth] = useState(1);
  const [costCritMultiplyer, setCostCritMultiplyer] = useState(1);
  const [costHealthMultiplyer, setCostHealthMultiplyer] = useState(1);
  const [costPotionMultiplyer, setCostPotionMultiplyer] = useState(1);

  const minionWealthInfo = "current cost: " +(minionWealthCost *30) + " coinValue " +minionWealth;
  const damageInfo = "current cost: " +(costDamageMultiplyer *20) + "damage: " +playerDamage;
  const critInfo = "current cost: " +(costCritMultiplyer *20) + " critChance: " +playerCritChance;
  const healthInfo = "current cost: " +(costHealthMultiplyer *10) + " health: " +playerHealth;
  const potionInfo = "current cost: " +(costPotionMultiplyer *20) + " upgrades a random playerAttribute";
 


  const buyDamage =() =>{
    const cost =20;
    if(playerGold>= (cost * costDamageMultiplyer)){
      playerContext.setPlayerAttribute({money: (playerGold - (cost*costDamageMultiplyer))});
      playerContext.setPlayerItemAttribute("upgradeValues",{dmgMultiplyer : (costDamageMultiplyer + 1)})
      playerContext.setPlayerAttribute({"damage":(playerDamage +3)})
      
    }
    else{
      console.log(playerGold + " not enough money")
    }
    console.log(costDamageMultiplyer);
}

const buyCriticalChance = () =>{

  const cost =20;
  if(playerGold>= (cost * costCritMultiplyer)){
    playerContext.setPlayerAttribute({money: (playerGold - (cost*costCritMultiplyer))});
    playerContext.setPlayerItemAttribute("upgradeValues",{critMultiplyer : (costCritMultiplyer + 1)})
    playerContext.setPlayerAttribute({"criticalChance":(playerCritChance +0.5)})
    
  }
  else{
    console.log(playerGold + " not enough money")
  }
}

const buyHealth = () =>{
  const cost =10;
  if(playerGold>= (cost * costHealthMultiplyer)){
    playerContext.setPlayerAttribute({money: (playerGold - (cost*costHealthMultiplyer))});
    playerContext.setPlayerItemAttribute("upgradeValues",{healthMultiplyer : (costHealthMultiplyer + 1)})
    playerContext.setPlayerAttribute({"health":(playerHealth +1)})
    
  }
  else{
    console.log(playerGold + " not enough money")
  }
}

const buyMinionWealth = () =>{
  const cost =30;
  if(playerGold>= (cost * minionWealthCost)){
    playerContext.setPlayerAttribute({money: (playerGold - (cost *minionWealthCost))});
    playerContext.setPlayerItemAttribute("minionValues",{coinWorthMultiplyer : (minionWealth + 1)})
    playerContext.setPlayerItemAttribute("minionValues",{coinWorthCostMultiplyer : (minionWealthCost + 1)})

  }
  else{
    console.log(playerGold + " not enough money")
  }
}



const randomPotion = () =>{
  const cost =30; if(playerGold >= (cost *costPotionMultiplyer)){   
    playerContext.setPlayerAttribute({money: (playerGold - (cost *costPotionMultiplyer))});
    playerContext.setPlayerItemAttribute("upgradeValues",{potionMultiplyer : (costPotionMultiplyer + 1)})
    var randomNumber = Math.floor(Math.random()*5);
  switch (randomNumber) {
    case 1:
      playerContext.setPlayerAttribute({"damage":(playerDamage +3)})
      console.log(buyDamage.name)
      break;
  case 2:
    playerContext.setPlayerAttribute({"criticalChance":(playerCritChance +0.5)})
    console.log(buyCriticalChance.name)
    break;
    case 3:
      playerContext.setPlayerItemAttribute("minionValues",{coinWorthMultiplyer : (minionWealth + 1)})
      console.log(buyMinionWealth.name)
    break;
    default:
      playerContext.setPlayerAttribute({"health":(playerHealth +1)})
      console.log(buyHealth.name)
      break;
  }
}
else {console.log(playerGold + " not enough money")}

}


const renderButton = (  
  <div>
    
<button id={id}
key={Math.random() * 100000000}
className = {className}
onClick ={ iconName ==="Punch" ? buyDamage : (iconName ==="CriticalStrike") ? buyCriticalChance : 
(iconName ==="Healing") ? buyHealth : (iconName==="MoneyBag") ? buyMinionWealth : randomPotion}

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
content={ (iconName==="MoneyBag") ? minionWealthInfo : (iconName==="Punch") ? damageInfo : 
(iconName==="CriticalStrike") ? critInfo : (iconName==="Healing") ? healthInfo : potionInfo }
/>) :  (<></>) }
</div>
);

useEffect(()=>{
  playerContext.getPlayerValue(setPlayerDamage,"damage");
  playerContext.getPlayerValue(setPlayerHealth,"health");
  playerContext.getPlayerValue(setPlayerGold,"money");
  playerContext.getPlayerValue(setPlayerCritChance,"criticalChance");
  
  playerContext.getPlayerValue(setMinionWealthCost, "minionValues/coinWorthCostMultiplyer");
  playerContext.getPlayerValue(setMinionWealth, "minionValues/coinWorthMultiplyer");
  
  playerContext.getPlayerValue(setCostHealthMultiplyer, "upgradeValues/healthMultiplyer");
  playerContext.getPlayerValue(setCostCritMultiplyer, "upgradeValues/critMultiplyer");
  playerContext.getPlayerValue(setCostDamageMultiplyer, "upgradeValues/dmgMultiplyer");
  playerContext.getPlayerValue(setCostPotionMultiplyer, "upgradeValues/potionMultiplyer");

})

  return (
   <div> {renderButton}</div>);
};

export default ActionButtonComponent;