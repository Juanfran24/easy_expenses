import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";

export const Navigation = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return navigation;
};
