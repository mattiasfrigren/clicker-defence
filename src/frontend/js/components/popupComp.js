import React from "react";

const PopUp = (id, className, content) => {
  return (
    <div id={id} className={className}>
      <p>{content}</p>
    </div>
  );
};

export default PopUp;
