import colors from "@/src/constants/colors";
import React from "react";
import { View } from "react-native";

const Divider = () => {
  return (
    <View
      style={{
        borderBottomWidth: 1,
        borderBottomColor: colors.borders.dark,
        marginVertical: 10,
        marginHorizontal: 20,
      }}
    />
  );
};

export default Divider;
