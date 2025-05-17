import React from "react";
import { FlexBox } from "../FlexBox";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "@/src/constants/colors";
import Typography from "../Typography";
import { View } from "react-native";

interface NoDataProps extends React.ComponentProps<typeof View> {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
}

const NoData = ({
  icon = "announcement",
  title = "No disponible",
}: NoDataProps) => {
  return (
    <FlexBox
      style={{
        justifyContent: "center",
        marginTop: 10,
        width: "50%",
        minWidth: 200,
        alignItems: "center",
        alignSelf: "center",
      }}
    >
      <MaterialIcons
        name={icon}
        size={50}
        color={colors.textsAndIcons.dark}
        style={{ marginTop: 20 }}
      />
      <Typography.P2.Regular
        styles={{
          color: colors.textsAndIcons.dark,
          textAlign: "center",
          letterSpacing: 1,
        }}
      >
        {title}
      </Typography.P2.Regular>
    </FlexBox>
  );
};

export default NoData;
