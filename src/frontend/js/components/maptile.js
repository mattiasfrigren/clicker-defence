import React from "react";

const Tile = ({ id, className, leftPos, topPos }) => {
  return (
    <div
      id={id}
      className={className}
      style={{ left: leftPos + "vw", top: topPos + "vh" }}
    ></div>
  );
};

export default Tile;
