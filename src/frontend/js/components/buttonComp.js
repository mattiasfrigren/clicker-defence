import React from 'react'

const ButtonComponent = ({id, className, onClick, leftPos, topPos, imageSrc }) => {
  return (  
<button id={id}
className = {className}
onClick ={onClick}
style={{ left: leftPos + "vw", top: topPos + "vh" }}
>
<img src ={imageSrc}
alt={imageSrc}
className ={className}
>
</img>
</button>
  );
};

export default ButtonComponent;