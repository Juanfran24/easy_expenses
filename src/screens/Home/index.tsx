import { AppButton } from "@/src/components/Button";
import { FlexBox } from "@/src/components/FlexBox";
import { FlexBetween } from "@/src/components/FlexBox/FlexBetween";
import { AppTextInput } from "@/src/components/Inputs/AppTextInput";
import Typography from "@/src/components/Typography";
import colors from "@/src/constants/colors";
import { auth } from "@/src/database";
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";

const Home = () => {
  const [user, setUser] = useState<string>("");
  const [password, setpassword] = useState<string>("");

  const signUp = async () => {
    try {
      const res = await createUserWithEmailAndPassword(auth, user, password);
      console.log(res);
    } catch (error) {
      console.error("Error al registrar usuario:", error);
    }
  };

  return (
    <FlexBox style={{ backgroundColor: colors.backgrounds.base, flex: 1 }}>
      <Typography.H2>Iniciar sesión</Typography.H2>
      <AppTextInput
        label="Correo electrónico"
        placeholder="Username"
        value={user}
        onChangeText={setUser}
      />
      <AppTextInput
        label="Contraseña"
        placeholder="Password"
        value={password}
        onChangeText={setpassword}
        type="password"
      />
      <AppButton title="Sign Up" onPress={signUp} variant="outlined" />
      <FlexBetween>
        <Typography.H1>Sign Up</Typography.H1>
        <Typography.H1>Sign In</Typography.H1>
      </FlexBetween>
    </FlexBox>
  );
};

export default Home;
