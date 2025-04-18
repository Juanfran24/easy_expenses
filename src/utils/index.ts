import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";

export const Navigation = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return navigation;
};

export const transformToCurrency = (value: string) => {
  // Elimina todo lo que no sea dígito
  const digitsOnly = value.replace(/\D/g, "");
  if (!digitsOnly) return "";

  // Convierte a número
  const numberValue = Number(digitsOnly);

  // Formatea con separador de miles y sin decimales
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(numberValue);
};
