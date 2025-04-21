import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../../database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [login, setLogin] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkLoginState = async () => {
      try {
        const storedLoginState = await AsyncStorage.getItem("userLoginState");
        if (storedLoginState === "true") {
          setLogin(true);
        }
      } catch (error) {
        console.error("Error checking login state:", error);
      }
    };
    checkLoginState();
  }, []);

  const handleRegister = async (email: string, password: string) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log("User registered:", userCredential.user);
      await AsyncStorage.setItem("userLoginState", "true");
      setLogin(true);
      setError(null);
    } catch (error: any) {
      console.error("Error during registration:", error);
      setError(error.message);
      throw error;
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      // console.log("User logged in:", userCredential.user);
      await AsyncStorage.setItem("userLoginState", "true");
      setLogin(true);
      setError(null);
    } catch (error: any) {
      console.error("Error during login:", error);
      setError(error.message);
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      await AsyncStorage.removeItem("userLoginState");
      setLogin(false);
      setError(null);
    } catch (error: any) {
      console.error("Error during logout:", error);
      setError(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{ login, error, handleLogin, handleRegister, handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
