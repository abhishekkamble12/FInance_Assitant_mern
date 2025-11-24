import React, { createContext, useState } from "react";

// 1️⃣ Create Context
export const UserContext = createContext();

// 2️⃣ Create Provider Component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const updateUser = (user) => {
    setUser(user);
  };

  const clearUser = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};
