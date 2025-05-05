import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Typography from "@/src/components/Typography";
import { AppButton } from "@/src/components/AppButton";
import { AppTextInput } from "@/src/components/Inputs/AppTextInput";
import colors from "@/src/constants/colors";
import { FlexBox } from "@/src/components/FlexBox";
import AlertModal from "@/src/components/AlertModal";

const NewPassword = () => {
  const navigation = useNavigation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreatePassword = async () => {
    if (!password || !confirmPassword) {
      setError("Por favor, complete todos los campos");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      setShowAlert(true);
      setError(null);
    } catch (err) {
      setError("Error al actualizar la contraseña");
    }
  };

  return (
    <View style={styles.container}>
      <FlexBox style={{ gap: 40 }}>
        <Typography.H3>
          Crear nueva contraseña
        </Typography.H3>
        <FlexBox style={{ width: "100%", gap: 40 }}>
            <FlexBox style={{ width: "100%", gap: 20 }}>
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
                    title="Crear contraseña"
                    variant="contained"
                    onPress={handleCreatePassword}
                />
            </FlexBox>
        </FlexBox>
      </FlexBox>

      <AlertModal
        visible={showAlert}
        type="success"
        titleMessage="¡Contraseña actualizada!"
        textMessage="Tu contraseña ha sido actualizada exitosamente"
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
});

export default NewPassword;