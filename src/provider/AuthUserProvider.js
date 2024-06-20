import React, { createContext, useState } from "react";
import { getAuthUserFromStorage } from "../util/authUser";

export const AuthUserContext = createContext();

export const AuthUserProvider = ({ children }) => {
  const user = getAuthUserFromStorage();
  const [authUser, setAuthUser] = useState(user);

  return (
    <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default AuthUserProvider;
