import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialIcons } from "@expo/vector-icons";
import Home from "@/src/screens/Home";
import Payments from "@/src/screens/Payments";
import Reports from "@/src/screens/Reports";
import Transactions from "@/src/screens/Transactions";
import colors from "@/src/constants/colors";

const Tab = createBottomTabNavigator();

const BottomTabStack = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: colors.backgrounds.medium,
          borderTopWidth: 0,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          height: 64,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "400",
        },
        tabBarActiveTintColor: colors.primary.main,
        tabBarInactiveTintColor: colors.borders.medium,
      }}
      backBehavior="firstRoute"
    >
      <Tab.Screen
        name="Inicio"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="home-filled" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Transacciones"
        component={Transactions}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="sync-alt" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Pagos"
        component={Payments}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="payments" color={color} size={24} />
          ),
        }}
      />
      <Tab.Screen
        name="Reportes"
        component={Reports}
        options={{
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="bar-chart" color={color} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabStack;
