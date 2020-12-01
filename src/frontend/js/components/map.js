import React, { useEffect } from 'react';
import Tile from './maptile';
import {GameMap} from '../../../backend/data/gamemap';
import Minion from './enemieMinion';
import {GrasPositionArray} from '../../../backend/data/gamemap';


const Map = () =>{

    const drawMap =     
    
    GameMap.map(function (row, index) {     
        var i = index;
      
        return row.map(function(cell,index){

            return(
                <Tile id= {(i*16) +":"+ (index *16)}
                className= {(cell ===1) ? "water" : "grass"}
                leftPos = {16*index}
                topPos =  {16 *i}
                key={Math.random()*100000000}
                />
               
            )
            
        });
       
    });

  
return(
    <div>
       
    {drawMap} <Minion/>
  
    </div>
    );
};

export default Map;