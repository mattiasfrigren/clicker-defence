import React, { useContext,  useEffect, useState } from "react";
import { PlayerContext } from "../context/playerContext";
import EarthQuake from './earthquake';
import Thunder from '../../../backend/resoruces/images/effects/Thunder.gif';
import demonEffect from '../../../backend/resoruces/images/effects/demonEffect.gif';
import rocks from '../../../backend/resoruces/images/effects/rocks.png';

const SpecialEffect = () =>{

    const playerContext = useContext(PlayerContext);
    const [useLighting, setUseLightning] = useState(false);
    const [useCorruption, setUseCorruption] = useState(false);
    
    const lightningEffect = useLighting ? (
        <img src={Thunder}
        alt={Thunder}
        className={"specialEffects"}
        >
        </img>
    ) :(<></>);

    const corruptionEffect = useCorruption ? (
        <div
        className={"specialEffects"}
        id={"demonEffects"}
        >
        <img src={demonEffect}
        alt={demonEffect}
        id={"demonEffect"}
        >
        </img>
        </div>
    ) 
    :(<></>)


    useEffect(()=>{
        if(playerContext.corruption){
            setUseCorruption(true)
            setTimeout(()=>{
                setUseCorruption(false);
            },3000)
        }
    },[playerContext.corruption])

    useEffect(()=>{
       if(playerContext.isThunder){
           setUseLightning(true)
         setTimeout(()=>{
             setUseLightning(false)
         },800)
       }
    },[playerContext.isThunder])


    return(
        <div>
           {playerContext.isEarthQuake ? <EarthQuake children ={<img id="earthquake" src={rocks}></img>} /> :<></> } 
         
            {lightningEffect}
            {corruptionEffect}
        </div>
    );
}

export default SpecialEffect;