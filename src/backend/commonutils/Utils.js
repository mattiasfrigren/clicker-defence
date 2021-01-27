import Punch from "../resoruces/images/icons/punch.png";
import Healing from "../resoruces/images/icons/healing.png";
import Lightning from "../resoruces/images/icons/lightning.png";
import Moneybag from "../resoruces/images/icons/moneybag.png";
import Randompotion from "../resoruces/images/icons/randompotion.png";
import Scary from "../resoruces/images/icons/scary.png";
import Attack from "../resoruces/images/icons/attack.png";
import Random from "../resoruces/images/icons/random.png";
import Bomb from "../resoruces/images/icons/bomb.png";
import Skull from "../resoruces/images/icons/skull.png"

const gameInfo =<div> <p className ="infoTag"> Welcome to Clicker Defence!  <br/> click start to send in the next Wave of enemies use all your skill (and luck) to reach as far as u can! </p> </div>; 
const thunderInfo = <div> <img className ="infoIcon" src={Lightning}/> <p className= "infoTag"> Zeus is an asshole, but dont say to his face. 
<br/> If you must.. be prepared to face the consequences and loose halv your current health. <br/>
also you can only use this 5 times.
</p></div>;
const svenInfo = <div> <img className ="infoIcon" src={Scary}/> <p className= "infoTag"> Sven is a female demon but chose the name Sven just so when she kills males the last thing
they are going to think is "shit! Sven for a female makes no sense" *dies* <br/> you can move her around the map as you
 like but if you click here off-cooldown she will use her breath attack on all the enemies. 10sec cooldown
</p></div>;
const diceInfo = <div> <img className ="infoIcon" src={Random}/> <p className= "infoTag"> Roll the Dice if you dare! 
<br/> you might get very lucky... <br/> but you might alos lose alot of gold. 30sec cooldown</p></div>;
const bombInfo = <div> <img className ="infoIcon" src={Bomb}/> <p className= "infoTag"> This is a bomb <br/><br/> 
drag it where you want it to explode and in 3sec it will detonate. <br/>10sec cooldown </p></div>;
const earthquakeInfo = <div> <img className ="infoIcon" src={Skull}/> <p className= "infoTag"> this earthquake will cause the enemies to lose half of there maximun health..<br/>
alos the screen will shake just a little bit
</p></div>;
const punchInfo = <div> <img className ="infoIcon" src={Punch}/> <p className= "infoTag"> Increases your click damage </p></div>;
const critInfo = <div> <img className ="infoIcon" src={Attack}/> <p className= "infoTag"> Increases your criticalstrike chance </p></div>;
const healingInfo = <div> <img className ="infoIcon" src={Healing}/> <p className= "infoTag"> Increases your health</p></div>;
const incomeInfo = <div> <img className ="infoIcon" src={Moneybag}/> <p className= "infoTag"> Increases the gold you get from killing enemies</p></div>;
const potionInfo = <div> <img className ="infoIcon" src={Randompotion}/> <p className= "infoTag"> this potion will buy you a random player upgrade. <br/>
(damage, critchance, health and enemievalue)
</p></div>;

export const infoArray = [gameInfo,thunderInfo,svenInfo,diceInfo,bombInfo,earthquakeInfo,punchInfo,critInfo,healingInfo,incomeInfo,potionInfo];
 