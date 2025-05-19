import colors from "@/src/constants/colors";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { FlexBox } from "../FlexBox";
import Typography from "../Typography";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

interface NotificationCardProps {
  title: string;
  description: string;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  description,
}) => {
  return (
    <TouchableOpacity style={styles.container}>
      <FontAwesome5
        name="exclamation-circle"
        size={24}
        color={colors.error.dark}
      />
      <FlexBox style={styles.textContainer}>
        <Typography.H6.SemiBold
          styles={{ color: colors.textsAndIcons.onColor }}
        >
          {title}
        </Typography.H6.SemiBold>
        <Typography.P2.Regular styles={{ color: colors.textsAndIcons.onColor }}>
          {description}
        </Typography.P2.Regular>
      </FlexBox>
      <View style={styles.arrowContainer}>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={40}
          color={colors.backgrounds.medium}
          style={{ marginLeft: "auto" }}
        />
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginTop: 32,
    marginBottom: 50,
    backgroundColor: colors.error.light,
    borderRadius: 10,
    padding: 16,
    height: 85,
    width: "100%",
    position: "relative",
    borderBottomWidth: 4,
    borderBottomColor: colors.error.dark,
  },
  textContainer: {
    gap: 8,
    marginLeft: 13,
  },
  arrowContainer: {
    position: "absolute",
    right: 5,
    top: "40%",
  },
});
