import RNPickerSelect, { Item } from "react-native-picker-select";
import { View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "@/src/constants/colors";
import Typography from "../../Typography";

interface AppSelectProps {
  label: string;
  value: string | null;
  onValueChange: (value: string) => void;
  placeholder?: string;
  items: Item[];
}

export const AppSelect: React.FC<AppSelectProps> = ({
  label,
  value,
  onValueChange,
  placeholder,
  items,
}) => {
  return (
    <View>
      <Typography.H6.Regular
        styles={{ color: colors.textsAndIcons.inputsLabel, marginBottom: 6 }}
      >
        {label}
      </Typography.H6.Regular>

      <RNPickerSelect
        value={value}
        onValueChange={onValueChange}
        placeholder={{
          label: placeholder || "Selecciona una opción",
          value: null,
          color: colors.textsAndIcons.dark,
        }}
        items={items}
        style={{
          inputIOS: styles.input,
          inputAndroid: styles.input,
          placeholder: {
            color: colors.textsAndIcons.dark,
          },
          iconContainer: {
            top: 15,
            right: 15,
          },
        }}
        useNativeAndroidPickerStyle={false}
        Icon={() => (
          <MaterialIcons
            name="arrow-drop-down"
            size={24}
            color={colors.textsAndIcons.dark}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.textsAndIcons.dark,
    borderRadius: 8,
    paddingVertical: 14.5,
    paddingLeft: 20,
    paddingRight: 40,
    fontFamily: "Sora_Regular",
    color: colors.textsAndIcons.dark,
  },
});
export default AppSelect;