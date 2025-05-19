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
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useAuth } from "../context/AuthContext/useAuth";

export default function App() {
  const { isLoading: isLoadingSignIn } = useAuth();
  const [loaded, error] = useFonts({
    Sora_ExtraBold: Sora_800ExtraBold,
    Sora_Bold: Sora_700Bold,
    Sora_SemiBold: Sora_600SemiBold,
    Sora_Regular: Sora_400Regular,
    Sora_Light: Sora_300Light,
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
      // Ocultar el splash solo cuando las fuentes estén listas (o haya error) y no esté cargando el signin
      if ((loaded || error) && !isLoadingSignIn) {
        await SplashScreen.hideAsync();
      }
    }
    prepare();
  }, [loaded, error, isLoadingSignIn]);

  // Mientras las fuentes no estén listas o esté cargando el signin, mantener splash
  if (!loaded || isLoadingSignIn) {
    return null;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <SafeAreaView style={{ flex: 1 }}>
          <AppProvider>
            <StatusBar
              barStyle="light-content"
              backgroundColor={colors.backgrounds.base}
            />
            <RootLayout />
          </AppProvider>
        </SafeAreaView>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
