import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../../database";
import { useStore } from "../../store";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
  onAuthStateChanged,
  fetchSignInMethodsForEmail,
  sendEmailVerification,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [unverifiedEmail, setUnverifiedEmail] = useState<string | null>(null);
  const loadCategories = useStore((state) => state.loadCategories);
  const loadTransactions = useStore((state) => state.loadTransactions);
  const loadPayments = useStore((state) => state.loadPayments);
  const store = useStore((state) => state);

  useEffect(() => {
    const checkLoginState = () => {
      setIsLoading(true);
      try {
        onAuthStateChanged(auth, async (user) => {
          if (user) {
            if (user.emailVerified) {
              setUser(user);
              await loadCategories();
              await loadTransactions();
              await loadPayments();
            } else {
              await signOut(auth);
              setUnverifiedEmail(user.email || null);
              setUser(null);
            }
          } else {
            setUser(null);
            store.reset();
          }
          setIsLoading(false);
        });
      } catch (error) {
        setError("Error checking login state");
        setIsLoading(false);
      }
    };
    checkLoginState();
  }, [user]);

  const handleRegister = async (
    email: string,
    password: string,
    displayName: string
  ) => {
    try {
      setError(null);

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
      const newUser = userCredential.user;

      if (newUser) {
        await updateProfile(newUser, { displayName });
        await sendEmailVerification(newUser);

        await signOut(auth);
        setUnverifiedEmail(email);
      }
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        setError("Este correo ya está registrado");
      } else if (error.code === "auth/weak-password") {
        setError(
          "La contraseña es demasiado débil. Debe tener al menos 6 caracteres."
        );
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
      setError(null);
      setUnverifiedEmail(null);

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      if (!user.emailVerified) {
        await signOut(auth);
        setUnverifiedEmail(email);
        const error = new Error(
          "Por favor, verifica tu correo electrónico antes de iniciar sesión. Se ha enviado un nuevo correo de verificación."
        );
        // @ts-ignore
        error.code = "auth/email-not-verified";
        throw error;
      }

      setUser(user);
      setError(null);
    } catch (error: any) {
      if (error.code === "auth/email-not-verified") {
        setError(
          "Por favor, verifica tu correo electrónico antes de iniciar sesión. Se ha enviado un nuevo correo de verificación."
        );
      } else if (error.code === "auth/user-not-found") {
        setError("Usuario no encontrado. Verifica el correo electrónico.");
      } else if (error.code === "auth/wrong-password") {
        setError("Contraseña incorrecta. Inténtalo de nuevo.");
      } else if (error.code === "auth/invalid-email") {
        setError("Formato de correo electrónico inválido.");
      } else if (error.code === "auth/user-disabled") {
        setError("Esta cuenta ha sido deshabilitada. Contacta a soporte.");
      } else {
        setError(
          error.message || "Error al iniciar sesión. Inténtalo de nuevo."
        );
      }
      throw error;
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      setUnverifiedEmail(null);
      store.reset();
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleGoogleLogin = async () => {
    // try {
    //   handleGoogleAuth();
    // } catch (error: any) {
    //   setError(error.message);
    // }
  };

  const handleResetPassword = async (email: string) => {
    try {
      setError(null);
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        setError("No existe una cuenta con este correo electrónico");
      } else if (error.code === "auth/invalid-email") {
        setError("Formato de correo electrónico inválido");
      } else {
        setError("Error al enviar el correo de recuperación");
      }
      throw error;
    }
  };

  const handleUpdatePassword = async (newPassword: string) => {
    try {
      setError(null);
      if (auth.currentUser) {
        await updatePassword(auth.currentUser, newPassword);
      } else {
        throw new Error("No hay usuario autenticado");
      }
    } catch (error: any) {
      if (error.code === "auth/weak-password") {
        setError(
          "La contraseña es demasiado débil. Debe tener al menos 6 caracteres"
        );
      } else {
        setError("Error al actualizar la contraseña");
      }
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        error,
        unverifiedEmail,
        handleLogin,
        handleRegister,
        handleLogout,
        handleGoogleLogin,
        handleResetPassword,
        handleUpdatePassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
