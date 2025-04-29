import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../../database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const provider = new GoogleAuthProvider();

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

  const handleRegister = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User registered:", userCredential.user);
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

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      if (!token) {
        throw new Error("No se pudo obtener el token de acceso");
      }

      console.log("User logged in with Google:", user);
      console.log("Google Access Token:", token);

      await AsyncStorage.setItem("userToken", token);
      await AsyncStorage.setItem("userLoginState", "true");
      setLogin(true);
      setError(null);
    } catch (error: any) {
      console.error("Error during Google login:", error);
      setError(error.message);
      throw error;
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
