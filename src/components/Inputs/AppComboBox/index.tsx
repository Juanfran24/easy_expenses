import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ViewStyle,
  Animated,
  Modal,
  Dimensions,
} from "react-native";
import Typography from "../../Typography";
import colors from "@/src/constants/colors";
import { MaterialIcons } from "@expo/vector-icons";
import { FlexBetween } from "../../FlexBox/FlexBetween";

interface ComboBoxItem {
  label: string;
  value: string;
}

interface AppComboBoxProps {
  label?: string;
  value?: string;
  items?: ComboBoxItem[];
  onSelect?: (item: ComboBoxItem) => void;
  onCustomAction?: () => void;
  customActionEnabled?: boolean;
  containerStyle?: ViewStyle;
  icon?: keyof typeof MaterialIcons.glyphMap;
  iconOnly?: boolean;
  dropdownAlign?: "left" | "right";
}

export const AppComboBox: React.FC<AppComboBoxProps> = ({
  label,
  value,
  items = [],
  onSelect,
  onCustomAction,
  customActionEnabled = false,
  containerStyle,
  icon,
  iconOnly = false,
  dropdownAlign = "left",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const selectedItem = items.find((item) => item.value === value);
  const screenWidth = Dimensions.get("window").width;

  useEffect(() => {
    if (isOpen) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen]);

  const handlePress = () => {
    if (customActionEnabled && onCustomAction) {
      onCustomAction();
    } else {
      buttonRef.current?.measure((x, y, width, height, pageX, pageY) => {
        setButtonPosition({ x: pageX, y: pageY, width, height });
        setIsOpen(true);
      });
    }
  };

  const handleSelect = (item: ComboBoxItem) => {
    onSelect?.(item);
    setIsOpen(false);
  };

  const buttonRef = useRef<View>(null);

  const renderButton = () => (
    <View ref={buttonRef} collapsable={false}>
      <TouchableOpacity onPress={handlePress}>
        <FlexBetween
          style={[styles.selectButton, iconOnly && styles.iconOnlyButton]}
        >
          {icon && (
            <MaterialIcons
              name={icon}
              size={20}
              color={colors.textsAndIcons.dark}
            />
          )}
          {!iconOnly && (
            <FlexBetween style={{ gap: 4, flex: 1 }}>
              <Typography.P3.Regular
                styles={{
                  color: selectedItem
                    ? colors.textsAndIcons.main
                    : colors.textsAndIcons.dark,
                  flex: 1,
                  marginRight: 24,
                }}
                numberOfLines={1}
              >
                {selectedItem ? selectedItem.label : label}
              </Typography.P3.Regular>
              <MaterialIcons
                name="arrow-drop-down"
                size={24}
                color={colors.textsAndIcons.dark}
                style={{ position: "absolute", right: 0 }}
              />
            </FlexBetween>
          )}
        </FlexBetween>
      </TouchableOpacity>
    </View>
  );

  const renderDropdown = () => {
    if (!buttonPosition) return null;

    const SCREEN_PADDING = 16; // Padding from screen edges
    const rightSpace = screenWidth - (buttonPosition.x + buttonPosition.width);
    const shouldAlignRight = rightSpace < buttonPosition.width;

    const dropdownStyle: ViewStyle = {
      position: "absolute",
      top: buttonPosition.y + buttonPosition.height + 4,
      width: Math.max(buttonPosition.width, 150), // Minimum width for dropdown
      opacity: fadeAnim,
      transform: [
        {
          translateY: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-20, 0],
          }),
        },
      ],
    };

    // Aplicar alineación según el parámetro dropdownAlign
    if (dropdownAlign === "right") {
      dropdownStyle.right = SCREEN_PADDING;
    } else {
      dropdownStyle.left = buttonPosition.x;
    }

    return (
      <Modal
        visible={isOpen}
        transparent
        animationType="none"
        onRequestClose={() => setIsOpen(false)}
      >
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          onPress={() => setIsOpen(false)}
          activeOpacity={1}
        >
          <Animated.View style={[styles.dropdown, dropdownStyle]}>
            <ScrollView style={styles.scrollView} bounces={false}>
              {items.map((item) => (
                <TouchableOpacity
                  key={item.value}
                  style={[
                    styles.option,
                    item.value === value && styles.selectedOption,
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Typography.P3.Regular
                    styles={{
                      color:
                        item.value === value
                          ? colors.primary.main
                          : colors.textsAndIcons.main,
                    }}
                  >
                    {item.label}
                  </Typography.P3.Regular>
                  {item.value === value && (
                    <MaterialIcons
                      name="check"
                      size={20}
                      color={colors.primary.main}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        </TouchableOpacity>
      </Modal>
    );
  };

  return (
    <>
      {renderButton()}
      {renderDropdown()}
    </>
  );
};

const styles = StyleSheet.create({
  selectButton: {
    borderWidth: 1,
    borderColor: colors.textsAndIcons.dark,
    borderRadius: 50,
    padding: 4,
    backgroundColor: "transparent",
    minWidth: 120,
  },
  iconOnlyButton: {
    width: 40,
    paddingHorizontal: 8,
    minWidth: 40,
  },
  dropdown: {
    backgroundColor: colors.backgrounds.light,
    borderRadius: 12,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    maxHeight: 200,
  },
  scrollView: {
    maxHeight: 200,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.borders.dark,
  },
  selectedOption: {
    backgroundColor: colors.backgrounds.medium,
  },
});
