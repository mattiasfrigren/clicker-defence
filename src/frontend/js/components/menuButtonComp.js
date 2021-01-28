import React, { useContext } from 'react'
import { PlayerContext } from '../context/playerContext';

const MenuButton = ({id, className, onClick, leftPos, topPos, name }) => {
  
  const playerContext = useContext(PlayerContext);
  return (  

<button id={id}
className = {className}
onClick ={onClick}
style={{ left: leftPos + "vw", top: topPos + "vh" }}
disabled={playerContext.isGameRunning && name ==="Info" ? true :false}
>
{name}
</button>
  );
};

export default MenuButton;