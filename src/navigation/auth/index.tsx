import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Landing from "../../screens/Authentication/Landing";
import Register from "../../screens/Authentication/Register";
import Login from "../../screens/Authentication/Login";
import ResetPassword from "../../screens/Authentication/ResetPassword";
import NewPassword from "../../screens/Authentication/NewPassword";

export type AuthStackParamList = {
  Landing: undefined;
  Register: undefined;
  Login: undefined;
  ResetPassword: undefined;
  NewPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

interface AuthStackProps {
  initialRouteName?: keyof AuthStackParamList;
}

function AuthStack({ initialRouteName = "Landing" }: AuthStackProps) {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
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
      <Stack.Screen
        name="NewPassword"
        component={NewPassword}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default AuthStack;
