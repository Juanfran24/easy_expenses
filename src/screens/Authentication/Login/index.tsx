import { FlexBox } from "@/src/components/FlexBox";
import { AppTextInput } from "@/src/components/Inputs/AppTextInput";
import Typography from "@/src/components/Typography";
import colors from "@/src/constants/colors";
import { useAuth } from "@/src/context/AuthContext/useAuth";
import { AppButton } from "@/src/components/Button";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";

const Login = () => {
  // const [user, setUser] = useState<string>("");
  // const [password, setpassword] = useState<string>("");
  const { handleLogin } = useAuth();
  return (
    <FlexBox
      style={{
        backgroundColor: colors.backgrounds.base,
        flex: 1,
        paddingHorizontal: 20,
        justifyContent: "center",
      }}
    >
      <FlexBox style={{ gap: 40 }}>
        <Typography.H2 styles={{ textAlign: "center" }}>
          Iniciar sesión
        </Typography.H2>
        <FlexBox style={{ width: "100%", gap: 20 }}>
          <AppTextInput
            label="Correo electrónico"
            placeholder="ejemplo@correo.com"
            type="email"
          />
          <AppTextInput
            label="Contraseña"
            placeholder="Ingresar"
            type="password"
          />
        </FlexBox>
        <Typography.P3.Underline
          styles={{ textAlign: "right", color: colors.primary.main }}
        >
          ¿Has olvidado la contraseña?
        </Typography.P3.Underline>
        <FlexBox style={{ width: "100%", gap: 16 }}>
          <AppButton
            title="Iniciar sesión"
            variant="contained"
            onPress={handleLogin}
          />
          <AppButton
            title="Ingresar con Google"
            variant="outlined"
            onPress={() => console.log("Ingresar con Google presionado")}
          />
          <AppButton
            title="Ingresar con Apple"
            variant="outlined"
            onPress={() => console.log("Ingresar con Apple presionado")}
          />
          <AppButton
            title="Registrarse"
            variant="outlined"
            onPress={() => navigation.navigate("Register")}
          />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default Login;
