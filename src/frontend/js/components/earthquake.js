import React, {useContext} from 'react'
import {ShakeCrazy} from 'reshake';
import {PlayerContext} from '../context/playerContext';
const EarthQuake = ({children}) =>{
    const playerContext = useContext(PlayerContext);
    return(
        <ShakeCrazy q={300} active ={playerContext.isEarthQuake} trigger ={playerContext.isEarthQuake ? false :true}>{children}</ShakeCrazy>
    )
}

export default EarthQuake;