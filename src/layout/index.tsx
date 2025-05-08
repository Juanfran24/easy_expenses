import React, { useEffect } from "react";
import RootStack from "../navigation";
import { useAuth } from "../context/AuthContext/useAuth";
import AuthStack from "../navigation/auth";

const RootLayout = () => {
  const { user } = useAuth();

  useEffect(() => {}, [user]);

  return <>{user ? <RootStack /> : <AuthStack />}</>;
};

export default RootLayout;
