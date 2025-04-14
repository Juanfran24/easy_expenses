import React, { useState } from "react";
import { AuthContext } from "./AuthContext";
import { User } from "../interfaces";
import { auth } from "../../database";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

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

  const handleRegister = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered:", userCredential.user);
      setLogin(true);
    } catch (error) {
      console.error("Error during registration:", error);
      throw error;
    }
  };

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
    <AuthContext.Provider value={{ login, handleLogin, handleRegister, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};
