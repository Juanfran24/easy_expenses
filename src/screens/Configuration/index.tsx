import { AppButton } from "@/src/components/Button";
import { FlexBox } from "@/src/components/FlexBox";
import { FlexBetween } from "@/src/components/FlexBox/FlexBetween";
import AppSwitch from "@/src/components/Inputs/AppSwitch";
import { AppTextInput } from "@/src/components/Inputs/AppTextInput";
import Typography from "@/src/components/Typography";
import colors from "@/src/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

const Configuration = () => {
  return (
    <View style={styles.viewContainer}>
      <TouchableOpacity>
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
        <AppTextInput label="Moneda predeterminada" />
      </View>

      <View style={{ marginTop: 36 }}>
        <Typography.H5.SemiBold>Cuenta de usuario</Typography.H5.SemiBold>
        <View style={{ marginTop: 24 }}>
          <AppSwitch label="Activar notificaciones al correo" />
        </View>
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
