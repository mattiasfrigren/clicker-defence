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
{/** gör om så att detta kan lösas i själva buttonComp. bättre att man har en hover effect där */}
export default PopUp;
