import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Typography from "@/src/components/Typography";
import { AppButton } from "@/src/components/AppButton";
import { AppTextInput } from "@/src/components/Inputs/AppTextInput";
import colors from "@/src/constants/colors";
import { FlexBox } from "@/src/components/FlexBox";
import AlertModal from "@/src/components/AlertModal";

const ResetPassword = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleResetPassword = async () => {
    if (!email) {
      setError("Por favor, ingrese su correo electrónico");
      return;
    }

    try {
      // Aquí iría la lógica para enviar el correo de recuperación
      setShowAlert(true);
      setError(null);
    } catch (err) {
      setError("Error al enviar el correo de recuperación");
    }
  };

  return (
    <View style={styles.container}>
      <FlexBox style={{ gap: 40 }}>
        <Typography.H2 styles={styles.heading}>
          Recuperar contraseña
        </Typography.H2>
        <FlexBox style={{ width: "100%", gap: 20 }}>
          <AppTextInput
            label="Correo electrónico"
            placeholder="ejemplo@correo.com"
            value={email}
            onChangeText={setEmail}
            type="email"
            autoCapitalize="none"
          />
          {error && (
            <Typography.P3.Regular styles={{ color: colors.error.main }}>
              {error}
            </Typography.P3.Regular>
          )}
        </FlexBox>
        <FlexBox style={{ width: "100%", gap: 16 }}>
          <AppButton
            title="Enviar a correo"
            variant="contained"
            onPress={handleResetPassword}
          />
        </FlexBox>
      </FlexBox>

      <AlertModal
        visible={showAlert}
        type="success"
        titleMessage="Te hemos enviado el correo"
        textMessage="Ingresa a tu correo para crear tu nueva contraseña"
        onDismiss={() => {
          setShowAlert(false);
          //@ts-ignore
          navigation.navigate("Login");
        }}
      />
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
});

export default ResetPassword;