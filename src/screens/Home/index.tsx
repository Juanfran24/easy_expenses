import SpeedFabView from "@/src/components/FABButtom";
import colors from "@/src/constants/colors";
import React from "react";
import { Text, View } from "react-native";

const Home = () => {
  return (
    <View
      style={{ backgroundColor: colors.backgrounds.medium, height: "110%" }}
    >
      <Text>Home Screen</Text>
      <SpeedFabView />
    </View>
  );
};

export default Home;
