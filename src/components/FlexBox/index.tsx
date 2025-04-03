import { View, ViewProps } from "react-native";

interface FlexBoxProps extends ViewProps {
  children: React.ReactNode;
}
export const FlexBox = (props: FlexBoxProps) => {
  const { children, style, ...rest } = props;

  return (
    <View
      style={[{
        display: "flex",
      }, style]}
      {...rest}
    >
      {children}
    </View>
  );
};
