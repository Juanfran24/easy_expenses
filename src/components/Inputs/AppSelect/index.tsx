import React, { useState } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  StyleSheet,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "@/src/constants/colors";
import Typography from "../../Typography";

interface Item {
  label: string;
  value: string;
}

interface AppSelectProps {
  label: string;
  value: string | null;
  onValueChange: (value: string) => void;
  placeholder?: string;
  items: Item[];
  disabled?: boolean;
  error?: boolean;
  helperText?: string;
}

export const AppSelect: React.FC<AppSelectProps> = ({
  label,
  value,
  onValueChange,
  placeholder = "Selecciona una opción",
  items,
  disabled,
  error,
  helperText,
}) => {
  const [visible, setVisible] = useState(false);

  const selectedLabel =
    items.find((item) => item.value === value)?.label || placeholder;

  return (
    <View>
      <Typography.H6.Regular
        styles={{
          color: error ? colors.error.main : colors.textsAndIcons.inputsLabel,
          marginBottom: 6,
        }}
      >
        {label}
      </Typography.H6.Regular>

      <TouchableOpacity
        style={{
          ...styles.input,
          opacity: !disabled ? 1 : 0.5,
          borderColor: error ? colors.error.main : colors.textsAndIcons.dark,
        }}
        onPress={() => setVisible(true)}
        activeOpacity={0.8}
        disabled={disabled}
      >
        <Text
          style={{
            ...styles.valueText,
            color: error ? colors.error.main : colors.textsAndIcons.dark,
          }}
        >
          {selectedLabel}
        </Text>
        <MaterialIcons
          name="arrow-drop-down"
          size={24}
          color={error ? colors.error.main : colors.textsAndIcons.dark}
          style={styles.icon}
        />
      </TouchableOpacity>

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

      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPressOut={() => setVisible(false)}
        >
          <View style={styles.modal}>
            <FlatList
              data={items}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onValueChange(item.value);
                    setVisible(false);
                  }}
                >
                  <Text style={styles.optionText}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </Pressable>
      </Modal>
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
    justifyContent: "center",
  },
  valueText: {
    fontFamily: "Sora_Regular",
    fontSize: 15,
  },
  icon: {
    position: "absolute",
    right: 12,
    top: 12,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  modal: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 8,
    maxHeight: "50%",
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  optionText: {
    fontSize: 16,
    fontFamily: "Sora_Regular",
    color: colors.textsAndIcons.dark,
  },
});

export default AppSelect;
