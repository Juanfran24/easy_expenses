import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import Landing from "../screens/Authentication/Landing";
import Register from "../screens/Authentication/Register";
import Login from "../screens/Authentication/Login";

const Stack = createNativeStackNavigator();

function MyStack() {
  
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Landing"
        component={Landing}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{ headerShown: false }} />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <>
      <MyStack/>
      <StatusBar style="auto" />
    </>
  )
}