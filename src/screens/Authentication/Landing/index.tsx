import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Typography from "@/src/components/Typography";
import { AppButton } from "@/src/components/AppButton";
import colors from "@/src/constants/colors";
import { FlexBox } from "@/src/components/FlexBox";
import IconApp from "../../../../assets/images/icon.svg";

const { width } = Dimensions.get("window");

const Landing = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {/* <Image
        source={require("@/assets/images/easyExpense-icon.png")}
        style={styles.logo}
        resizeMode="contain"
      /> */}
      <IconApp width={width * 0.4} height={width * 0.4} />
      <Typography.H2 styles={styles.heading}>
        Alcanza tu objetivo financiero
      </Typography.H2>
      <Typography.H6.Light styles={styles.description}>
        Le ofrecemos las mejores características financieras y el sistema más
        seguro para ayudarlo a aumentar su riqueza.
      </Typography.H6.Light>
      <FlexBox style={{ width: "100%", gap: 16 }}>
        <AppButton
          title="Registrarse"
          variant="contained"
          onPress={() => {
            // @ts-ignore
            navigation.navigate("Register");
          }}
        />
        <AppButton
          title="Ya tengo cuenta"
          variant="outlined"
          onPress={() => {
            // @ts-ignore
            navigation.navigate("Login");
          }}
        />
      </FlexBox>
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
    color: colors.textsAndIcons.light,
    textAlign: "center",
    marginBottom: 50,
    width: "85%",
  },
  secondaryButton: {
    width: "100%",
    marginTop: 10,
  },
});

export default Landing;
