import { AppButton } from "@/src/components/AppButton";
import { FlexBetween } from "@/src/components/FlexBox/FlexBetween";
import AppSelect from "@/src/components/Inputs/AppSelect";
import { AppTextInput } from "@/src/components/Inputs/AppTextInput";
import Typography from "@/src/components/Typography";
import colors from "@/src/constants/colors";
import { useAuth } from "@/src/context/AuthContext/useAuth";
import { Navigation } from "@/src/utils";
import { MaterialIcons } from "@expo/vector-icons";
import { User } from "firebase/auth";
import React, { useState } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const Configuration = () => {
  const { user } = useAuth();
  const { displayName, email: userEmail } = user as User;
  const [currentCurrency, setCurrentCurrency] = useState<string>("COP");
  const [username, setUsername] = useState<string>(displayName || "");
  const [email, setEmail] = useState<string>(userEmail || "");
  const navigation = Navigation();

  const handleCreateCategory = () => {
    navigation.navigate("CreateCategory");
  };

  return (
    <View style={styles.viewContainer}>
      <TouchableOpacity onPressIn={handleCreateCategory}>
        <FlexBetween style={styles.cardCreateCategory}>
          <FlexBetween style={{ gap: 8 }}>
            <MaterialIcons
              name="category"
              size={24}
              color={colors.textsAndIcons.main}
            />
            <Typography.H6.SemiBold>Crear categoría</Typography.H6.SemiBold>
          </FlexBetween>
          <MaterialIcons
            name="keyboard-arrow-right"
            size={30}
            color={colors.primary.main}
          />
        </FlexBetween>
      </TouchableOpacity>

      <View style={{ marginTop: 36 }}>
        <AppSelect
          label="Moneda predeterminada"
          value={currentCurrency}
          onValueChange={(itemValue) => setCurrentCurrency(itemValue)}
          placeholder="Selecciona una opción"
          items={[
            { label: "Peso Colombiano (COP)", value: "COP" },
            { label: "Dólar estadounidense (USD)", value: "USD" },
            { label: "Euro (EUR)", value: "EUR" },
          ]}
        />
      </View>

      <View style={{ marginTop: 36, gap: 24 }}>
        <Typography.H5.SemiBold>Cuenta de usuario</Typography.H5.SemiBold>
        <AppTextInput
          label="Nombre de usuario"
          value={username}
          onChangeText={(text) => setUsername(text)}
          placeholder="Escribe tu nombre de usuario"
        />
        <AppTextInput
          label="Correo electrónico"
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Escribe tu correo electrónico"
        />
        <View style={{ marginTop: 24 }}>
          <AppButton
            variant="text-icon"
            textAndIconColor={colors.error.main}
            title="Eliminar cuenta"
            nameIcon="delete"
          />
        </View>
      </View>
    </View>
  );
};

export default Configuration;

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: colors.backgrounds.base,
    paddingHorizontal: 24,
  },
  cardCreateCategory: {
    backgroundColor: colors.backgrounds.medium,
    borderRadius: 10,
    padding: 16,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
