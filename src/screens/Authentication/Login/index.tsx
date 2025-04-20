import React, { useState } from "react";
import { FlexBox } from "@/src/components/FlexBox";
import { AppTextInput } from "@/src/components/Inputs/AppTextInput";
import Typography from "@/src/components/Typography";
import colors from "@/src/constants/colors";
import { AppButton } from "@/src/components/AppButton";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/src/context/AuthContext/useAuth";
import Divider from "@/src/components/Divider";
import ProviderButton from "@/src/components/AppButton/ProviderButton";

const Login = () => {
  const navigation = useNavigation();
  const { handleLogin, error: contextError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const onLogin = async () => {
    try {
      if (!email || !password) {
        setError("Por favor, complete todos los campos");
        return;
      }
      await handleLogin(email, password);
      // El manejo del redireccionamiento se hace automáticamente por el RootLayout
      // basado en el estado de login
    } catch (err) {
      // Mostrar mensaje de error específico según el código de error de Firebase
      if (err instanceof Error) {
        if (err.message.includes("auth/invalid-email")) {
          setError("Correo electrónico inválido");
        } else if (err.message.includes("auth/wrong-password")) {
          setError("Contraseña incorrecta");
        } else if (err.message.includes("auth/user-not-found")) {
          setError("Usuario no encontrado");
        } else {
          setError("Error al iniciar sesión. Por favor, intente nuevamente");
        }
      }
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
        <Typography.H2>Iniciar sesión</Typography.H2>
        <FlexBox style={{ width: "100%", gap: 20 }}>
          <AppTextInput
            label="Correo electrónico"
            placeholder="ejemplo@correo.com"
            type="email"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />
          <AppTextInput
            label="Contraseña"
            placeholder="Ingresar"
            type="password"
            value={password}
            onChangeText={setPassword}
          />
          {(error || contextError) && (
            <Typography.P3.Regular styles={{ color: colors.error.main }}>
              {error || contextError}
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
          <ProviderButton
            provider="google"
            title="Ingresar con Google"
            onPress={() => null}
          />

          <ProviderButton
            provider="apple"
            title="Ingresar con Apple"
            onPress={() => null}
          />
          <Divider style={{ marginHorizontal: 0, marginVertical: 0 }} />
          <AppButton
            title="Registrarse"
            variant="outlined"
            //@ts-ignore
            onPress={() => navigation.navigate("Register")}
          />
        </FlexBox>
      </FlexBox>
    </FlexBox>
  );
};

export default Login;
