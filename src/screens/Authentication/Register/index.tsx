import React from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import Typography from "@/src/components/Typography";
import { AppButton } from "@/src/components/AppButton";
import { AppTextInput } from "@/src/components/Inputs/AppTextInput";
import colors from "@/src/constants/colors";
import { FlexBox } from "@/src/components/FlexBox";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@/src/context/AuthContext/useAuth";
import Divider from "@/src/components/Divider";
import ProviderButton from "@/src/components/AppButton/ProviderButton";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AuthStackParamList } from "@/src/navigation/auth";

type RegisterScreenNavigationProp = NativeStackNavigationProp<AuthStackParamList>;

const Register = () => {
  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const { handleRegister, handleGoogleLogin } = useAuth();
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);  const onRegister = async () => {
    setError(null);
    
    if (!username.trim()) {
      setError("El nombre de usuario es requerido");
      return;
    }
    if (!email.trim()) {
      setError("El correo electrónico es requerido");
      return;
    }
    if (!password.trim()) {
      setError("La contraseña es requerida");
      return;
    }    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }
      try {
      // Primero realizamos el registro
      await handleRegister(email, password, username);
      
      // Después mostramos la alerta y esperamos que el usuario confirme
      // El sistema ya estableció unverifiedEmail en el AuthContext
      Alert.alert(
        "Verificación requerida",
        `Te hemos enviado un correo a ${email}. Por favor, verifica tu cuenta haciendo clic en el enlace antes de iniciar sesión.`,
        [
          { 
            text: "Entendido", 
            onPress: () => {
              // Eliminamos el @ts-ignore ya que ahora tenemos tipado correcto
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            }
          }
        ],
        { cancelable: false } // Previene que se cierre sin presionar el botón
      );
      
    } catch (err: any) {
      if (err.code === "auth/email-already-in-use" || 
          (err.message && err.message.includes("ya está registrado"))) {
        setError("Este correo ya está registrado");
      } else if (err.code === "auth/weak-password") {
        setError("La contraseña es demasiado débil. Debe tener al menos 6 caracteres.");
      } else if (err.code === "auth/invalid-email") {
        setError("El formato del correo electrónico es inválido.");
      } else {
        setError("Error al registrar el usuario: " + (err.message || "Error desconocido"));
      }
    }
  };

  const onGoogleLogin = async () => {
    try {
      await handleGoogleLogin();
      setError(null);
    } catch (err) {
      if (err instanceof Error) {
        setError(
          "Error al iniciar sesión con Google. Por favor, intente nuevamente"
        );
      }
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        style={{ flex: 1, marginVertical: 40 }}
      >
        <FlexBox style={{ gap: 40 }}>
          <Typography.H2 styles={styles.heading}>Registro</Typography.H2>
          <FlexBox style={{ width: "100%", gap: 20 }}>
            <AppTextInput
              label="Nombre de usuario"
              placeholder="Ingresa tu nombre"
              value={username}
              onChangeText={setUsername}
            />
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
                navigation.navigate("Login");
              }}
            />
          </FlexBox>
        </FlexBox>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgrounds.base,
    paddingHorizontal: 20,
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
