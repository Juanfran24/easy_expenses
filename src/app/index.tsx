import "expo-router/entry";
import React, { useEffect } from "react";
import {
  Sora_300Light,
  Sora_400Regular,
  Sora_600SemiBold,
  Sora_700Bold,
  Sora_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/sora";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "react-native";
import colors from "../constants/colors";
import { AppProvider } from "../context";
import RootLayout from "../layout";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded, error] = useFonts({
    Sora_ExtraBold: Sora_800ExtraBold,
    Sora_Bold: Sora_700Bold,
    Sora_SemiBold: Sora_600SemiBold,
    Sora_Regular: Sora_400Regular,
    Sora_Light: Sora_300Light,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AppProvider>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.backgrounds.base}
      />
      <RootLayout />
    </AppProvider>
  );
}
