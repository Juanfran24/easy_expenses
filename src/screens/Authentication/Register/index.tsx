import React from "react";
import { View, StyleSheet } from "react-native";
import Typography from "@/src/components/Typography";
import { AppButton } from "@/src/components/Button";
import { AppTextInput } from "@/src/components/Inputs/AppTextInput";
import colors from "@/src/constants/colors";
import { FlexBox } from "@/src/components/FlexBox";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/src/context/AuthContext/useAuth";

const Register = () => {
  const navigation = useNavigation();
  const { handleRegister } = useAuth();
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
      navigation.navigate("Login");
    } catch (err) {
      setError("Error al registrar el usuario");
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
            title="Ya tengo cuenta"
            variant="outlined"
            onPress={() => {
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
    fontSize: 24,
    fontWeight: "bold",
    color: colors.textsAndIcons.main,
    textAlign: "center",
    marginBottom: 20,
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