import React from "react";

const Tile = ({ id, className, leftPos, topPos, imageSrc }) => {
  return (
    <div
      id={id}
      className={className}
      style={{ left: leftPos + "vw", top: topPos + "vh" }}
    >
<img src ={imageSrc}
alt={imageSrc}
className ={className}
></img>
    </div>
  );
};

export default Tile;
