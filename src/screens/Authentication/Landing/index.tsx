import React from "react";
import { View, StyleSheet, Image, Dimensions} from "react-native";
import Typography from "@/src/components/Typography";
import { AppButton } from "@/src/components/Button";
import colors from "@/src/constants/colors";

const { width } = Dimensions.get("window");

const Landing = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/easyExpense-icon.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Typography.H2 styles={styles.heading}>
        Alcanza tu objetivo financiero
      </Typography.H2>
      <Typography.P1.Regular styles={styles.description}>
        Le ofrecemos las mejores características financieras y el sistema más
        seguro para ayudarlo a aumentar su riqueza.
      </Typography.P1.Regular>
      <AppButton
        title="Registrarse"
        variant="contained"
        onPress={() => console.log("Registrarse presionado")}
        style={{ width: "100%"}}
      />
      <AppButton
        title="Ya tengo cuenta"
        variant="outlined"
        onPress={() => console.log("Ya tengo cuenta presionado")}
        style={styles.secondaryButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgrounds.base,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  logo: {
    width: width * 0.4,
    height: width * 0.4,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.primary.main,
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textsAndIcons.main,
    textAlign: "center",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: colors.textsAndIcons.medium,
    textAlign: "center",
    marginBottom: 30,
  },
  secondaryButton: {
    width: "100%",
    marginTop: 10,
  },
});

export default Landing;