import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Configuration from "../screens/Configuration";
import BottomTabStack from "./bottomTab";
import colors from "../constants/colors";
import { FlexBetween } from "../components/FlexBox/FlexBetween";
import IconApp from "../../assets/images/icon_app.svg";
import EasyExpenses from "../../assets/images/easy_expenses.svg";
import AppBarMenu from "../components/AppBarMenu";
import Typography from "../components/Typography";

// Definimos los tipos de las rutas
export type RootStackParamList = {
  Home: undefined;
  Configuration: undefined;
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
          headerTitleAlign: "center",
          headerTintColor: colors.textsAndIcons.main,
        }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
