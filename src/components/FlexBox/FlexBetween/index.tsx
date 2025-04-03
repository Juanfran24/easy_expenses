import { View, ViewProps } from "react-native";

interface FlexBoxProps extends ViewProps {
  children: React.ReactNode;
}
export const FlexBetween = (props: FlexBoxProps) => {
  const { children, style, ...rest } = props;

  return (
    <View
      style={[{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
      }, style]}
      {...rest}
    >
      {children}
    </View>
  );
};
