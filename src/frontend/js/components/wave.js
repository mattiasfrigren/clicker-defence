import React, {useEffect, useState} from 'react';
import Minion from "./enemieMinion";


const Wave = () =>{


let [wave, setWave] = useState([]);
let [numberOfMinions, setNumberOfMinions] = useState(13);

const addWave = () => {
  setWave((wave) => [...wave, <Minion />]);
  setNumberOfMinions(numberOfMinions = numberOfMinions +1);
  console.log(wave);
};

const nextWave =() =>{
  console.log(document.getElementById("87:99"))
    setNumberOfMinions(0);
    setWave([]);
}

const currentWave = wave.map((minion, index) => (
    <div key={index}>{minion}</div>
  ));

useEffect(()=>{
    if(numberOfMinions<13){
        setTimeout(()=>addWave(),1000);
        
    }
},[numberOfMinions]);

return(
    <div>

{currentWave}
  <button disabled= {(numberOfMinions !==13)} onClick={nextWave}> </button>

  </div>)
}
export default Wave;