import colors from "@/src/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { FlexBetween } from "../FlexBox/FlexBetween";
import Typography from "../Typography";
import { Navigation } from "@/src/utils";

const AppBarMenu = () => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const navigation = Navigation();

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleSettings = () => {
    navigation.navigate("Configuration");
    setIsOpenMenu(false);
  };

  const handleLogout = () => {
    console.log("Settings pressed");
  };

  return (
    <>
      <TouchableOpacity style={{ padding: 10 }} onPressIn={toggleMenu}>
        <MaterialIcons
          name="menu"
          size={24}
          color={colors.textsAndIcons.main}
        />
      </TouchableOpacity>
      <Modal
        transparent
        visible={isOpenMenu}
        animationType="fade"
        onRequestClose={toggleMenu}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            backgroundColor: "rgba(0,0,0,0.3)",
            justifyContent: "flex-end",
          }}
          onPressOut={toggleMenu}
        >
          <View style={styles.menuContainer}>
            <TouchableOpacity onPress={handleSettings}>
              <FlexBetween style={styles.menuItem}>
                <MaterialIcons
                  name="settings"
                  size={16}
                  color={colors.textsAndIcons.main}
                />
                <Typography.H6.Regular>Configuración</Typography.H6.Regular>
              </FlexBetween>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogout}>
              <FlexBetween style={styles.menuItem}>
                <MaterialIcons
                  name="logout"
                  size={16}
                  color={colors.textsAndIcons.main}
                />
                <Typography.H6.Regular>Cerrar Sesión</Typography.H6.Regular>
              </FlexBetween>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </>
  );
};

export default AppBarMenu;

const styles = StyleSheet.create({
  menuContainer: {
    position: "absolute",
    top: 50,
    right: 10,
    backgroundColor: colors.backgrounds.light,
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuItem: {
    padding: 10,
    backgroundColor: colors.backgrounds.light,
    gap: 10,
  },
});
