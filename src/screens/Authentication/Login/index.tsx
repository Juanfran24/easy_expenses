import React, { useState } from "react";
import { FlexBox } from "@/src/components/FlexBox";
import { AppTextInput } from "@/src/components/Inputs/AppTextInput";
import Typography from "@/src/components/Typography";
import colors from "@/src/constants/colors";
import { AppButton } from "@/src/components/Button";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/src/context/AuthContext/useAuth";

const Login = () => {
  const navigation = useNavigation();
  const { handleLogin, error } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async () => {
    try {
      await handleLogin(email, password);
      // Si el login es exitoso, se actualizará el estado en el contexto
      // y el layout se encargará de la redirección
    } catch (err) {
      console.error(err);
    }
  };

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
            value={email}
            onChangeText={setEmail}
          />
          <AppTextInput
            label="Contraseña"
            placeholder="Ingresar"
            type="password"
            value={password}
            onChangeText={setPassword}
          />
          {error && (
            <Typography.P3.Regular styles={{ color: colors.error }}>
              {error}
            </Typography.P3.Regular>
          )}
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
            onPress={onLogin}
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
