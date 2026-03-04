import { createContext, useContext, useState, useEffect } from "react";
import API from "../api/axios";

// create context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // for ensure user loggin or logged out

  const [loading, setLoading] = useState(true);

  //   use useEffect for taking data from localstorage becouse after refresh react reset but localstorage doesn't . Auto login if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // when login

  const login = async (email, password) => {
    const { data } = await API.post("/user/login", { email, password });

    //   set token and user in localstorage
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    setUser(data.user);
  };
  // when register

  const register = async (name, email, password) => {
    const { data } = await API.post("/user/register", {
      name,
      email,
      password,
    });
   
  };

  // for logout

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
