import React, { useEffect } from "react";
import RootStack from "../navigation";
import { useAuth } from "../context/AuthContext/useAuth";
import AuthStack from "../navigation/auth";

const RootLayout = () => {
  const { login } = useAuth();

  useEffect(() => {}, [login]);

  return <>{login ? <RootStack /> : <AuthStack />}</>;
};

export default RootLayout;
