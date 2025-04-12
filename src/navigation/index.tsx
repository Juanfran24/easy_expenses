import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Configuration from "../screens/Configuration";
import BottomTabStack from "./bottomTab";
import { MaterialIcons } from "@expo/vector-icons";
import colors from "../constants/colors";
import { View } from "react-native";
import { FlexBetween } from "../components/FlexBox/FlexBetween";
import IconApp from "../../assets/images/icon_app.svg";
import EasyExpenses from "../../assets/images/easy_expenses.svg";
const Stack = createNativeStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={BottomTabStack}
        options={{
          headerStyle: {
            backgroundColor: colors.backgrounds.light,
            // @ts-ignore
            borderBottomWidth: 0,
          },
          headerRight: () => (
            <View style={{ marginRight: 10 }}>
              <MaterialIcons
                name="menu"
                size={24}
                color={colors.textsAndIcons.main}
                onPress={() => {
                  console.log("Menu icon pressed");
                }}
              />
            </View>
          ),
          headerLeft: () => (
            <FlexBetween style={{ gap: 11, marginLeft: 10 }}>
              <IconApp />
              <EasyExpenses />
            </FlexBetween>
          ),
          headerTitle: "",
        }}
      />
      <Stack.Screen name="Configuration" component={Configuration} />
    </Stack.Navigator>
  );
};

export default RootStack;
