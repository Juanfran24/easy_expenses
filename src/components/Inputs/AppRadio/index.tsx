import colors from "@/src/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Typography from "../../Typography";

interface AppRadioProps {
  label?: string;
  value: string;
  onValueChange: (value: string) => void;
  items: { label: string; value: string }[];
}

const AppRadio: React.FC<AppRadioProps> = ({
  label,
  value,
  onValueChange,
  items,
}) => {
  return (
    <View>
      <Typography.H6.Regular>{label}</Typography.H6.Regular>
      <View style={styles.radioContent}>
        {items.map((item) => {
          return (
            <View key={item.label}>
              {value === item.value ? (
                <TouchableOpacity style={styles.btn}>
                  <MaterialIcons
                    name="radio-button-checked"
                    size={20}
                    color={colors.primary.main}
                  />
                  <Typography.H6.Regular>{item.label}</Typography.H6.Regular>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => {
                    onValueChange(item.value);
                  }}
                  style={styles.btn}
                >
                  <MaterialIcons
                    name="radio-button-unchecked"
                    size={20}
                    color="white"
                  />
                  <Typography.H6.Regular>{item.label}</Typography.H6.Regular>
                </TouchableOpacity>
              )}
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  radio: {
    flexDirection: "row",
  },
  img: {
    height: 20,
    width: 20,
    marginHorizontal: 5,
  },
  btn: {
    flexDirection: "row",
    gap: 8,
  },
  radioContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 18,
    gap: 32,
  },
});

export default AppRadio;
