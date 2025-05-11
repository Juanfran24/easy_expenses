import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../../database";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
} from "firebase/auth";
import { useGoogleAuth } from "@/src/hooks/useGoogleAuth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { handleGoogleAuth } = useGoogleAuth();

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
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      
      if (signInMethods.length > 0) {
        const error = new Error("Este correo ya está registrado");
        // @ts-ignore
        error.code = "auth/email-already-in-use";
        throw error;
      }
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      if (user) {
        await updateProfile(user, { displayName });
        await signOut(auth);
        setUser(null);
        await sendEmailVerification(user);
      }
    } catch (error: any) {
      console.error("Error durante el registro:", error);
      if (error.code === "auth/email-already-in-use") {
        setError("Este correo ya está registrado");
      } else if (error.code === "auth/weak-password") {
        setError("La contraseña es demasiado débil. Debe tener al menos 6 caracteres.");
      } else if (error.code === "auth/invalid-email") {
        setError("El formato del correo electrónico es inválido.");
      } else {
        setError(error.message);
      }
      throw error;
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      if (!user.emailVerified) {
        // Cerrar sesión pero no actualizar el estado de usuario todavía
        await signOut(auth);
        
        // Enviar un nuevo correo de verificación
        await sendEmailVerification(user);
        
        // Crear un error personalizado
        const error = new Error("Por favor, verifica tu correo electrónico antes de iniciar sesión. Se ha enviado un nuevo correo de verificación.");
        // @ts-ignore
        error.code = "auth/email-not-verified";
        throw error;
      }
      
      // Si llegamos aquí, el usuario está verificado y podemos establecer el estado
      setUser(user);
      setError(null);
      
    } catch (error: any) {
      if (error.code === "auth/email-not-verified") {
        setError("Por favor, verifica tu correo electrónico antes de iniciar sesión. Se ha enviado un nuevo correo de verificación.");
      } else if (error.code === "auth/user-not-found") {
        setError("Usuario no encontrado. Verifica el correo electrónico.");
      } else if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta. Inténtalo de nuevo.");
      } else if (error.code === "auth/invalid-email") {
        setError("Formato de correo electrónico inválido.");
      } else if (error.code === "auth/user-disabled") {
        setError("Esta cuenta ha sido deshabilitada. Contacta a soporte.");
      } else {
        setError(error.message || "Error al iniciar sesión. Inténtalo de nuevo.");
      }
      throw error;
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
      handleGoogleAuth();
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
