import React from "react";

const PopUp = ({id, content}) => {
 


  return (
    
    <div id={id} className={"popUp"}
  ><p>
    {content}
  </p>
    </div>
  );
};

export default PopUp;
