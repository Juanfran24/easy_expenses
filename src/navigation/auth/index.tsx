import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "../../screens/Authentication/Landing";
import Register from "../../screens/Authentication/Register";
import Login from "../../screens/Authentication/Login";
import ResetPassword from "../../screens/Authentication/ResetPassword";

export type AuthStackParamList = {
  Landing: undefined;
  Register: undefined;
  Login: undefined;
  ResetPassword: undefined;
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
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
