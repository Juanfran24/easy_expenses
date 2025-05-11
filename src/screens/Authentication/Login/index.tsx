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
import { TouchableOpacity } from "react-native";

const Login = () => {
  const navigation = useNavigation();
  const { handleLogin, handleGoogleLogin, error: contextError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const onLogin = async () => {
    setError(null);
    try {
      if (!email || !password) {
        setError("Por favor, complete todos los campos");
        return;
      }
      await handleLogin(email, password);
      // No necesitamos hacer nada más aquí, ya que AuthProvider manejará
      // la redirección si el login es exitoso
    } catch (err) {
      if (err instanceof Error) {
        if (err.message.includes("auth/invalid-email")) {
          setError("Correo electrónico inválido");
        } else if (err.message.includes("auth/wrong-password")) {
          setError("Contraseña incorrecta");
        } else if (err.message.includes("auth/user-not-found")) {
          setError("Usuario no encontrado");
        } else if (err.message.includes("email-not-verified") || 
                  err.message.includes("verifica tu correo")) {
          setError("Por favor, verifica tu correo electrónico antes de iniciar sesión");
          // No navegamos a ninguna otra pantalla, nos quedamos en login
        } else {
          setError("Error al iniciar sesión. Por favor, intente nuevamente");
        }
      }
    }
  };

  const onGoogleLogin = async () => {
    try {
      await handleGoogleLogin();
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError("Error al iniciar sesión con Google. Por favor, intente nuevamente");
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
        <TouchableOpacity onPress={() => {
          //@ts-ignore
          navigation.navigate("ResetPassword");
        }}>
          <Typography.P3.Underline
            styles={{ textAlign: "right", color: colors.primary.main }}
          >
            ¿Has olvidado la contraseña?
          </Typography.P3.Underline>
        </TouchableOpacity>
        <FlexBox style={{ width: "100%", gap: 16 }}>
          <AppButton
            title="Iniciar sesión"
            variant="contained"
            onPress={onLogin}
          />
          <ProviderButton
            provider="google"
            title="Ingresar con Google"
            onPress={onGoogleLogin}
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
