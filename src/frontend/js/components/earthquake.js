import React, {useContext} from 'react'
import {ShakeHard} from 'reshake';
import {PlayerContext} from '../context/playerContext';
const EarthQuake = ({children}) =>{
    const playerContext = useContext(PlayerContext);
    return(
        <ShakeHard q={300} active ={playerContext.isEarthQuake} trigger ={playerContext.isEarthQuake ? false :true}>{children}</ShakeHard>
    )
}

export default EarthQuake;