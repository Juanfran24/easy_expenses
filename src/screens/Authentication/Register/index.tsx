import React from "react";
import { View, StyleSheet } from "react-native";
import Typography from "@/src/components/Typography";
import { AppButton } from "@/src/components/Button";
import { AppTextInput } from "@/src/components/Inputs/AppTextInput";
import colors from "@/src/constants/colors";
import { FlexBox } from "@/src/components/FlexBox";
import { useNavigation } from "@react-navigation/native";

const Register = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <FlexBox style={{ gap: 40 }}>
        <Typography.H2 styles={styles.heading}>Registro</Typography.H2>
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
          <AppTextInput
            label="Confirma contraseña"
            placeholder="Ingresar"
            type="password"
          />
        </FlexBox>
        <FlexBox style={{ width: "100%", gap: 16 }}>
          <AppButton
            title="Registrarse"
            variant="contained"
            onPress={() => console.log("Registrarse presionado")}
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
              console.log("Ya tengo cuenta presionado")
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
  }
});

export default Register;