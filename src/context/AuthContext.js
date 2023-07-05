import { createContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const userFromLocalStorage = localStorage.getItem("user");
let initialUser = null;

try {
  initialUser = JSON.parse(userFromLocalStorage);
} catch (error) {
  console.error("Erreur lors de la conversion JSON :", error);
}

const INITIAL_STATE = {
  currentUser: initialUser,
  role: null, // Ajout de la propriété "role"
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser: state.currentUser, role: state.role, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
