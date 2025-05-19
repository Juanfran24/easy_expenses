import React, { useState } from "react";
import { Switch, SwitchProps } from "react-native";
import { FlexBetween } from "../../FlexBox/FlexBetween";
import Typography from "../../Typography";
import colors from "@/src/constants/colors";

interface AppSwitchProps extends SwitchProps {
  label: string;
  labelPosition?: "left" | "right";
}

const AppSwitch: React.FC<AppSwitchProps> = ({
  label,
  labelPosition = "left",
  ...props
}) => {
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <FlexBetween>
      {label && labelPosition === "left" && (
        <Typography.H6.Light>{label}</Typography.H6.Light>
      )}
      <Switch
        {...props}
        value={isEnabled}
        onValueChange={toggleSwitch}
        trackColor={{
          false: colors.backgrounds.light,
          true: colors.primary.main,
        }}
        thumbColor={
          isEnabled ? colors.backgrounds.primary : colors.textsAndIcons.dark
        }
      />
      {label && labelPosition === "right" && (
        <Typography.H6.Light>{label}</Typography.H6.Light>
      )}
    </FlexBetween>
  );
};

export default AppSwitch;
