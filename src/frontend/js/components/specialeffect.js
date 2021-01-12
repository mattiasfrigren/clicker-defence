import React, { useContext,  useEffect, useState } from "react";
import { PlayerContext } from "../context/playerContext";
import Thunder from '../../../backend/resoruces/images/effects/Thunder.gif';

const SpecialEffect = () =>{

    const playerContext = useContext(PlayerContext);
    const [useLighting, setUseLightning] = useState(false)

    const lightningEffect = useLighting ? (
        <img src={Thunder}
        alt={Thunder}
        className={"specialEffects"}
        >
        </img>
    ) :(<></>);

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
            {lightningEffect}
        </div>
    );
}

export default SpecialEffect;