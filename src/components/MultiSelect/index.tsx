import React, { useState, useRef, useEffect } from "react";
import {
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Typography from "../Typography";
import colors from "@/src/constants/colors";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

type Option = {
  label: string;
  value: string;
};

type Props = {
  label?: string;
  options: Option[];
  onSelectionChange?: (selectedValues: string[]) => void;
  selectedValues?: string[];
};

const MultiSelectWithChips: React.FC<Props> = ({
  label = "Seleccionar",
  options,
  onSelectionChange,
  selectedValues: externalSelectedValues,
}) => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [selectedValues, setSelectedValues] = useState<string[]>(externalSelectedValues || []);
  const dropdownAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (externalSelectedValues !== undefined) {
      setSelectedValues(externalSelectedValues);
    }
  }, [externalSelectedValues]);

  useEffect(() => {
    if (dropdownVisible) {
      Animated.timing(dropdownAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(dropdownAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [dropdownVisible]);

  const toggleDropdown = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setDropdownVisible(!dropdownVisible);
  };

  const toggleSelect = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    
    setSelectedValues(newValues);
    if (onSelectionChange) {
      onSelectionChange(newValues);
    }
  };

  const removeChip = (value: string) => {
    const newValues = selectedValues.filter((v) => v !== value);
    setSelectedValues(newValues);
    if (onSelectionChange) {
      onSelectionChange(newValues);
    }
  };

  const renderDropdown = () => {
    const translateY = dropdownAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [-10, 0],
    });

    return (
      dropdownVisible && (
        <Animated.View
          style={[
            styles.dropdown,
            {
              opacity: dropdownAnim,
              transform: [{ translateY }],
            },
          ]}
        >
          {options.map((option) => {
            const isSelected = selectedValues.includes(option.value);
            return (
              <TouchableOpacity
                key={option.value}
                style={styles.option}
                onPress={() => toggleSelect(option.value)}
              >
                <MaterialIcons
                  name={isSelected ? "check-box" : "check-box-outline-blank"}
                  size={20}
                  color={
                    isSelected ? colors.primary.main : colors.textsAndIcons.dark
                  }
                  style={{ marginRight: 8 }}
                />
                <Typography.H6.Regular>{option.label}</Typography.H6.Regular>
              </TouchableOpacity>
            );
          })}
        </Animated.View>
      )
    );
  };

  return (
    <View>
      <Typography.H6.Regular>{label}</Typography.H6.Regular>

      <TouchableOpacity style={styles.selectBox} onPress={toggleDropdown}>
        <View style={styles.chipsContainer}>
          {!(selectedValues.length === 0) ? (
            selectedValues.map((value) => {
              const label =
                options.find((o) => o.value === value)?.label ?? value;
              return (
                <View key={value} style={styles.chip}>
                  <Text style={styles.chipText}>{label}</Text>
                  <TouchableOpacity onPress={() => removeChip(value)}>
                    <MaterialIcons
                      name="cancel"
                      size={14}
                      color={colors.textsAndIcons.dark}
                    />
                  </TouchableOpacity>
                </View>
              );
            })
          ) : (
            <Typography.P1.Regular
              styles={{ color: colors.textsAndIcons.dark }}
            >
              Seleccionar
            </Typography.P1.Regular>
          )}
        </View>
        <MaterialIcons
          name={dropdownVisible ? "arrow-drop-up" : "arrow-drop-down"}
          size={24}
          color={colors.textsAndIcons.dark}
        />
      </TouchableOpacity>

      {renderDropdown()}
    </View>
  );
};

export default MultiSelectWithChips;

const styles = StyleSheet.create({
  selectBox: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: colors.borders.medium,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    flex: 1,
    gap: 4,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 4,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: colors.borders.main,
  },
  chipText: {
    color: colors.textsAndIcons.light,
    marginRight: 4,
  },
  dropdown: {
    marginTop: 4,
    backgroundColor: colors.backgrounds.medium,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  option: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
});
