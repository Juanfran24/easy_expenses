import colors from "@/src/constants/colors";
import { ButtonProps, Pressable, StyleSheet, View } from "react-native";
import Typography from "../Typography";

interface AppButtonProps extends ButtonProps {
  variant?: "contained" | "outlined";
}

export const AppButton = (props: AppButtonProps) => {
  const { variant, ...rest } = props;

  return (
    <>
      <Pressable onPress={rest.onPress} disabled={rest.disabled}>
        <View
          style={
            variant === "outlined"
              ? styles.buttonOutlined
              : styles.buttonContained
          }
        >
          <Typography.H6.SemiBold
            styles={{
              color:
                variant === "outlined" ? colors.primary : colors.background,
            }}
          >
            {rest.title}
          </Typography.H6.SemiBold>
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  buttonContained: {
    backgroundColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonOutlined: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
    paddingVertical: 14,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
