import React, {useState, useContext, useEffect, useRef} from 'react'
import {PlayerContext} from '../context/playerContext';
import {infoArray} from '../../../backend/commonutils/Utils';



const InfoPage = () =>{

    const [pageNumber, setPageNumber] = useState(0);
    const [currentPage, setCurrentpage] =useState(infoArray[0])
    const playerContext = useContext(PlayerContext);

    const next = () =>{
        setPageNumber(pageNumber +1);
    }
  
    const prev = () =>{
        setPageNumber(pageNumber -1);  
    }
    useEffect(()=>{
        setCurrentpage(infoArray[pageNumber]);
      
    },[pageNumber])

    return( !playerContext.isGameRunning ?
        <div id="infoDiv" >
            {currentPage}
            <button className="infoButton" onClick={prev} disabled={pageNumber===0 ?true :false}> Prev</button>
            <button className="infoButton" onClick={next} disabled={pageNumber===infoArray.length-1 ?true :false}> Next</button>
        </div>
        :<></>
    ) 

}

export default InfoPage;