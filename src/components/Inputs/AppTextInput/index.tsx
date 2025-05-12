import colors from "@/src/constants/colors";
import { useTogglePasswordVisibility } from "@/src/hooks/useTogglePasswordVisibility";
import { Pressable, TextInput, TextInputProps, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Typography from "../../Typography";

interface AppTextInputProps extends TextInputProps {
  type?: "text" | "email" | "password" | "number";
  label: string;
  disabled?: boolean;
}

export const AppTextInput = (props: AppTextInputProps) => {
  const { passwordVisibility, rightIcon, handlePasswordVisibility } =
    useTogglePasswordVisibility();
  const { style, ...rest } = props;
  const type = props.type || "text";
  const keyboardType =
    type === "email"
      ? "email-address"
      : type === "number"
      ? "numeric"
      : "default";
  const inputMode =
    type === "email" ? "email" : type === "number" ? "numeric" : "text";

  return (
    <View style={{ position: "relative" }}>
      <Typography.H6.Regular
        styles={{ color: colors.textsAndIcons.inputsLabel, marginBottom: 6 }}
      >
        {props.label}
      </Typography.H6.Regular>
      <TextInput
        editable={!props.disabled}
        inputMode={inputMode}
        keyboardType={keyboardType}
        secureTextEntry={type === "password" ? passwordVisibility : false}
        selectionColor={colors.textsAndIcons.light}
        placeholderTextColor={colors.textsAndIcons.dark}
        style={[
          {
            height: 48,
            borderWidth: 1,
            padding: 10,
            borderColor: colors.textsAndIcons.dark,
            borderRadius: 8,
            paddingVertical: 14.5,
            paddingLeft: 20,
            fontFamily: "Sora_Regular",
            fontSize: 15,
            color: colors.textsAndIcons.dark,
            opacity: props.disabled ? 0.5 : 1,
          },
          style,
        ]}
        {...rest}
      />
      {type === "password" ? (
        <View
          style={{
            position: "absolute",
            right: 15,
            top: 29,
            display: props.value ? "flex" : "none",
          }}
        >
          <Pressable onPress={handlePasswordVisibility}>
            <View style={{ padding: 10 }}>
              <MaterialIcons
                name={rightIcon as keyof typeof MaterialIcons.glyphMap}
                size={22}
                color={colors.textsAndIcons.dark}
              />
            </View>
          </Pressable>
        </View>
      ) : null}
    </View>
  );
};
