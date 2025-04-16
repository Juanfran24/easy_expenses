import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Configuration from "../screens/Configuration";
import BottomTabStack, { BottomTabParamList } from "./bottomTab";
import colors from "../constants/colors";
import { FlexBetween } from "../components/FlexBox/FlexBetween";
import IconApp from "../../assets/images/icon_app.svg";
import EasyExpenses from "../../assets/images/easy_expenses.svg";
import AppBarMenu from "../components/AppBarMenu";
import Typography from "../components/Typography";
import CreateCategory from "../screens/Configuration/CreateCategory";
import { NavigatorScreenParams } from "@react-navigation/native";
import BackButtonHeader from "../components/BackButtonHeader";

// Definimos los tipos de las rutas
export type RootStackParamList = {
  Home: NavigatorScreenParams<BottomTabParamList>;
  Configuration: undefined;
  CreateCategory: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={BottomTabStack}
        options={{
          headerStyle: {
            backgroundColor: colors.backgrounds.light,
            // @ts-ignore
            borderBottomWidth: 0,
          },
          headerRight: () => <AppBarMenu />,
          headerLeft: () => (
            <FlexBetween style={{ gap: 11, marginLeft: 10 }}>
              <IconApp />
              <EasyExpenses />
            </FlexBetween>
          ),
          headerTitle: "",
        }}
      />
      <Stack.Screen
        name="Configuration"
        component={Configuration}
        options={{
          headerStyle: {
            backgroundColor: colors.backgrounds.light,
            // @ts-ignore
            borderBottomWidth: 0,
          },
          headerTitle: () => (
            <Typography.H5.Regular>Configuración</Typography.H5.Regular>
          ),
          headerLeft: () => <BackButtonHeader />,
          headerTitleAlign: "center",
          headerTintColor: colors.textsAndIcons.main,
        }}
      />
      <Stack.Screen
        name="CreateCategory"
        component={CreateCategory}
        options={{
          headerStyle: {
            backgroundColor: colors.backgrounds.light,
            // @ts-ignore
            borderBottomWidth: 0,
          },
          headerTitle: () => (
            <Typography.H5.Regular>Configuración</Typography.H5.Regular>
          ),
          headerLeft: () => <BackButtonHeader />,
          headerTitleAlign: "center",
          headerTintColor: colors.textsAndIcons.main,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
