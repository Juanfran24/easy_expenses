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
  User,
  onAuthStateChanged,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkLoginState = () => {
      try {
        onAuthStateChanged(auth, (user) => {
          if (user) {
            return setUser(user);
          }
          setUser(null);
        });
      } catch (error) {
        console.error("Error checking login state:", error);
        setError("Error checking login state");
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
      const user = userCredential.user;
      if (user) {
        await updateProfile(user, { displayName });
      }
      // await AsyncStorage.setItem("userLoginState", "true");
      // setUser(true);
    } catch (error: any) {
      console.error("Error during registration:", error);
      setError(error.message);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      // await AsyncStorage.setItem("userLoginState", "true");
      setUser(user);
    } catch (error: any) {
      console.error("Error during login:", error);
      setError(error.message);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error: any) {
      console.error("Error during logout:", error);
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      const user = result.user;

      if (!token) {
        throw new Error("No se pudo obtener el token de acceso");
      }

      console.log("User logged in with Google:", user);
      console.log("Google Access Token:", token);

      // setUser(true);
      setError(null);
    } catch (error: any) {
      console.error("Error during Google login:", error);
      setError(error.message);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        error,
        handleLogin,
        handleRegister,
        handleLogout,
        handleGoogleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
