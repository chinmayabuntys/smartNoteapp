import { createContext, useState } from "react";

export const Context = createContext();
const ContextProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const login = (token) => {
    localStorage.setItem("token", token);
    setToken(token);
  };
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
  };
  return (
    <>
      <Context.Provider value={{ token, login, logout }}>
        {children}
      </Context.Provider>
    </>
  );
};
export default ContextProvider;
