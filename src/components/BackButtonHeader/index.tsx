import colors from "@/src/constants/colors";
import { Navigation } from "@/src/utils";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { TouchableOpacity } from "react-native";

const BackButtonHeader = () => {
  const navigation = Navigation();

  return (
    <TouchableOpacity
      onPressIn={() =>
        navigation.navigate("Home", {
          screen: "Inicio",
        })
      }
      style={{
        marginLeft: 10,
        padding: 10,
      }}
    >
      <MaterialIcons
        name="arrow-back-ios"
        size={18}
        color={colors.textsAndIcons.main}
      />
    </TouchableOpacity>
  );
};

export default BackButtonHeader;
