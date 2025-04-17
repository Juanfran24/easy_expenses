import colors from "@/src/constants/colors";
import React from "react";
import { View, ViewProps } from "react-native";

const Divider: React.FC<ViewProps> = (props) => {
  return (
    <View
      style={[
        {
          borderBottomWidth: 1,
          borderBottomColor: colors.borders.dark,
          marginVertical: 10,
          marginHorizontal: 20,
        },
        props.style,
      ]}
      // {...props}
    />
  );
};

export default Divider;
