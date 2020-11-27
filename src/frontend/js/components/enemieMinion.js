import React,{useState, useEffect} from 'react';


const Minion = () =>{

    let [moveX, setMoveX] = useState(0);
    let [moveY, setMoveY] = useState(0);
    let [moveSpeed, setMoveSpeed] = useState(0);
    let [position, setPosition] = useState(32);

    const getDirection = () =>{

     
        setMoveX(position)
            setMoveY( moveY += moveSpeed)
    }

    
    useEffect (() => {

        const moveMinion = setInterval(() =>{
            getDirection();
        },100);
        return () => clearInterval(moveMinion);
    },[position]);
    return (
        <div  
        className="minion"
        style ={{left: moveX + "px", top: moveY + "px"}}
        >

        </div>
    );


};

export default Minion;