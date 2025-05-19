import React from "react";
import { ButtonProps, StyleSheet, TouchableOpacity } from "react-native";
import Typography from "../../Typography";
import GoogleIcon from "../../../../assets/images/google_icon.svg";
import AppleIcon from "../../../../assets/images/apple_icon.svg";

interface ProviderButtonProps extends ButtonProps {
  provider: "google" | "apple";
}

const ProviderButton = (props: ProviderButtonProps) => {
  const isGoogle = props.provider === "google";

  return (
    <>
      <TouchableOpacity
        onPress={props.onPress}
        style={[
          styles.button,
          isGoogle ? styles.googleButton : styles.appleButton,
        ]}
      >
        {isGoogle ? <GoogleIcon /> : <AppleIcon />}
        <Typography.H6.Regular
          styles={{ color: isGoogle ? "#334155" : "#fff" }}
        >
          {props.title}
        </Typography.H6.Regular>
      </TouchableOpacity>
    </>
  );
};

export default ProviderButton;

const styles = StyleSheet.create({
  button: {
    width: "100%",
    paddingVertical: 12,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 8,
  },
  googleButton: {
    backgroundColor: "#fff",
  },
  appleButton: {
    backgroundColor: "#000",
  },
});
