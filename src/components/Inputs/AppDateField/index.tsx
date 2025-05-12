import React, { useState } from "react";
import { View, TouchableOpacity, Platform, StyleSheet } from "react-native";
import colors from "@/src/constants/colors";
import Typography from "../../Typography";
import { AppTextInput } from "../AppTextInput";
import { MaterialIcons } from "@expo/vector-icons";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";

interface AppDateFieldProps {
  label: string;
  value: Date | null;
  onChange: (date: Date) => void;
}

export const AppDateField = ({
  label,
  value = new Date(),
  onChange,
}: AppDateFieldProps) => {
  const [show, setShow] = useState(false);

  const onDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShow(Platform.OS === "ios");
    if (event.type === "set" && selectedDate) {
      onChange(selectedDate);
    }
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const formattedDate = value
    ? value.toLocaleDateString("es-ES", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    : "";

  return (
    <View style={styles.container}>
      <Typography.H6.Regular
        styles={{ color: colors.textsAndIcons.inputsLabel, marginBottom: 6 }}
      >
        {label}
      </Typography.H6.Regular>

      <TouchableOpacity
        onPress={showDatepicker}
        activeOpacity={0.7}
        style={styles.touchable}
      >
        <View style={styles.inputContainer}>
          <View style={styles.fakeInput}>
            <Typography.P1.Regular
              styles={{ color: colors.textsAndIcons.dark }}
            >
              {formattedDate || "Seleccionar fecha"}
            </Typography.P1.Regular>
            <MaterialIcons
              name="calendar-today"
              size={24}
              color={colors.textsAndIcons.dark}
            />
          </View>
        </View>
      </TouchableOpacity>

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          onChange={onDateChange}
          display={Platform.OS === "ios" ? "spinner" : "default"}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  touchable: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
  },
  fakeInput: {
    height: 48,
    borderWidth: 1,
    borderColor: colors.textsAndIcons.dark,
    borderRadius: 8,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "transparent",
  },
});
