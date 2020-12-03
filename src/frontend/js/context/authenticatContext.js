import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export default ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(true);

  return (
    <div>
      <AuthContext.Provider value={{ isAuthenticated, setAuthenticated }}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};
