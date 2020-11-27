import React from 'react';

const Tile = ({id, className , leftPos, topPos}) =>{

    return(
        <div
        id={id}
        className={className}
        style ={{left: leftPos + "px", top: topPos + "px"}}
        >
        </div>
    );
};

export default Tile;