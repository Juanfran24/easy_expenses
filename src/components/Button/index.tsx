import colors from "@/src/constants/colors";
import { Animated, ButtonProps, Pressable, StyleSheet } from "react-native";
import Typography from "../Typography";
import { MaterialIcons } from "@expo/vector-icons";
import { FlexBox } from "../FlexBox";

interface AppButtonProps extends ButtonProps {
  variant?: "contained" | "outlined" | "text-icon";
  textAndIconColor?: string;
  nameIcon?: string;
}

export const AppButton = (props: AppButtonProps) => {
  const { variant, ...rest } = props;

  //#region Animation
  const backgroundColorRef = new Animated.Value(0);

  const handlePress = () => {
    Animated.timing(backgroundColorRef, {
      toValue: 1,
      duration: 60,
      useNativeDriver: true,
    }).start();
  };
  const handleRelease = () => {
    Animated.timing(backgroundColorRef, {
      toValue: 0,
      duration: 60,
      useNativeDriver: true,
    }).start();
  };

  const backgroundColorContained = backgroundColorRef.interpolate({
    inputRange: [0, 1],
    outputRange: [colors.primary.main, "transparent"],
  });

  const backgroundColorOutlined = backgroundColorRef.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", colors.primary.main],
  });
  //#endregion

  return (
    <>
      <Pressable
        onPress={(e) => {
          handlePress();
          rest.onPress && rest.onPress(e);
        }}
        onPressOut={handleRelease}
        disabled={rest.disabled}
      >
        {variant === "text-icon" ? (
          <FlexBox
            style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
          >
            <Typography.H6.SemiBold styles={{ color: props.textAndIconColor }}>
              {props.title}
            </Typography.H6.SemiBold>
            <MaterialIcons
              name={
                props.nameIcon as unknown as keyof typeof MaterialIcons.glyphMap
              }
              size={24}
              color={props.textAndIconColor}
            />
          </FlexBox>
        ) : (
          <Animated.View
            style={
              variant === "outlined"
                ? [
                    styles.buttonOutlined,
                    { backgroundColor: backgroundColorOutlined },
                  ]
                : [
                    styles.buttonContained,
                    { backgroundColor: backgroundColorContained },
                  ]
            }
          >
            <Typography.H6.SemiBold
              styles={{
                color:
                  variant === "outlined"
                    ? colors.primary.main
                    : colors.backgrounds.base,
              }}
            >
              {rest.title}
            </Typography.H6.SemiBold>
          </Animated.View>
        )}
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContained: {
    borderWidth: 1,
    borderColor: colors.primary.main,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOutlined: {
    borderWidth: 1,
    borderColor: colors.primary.main,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
