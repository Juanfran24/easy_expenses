import colors from "@/src/constants/colors";
import { useTogglePasswordVisibility } from "@/src/hooks/useTogglePasswordVisibility";
import { Pressable, TextInput, TextInputProps, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Typography from "../../Typography";

interface AppTextInputProps extends TextInputProps {
  type?: "text" | "email" | "password" | "number";
  label: string;
  disabled?: boolean;
  maxLength?: number; // nuevo parámetro opcional
  // formik validations
  error?: boolean;
  helperText?: string;
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

  // Agregar lógica para manejar las validaciones del formulario
  const { error, helperText } = props;

  return (
    <View style={{ position: "relative" }}>
      <Typography.H6.Regular
        styles={{
          color: error ? colors.error.main : colors.textsAndIcons.inputsLabel,
          marginBottom: 6,
        }}
      >
        {props.label}
      </Typography.H6.Regular>
      <TextInput
        editable={!props.disabled}
        inputMode={inputMode}
        keyboardType={keyboardType}
        secureTextEntry={type === "password" ? passwordVisibility : false}
        selectionColor={colors.textsAndIcons.light}
        placeholderTextColor={
          error ? colors.error.main : colors.textsAndIcons.dark
        }
        maxLength={props.maxLength ?? 50}
        style={[
          {
            height: 48,
            borderWidth: 1,
            padding: 10,
            borderColor: error ? colors.error.main : colors.textsAndIcons.dark,
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
      {helperText && (
        <Typography.P3.Regular
          styles={{
            color: error ? colors.error.main : colors.textsAndIcons.dark,
            marginTop: 4,
          }}
        >
          {helperText}
        </Typography.P3.Regular>
      )}
    </View>
  );
};
