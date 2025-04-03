import React from "react";
import { Text, TextProps, StyleSheet, StyleProp, TextStyle } from "react-native";
import { styles } from "./styles";

interface TypographyProps extends TextProps {
  children: React.ReactNode;
  styles?: StyleProp<TextStyle>;
}

const Typography = {
  H1: (props: TypographyProps) => <Text style={{ ...styles.h1, ...(StyleSheet.flatten(props.styles) || {}) }} {...props} />,
  H2: (props: TypographyProps) => <Text style={{ ...styles.h2, ...(StyleSheet.flatten(props.styles) || {}) }} {...props} />,
  H3: (props: TypographyProps) => <Text style={{ ...styles.h3, ...(StyleSheet.flatten(props.styles) || {}) }} {...props} />,
  H4: (props: TypographyProps) => <Text style={{ ...styles.h4, ...(StyleSheet.flatten(props.styles) || {}) }} {...props} />,
  H5: {
    Bold: (props: TypographyProps) => <Text style={{ ...styles.h5Bold, ...(StyleSheet.flatten(props.styles) || {}) }} {...props} />,
    SemiBold: (props: TypographyProps) => <Text style={{ ...styles.h5SemiBold, ...(StyleSheet.flatten(props.styles) || {}) }} {...props} />,
    Regular: (props: TypographyProps) => <Text style={{ ...styles.h5Regular, ...(StyleSheet.flatten(props.styles) || {}) }} {...props} />,
  },
  H6: {
    SemiBold: (props: TypographyProps) => <Text style={{ ...styles.h6SemiBold, ...(StyleSheet.flatten(props.styles) || {}) }} {...props} />,
    Regular: (props: TypographyProps) => <Text style={{ ...styles.h6Regular, ...(StyleSheet.flatten(props.styles) || {}) }} {...props} />,
    Light: (props: TypographyProps) => <Text style={{ ...styles.h6Light, ...(StyleSheet.flatten(props.styles) || {}) }} {...props} />,
  },
  P1: {
    SemiBold: (props: TypographyProps) => <Text style={{ ...styles.p1SemiBold, ...(StyleSheet.flatten(props.styles) || {}) }} {...props} />,
    Regular: (props: TypographyProps) => <Text style={{ ...styles.p1Regular, ...(StyleSheet.flatten(props.styles) || {}) }} {...props} />,
  },
  P2: {
    SemiBold: (props: TypographyProps) => <Text style={{ ...styles.p2SemiBold, ...(StyleSheet.flatten(props.styles) || {}) }} {...props} />,
    Regular: (props: TypographyProps) => <Text style={{ ...styles.p2Regular, ...(StyleSheet.flatten(props.styles) || {}) }} {...props} />,
  },
  P3: {
    SemiBold: (props: TypographyProps) => <Text style={{ ...styles.p3SemiBold, ...(StyleSheet.flatten(props.styles) || {}) }} {...props} />,
    Regular: (props: TypographyProps) => <Text style={{ ...styles.p3Regular, ...(StyleSheet.flatten(props.styles) || {}) }} {...props} />,
    Underline: (props: TypographyProps) => <Text style={{ ...styles.p3UnderlineRegular, ...(StyleSheet.flatten(props.styles) || {}) }} {...props} />,
    Light: (props: TypographyProps) => <Text style={{ ...styles.p3Light, ...(StyleSheet.flatten(props.styles) || {}) }} {...props} />,
  },
  P4: {
    Regular: (props: TypographyProps) => <Text style={{ ...styles.p4Regular, ...(StyleSheet.flatten(props.styles) || {}) }} {...props} />,
  }
}

export default Typography;
