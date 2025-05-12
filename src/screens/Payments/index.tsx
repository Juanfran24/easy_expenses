import { AppButton } from "@/src/components/AppButton";
import { AppDateField } from "@/src/components/Inputs/AppDateField";
import AppSelect from "@/src/components/Inputs/AppSelect";
import { AppTextInput } from "@/src/components/Inputs/AppTextInput";
import MultiSelectWithChips from "@/src/components/MultiSelect";
import Typography from "@/src/components/Typography";
import colors from "@/src/constants/colors";
import { transformToCurrency } from "@/src/utils";
import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";

const Payments = () => {
  const [valueTransaction, setValueTransaction] = React.useState("");
  const [expirationDate, setExpirationDate] = React.useState<Date | null>(null);

  const handleChangeValue = (text: string) => {
    const digitsOnly = text.replace(/\D/g, "");
    setValueTransaction(transformToCurrency(digitsOnly));
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 110 }}
    >
      <Typography.H5.SemiBold>Pagos no recurrentes</Typography.H5.SemiBold>
      <View style={styles.formContainer}>
        <MultiSelectWithChips
          label="Fuente de pago"
          options={[
            { label: "Salario", value: "salary" },
            { label: "Ahorros", value: "savings" },
            { label: "Inversiones", value: "investments" },
            { label: "Otros", value: "others" },
          ]}
        />
        <MultiSelectWithChips
          label="Categoría"
          options={[
            { label: "Transporte", value: "transport" },
            { label: "Alimentación", value: "food" },
            { label: "Salud", value: "health" },
            { label: "Entretenimiento", value: "entertainment" },
            { label: "Otros", value: "others" },
          ]}
        />
        <AppTextInput
          label="Nombre del pago"
          placeholder="Ingresa el nombre del pago"
          onChangeText={() => {}}
          value={""}
        />
        <AppTextInput
          label="Valor a pagar"
          placeholder="Ejemplo: 100.000"
          value={valueTransaction}
          type="number"
          onChangeText={handleChangeValue}
        />
        <AppDateField
          label="Fecha de vencimiento"
          value={expirationDate}
          onChange={setExpirationDate}
        />
        <AppSelect
          label="Generar alerta"
          placeholder="Seleccionar"
          items={[
            { label: "No generar alerta", value: 0 },
            { label: "1 día antes de la fecha de pago", value: 1 },
            { label: "3 días antes de la fecha de pago", value: 3 },
            { label: "5 días antes de la fecha de pago", value: 5 },
            { label: "10 días antes de la fecha de pago", value: 10 },
          ]}
          onValueChange={() => {}}
          value={null}
        />
      </View>
      <View style={{ marginTop: 24 }}>
        <AppButton variant="outlined" title="Agregar pago" />
      </View>
    </ScrollView>
  );
};

export default Payments;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgrounds.base,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  formContainer: {
    gap: 20,
    marginTop: 24,
  },
});
