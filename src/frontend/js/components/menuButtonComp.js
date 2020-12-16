import React from 'react'

const MenuButton = ({id, className, onClick, leftPos, topPos, name }) => {
  return (  

<button id={id}
className = {className}
onClick ={onClick}
style={{ left: leftPos + "vw", top: topPos + "vh" }}

>
{name}
</button>
  );
};

export default MenuButton;