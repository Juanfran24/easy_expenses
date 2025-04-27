import React from "react";
import { View, StyleSheet } from "react-native";
import Typography from "@/src/components/Typography";
import { AppButton } from "@/src/components/AppButton";
import { AppTextInput } from "@/src/components/Inputs/AppTextInput";
import colors from "@/src/constants/colors";
import { FlexBox } from "@/src/components/FlexBox";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/src/context/AuthContext/useAuth";
import Divider from "@/src/components/Divider";
import ProviderButton from "@/src/components/AppButton/ProviderButton";

const Register = () => {
  const navigation = useNavigation();
  const { handleRegister, handleGoogleLogin } = useAuth();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);

  const onRegister = async () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
    try {
      await handleRegister(email, password);
      //@ts-ignore
      navigation.navigate("Login");
    } catch (err) {
      setError("Error al registrar el usuario");
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
    <View style={styles.container}>
      <FlexBox style={{ gap: 40 }}>
        <Typography.H2 styles={styles.heading}>Registro</Typography.H2>
        <FlexBox style={{ width: "100%", gap: 20 }}>
          <AppTextInput
            label="Correo electrónico"
            placeholder="ejemplo@correo.com"
            value={email}
            onChangeText={setEmail}
            type="email"
          />
          <AppTextInput
            label="Contraseña"
            placeholder="Ingresar"
            value={password}
            onChangeText={setPassword}
            type="password"
          />
          <AppTextInput
            label="Confirma contraseña"
            placeholder="Ingresar"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            type="password"
          />
          {error && (
            <Typography.P3.Regular styles={{ color: colors.error.main }}>
              {error}
            </Typography.P3.Regular>
          )}
        </FlexBox>
        <FlexBox style={{ width: "100%", gap: 16 }}>
          <AppButton
            title="Registrarse"
            variant="contained"
            onPress={onRegister}
          />

          <ProviderButton
            provider="google"
            title="Ingresar con Google"
            onPress={() => onGoogleLogin()}
          />

          <ProviderButton
            provider="apple"
            title="Ingresar con Apple"
            onPress={() => null}
          />

          <Divider style={{ marginHorizontal: 0, marginVertical: 0 }} />

          <AppButton
            title="Ya tengo cuenta"
            variant="outlined"
            onPress={() => {
              //@ts-ignore
              navigation.navigate("Login");
              console.log("Ya tengo cuenta presionado");
            }}
          />
        </FlexBox>
      </FlexBox>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgrounds.base,
    paddingHorizontal: 20,
    justifyContent: "center",
  },
  heading: {
    fontWeight: "bold",
    color: colors.textsAndIcons.main,
  },
  primaryButton: {
    width: "100%",
    marginTop: 20,
  },
  googleButton: {
    width: "100%",
    marginTop: 10,
    borderColor: colors.textsAndIcons.main,
  },
  appleButton: {
    width: "100%",
    marginTop: 10,
    backgroundColor: colors.textsAndIcons.main,
  },
});

export default Register;
