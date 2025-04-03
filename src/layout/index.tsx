import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import Transactions from "../screens/Transactions";
import Payments from "../screens/Payments";
import Reports from "../screens/Reports";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const Tab = createBottomTabNavigator();

const Layout = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "white" },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home-filled" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Transactions"
        component={Transactions}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="sync-alt" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Payments"
        component={Payments}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="payments" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Reports"
        component={Reports}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="bar-chart" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Layout;
