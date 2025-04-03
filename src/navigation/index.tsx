import { createNativeStackNavigator } from "@react-navigation/native-stack";
import "@/global.css";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import Home from "../screens/Home/index";
// import Add from "../screens/Add";
import { StatusBar } from "expo-status-bar";
import Layout from "../layout";

const Stack = createNativeStackNavigator();


function MyStack() {
  
  return (
    <GluestackUIProvider mode="light">// <Layout>
      // </Layout>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} />
        {/* <Stack.Screen name="Add" component={Add} /> */}
      </Stack.Navigator></GluestackUIProvider>
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