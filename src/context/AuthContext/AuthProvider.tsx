import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../interfaces";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // const [user, setUser] = useState<User>({
  //   email: "",
  //   password: "",
  // });
  // const [loading, setLoading] = useState(true);
  const [login, setLogin] = useState(false);

  // Simula verificar sesión (puedes conectar con AsyncStorage o Firebase aquí)
  // useEffect(() => {
  //   const checkUser = async () => {
  //     // await loadUserFromStorage();
  //     setUser(null); // O un usuario simulado
  //     setLoading(false);
  //   };
  //   checkUser();
  // }, []);

  // const handleLogin = async (credentials: User) => {
  const handleLogin = () => {
    // Aquí iría tu lógica real de login
    // setUser(credentials);
    setLogin(true);
  };

  const handleLogout = async () => {
    // Lógica de logout
    // setUser({
    //   email: "",
    //   password: "",
    // });
    setLogin(false);
  };

  return (
    <AuthContext.Provider value={{ login, handleLogin }}>
      {children}
    </AuthContext.Provider>
  );
};
