import { createContext, useContext, useState } from "react";
import { users } from "../helpers/users";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    users.find((u) => u._id === "u1")
  );

  const updateCurrentUser = (updatedData) => {
    setCurrentUser((prev) => ({ ...prev, ...updatedData }));

    const index = users.findIndex((u) => u._id === currentUser._id);
    if (index !== -1) {
      users[index] = { ...users[index], ...updatedData };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        updateCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);