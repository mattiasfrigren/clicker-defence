import React, { createContext, useEffect, useState } from "react";

export const PlayerContext = createContext();

export default ({ children }) => {
  const [damage, setDamage] = useState(1);
  const [playerHealth, setPlayerHealth] = useState(10);
  const [playerGold, setPlayerGold] = useState(0);

  return (
    <div>
      <PlayerContext.Provider
        value={{
          damage,
          setDamage,
          playerHealth,
          setPlayerHealth,
          playerGold,
          setPlayerGold,
        }}
      >
        {children}
      </PlayerContext.Provider>
    </div>
  );
};
