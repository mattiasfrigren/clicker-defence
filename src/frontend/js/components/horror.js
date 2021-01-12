import React,  { useContext,  useEffect, useState, useRef} from "react";
import { PlayerContext } from "../context/playerContext";
import UseDragging from './draggable';



const Sven = () => {
    const [ref, x, y, isDragging] = UseDragging();
    const [waterTiles, setWaterTiles] =useState([]);

    const getWaterTiles = () =>{
        setWaterTiles( document.getElementsByClassName("water"));
        
        for (let index = 0; index < waterTiles.length; index++) {
            console.log(waterTiles[index]);
            
        }
        console.log(waterTiles.length)
        
    }

    const castCorruptTile =()=>{
        let tileToCorrupt = waterTiles[Math.floor(Math.random() *waterTiles.length)];
        {/** 
        (tileToCorrupt.classList.remove("water"));
        (tileToCorrupt.classList.add("corrupt"))
        console.log(tileToCorrupt.classList)
        */}
       
    }
  
    useEffect(()=>{

      setTimeout(() => {
getWaterTiles();
castCorruptTile();
      }, 3000);
    },[]);
    return (
      <div
        ref={ref}
        style={{
          position: "absolute",
          width: 50,
          height: 50,
          background: isDragging ? "blue" : "gray",
          left: x,
          top: y,
        }}
      >{isDragging ? "Moveing":" Still"}</div>
    );
  
};



export default Sven;
