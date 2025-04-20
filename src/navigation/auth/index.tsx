import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "../../screens/Authentication/Landing";
import Register from "../../screens/Authentication/Register";
import Login from "../../screens/Authentication/Login";

export type AuthStackParamList = {
  Landing: undefined;
  Register: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthStack() {
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
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
