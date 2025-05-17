import React from "react";
import RootStack from "../navigation";
import { useAuth } from "../context/AuthContext/useAuth";
import AuthStack from "../navigation/auth";

const RootLayout = () => {
  const { user, unverifiedEmail, isLoading: isLoadingSignIn } = useAuth();

  // No mostrar ninguna pantalla mientras se verifica el estado de autenticación
  if (isLoadingSignIn) {
    return null;
  }

  // Determinar la pantalla inicial del AuthStack basado en si hay un correo sin verificar
  const initialRoute = unverifiedEmail ? "Login" : "Landing";

  return (
    <>{user ? <RootStack /> : <AuthStack initialRouteName={initialRoute} />}</>
  );
};

export default RootLayout;
