import React from "react";
import RootStack from "../navigation";
import { useAuth } from "../context/AuthContext/useAuth";
import AuthStack from "../navigation/auth";

const RootLayout = () => {
  const { user, unverifiedEmail } = useAuth();

  // Determinar la pantalla inicial del AuthStack basado en si hay un correo sin verificar
  const initialRoute = unverifiedEmail ? "Login" : "Landing";

  return (
    <>
      {user ? <RootStack /> : <AuthStack initialRouteName={initialRoute} />}
    </>
  );
};

export default RootLayout;
