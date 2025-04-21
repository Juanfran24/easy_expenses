import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FlexBox } from "@/src/components/FlexBox";
import { AppTextInput } from "@/src/components/Inputs/AppTextInput";
import colors from "@/src/constants/colors";
import { transformToCurrency } from "@/src/utils";
import AppSelect from "@/src/components/Inputs/AppSelect";
import { AppButton } from "@/src/components/AppButton";
import { AppDateField } from "@/src/components/Inputs/AppDateField";
import AppRadio from "@/src/components/Inputs/AppRadio";

const CreateAndEditTransactions = ({ route }: any) => {
  const { type: typeTransaction } = route.params; // "ingreso" o "gasto"
  const [nameTransaction, setNameTransaction] = useState("");
  const [valueTransaction, setValueTransaction] = useState("");
  const [dateTransaction, setDateTransaction] = useState<Date>(new Date());
  const [descriptionTransaction, setDescriptionTransaction] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(0);

  // Cada cambio: extrae dígitos del texto (incluye borrados) y formatea
  const handleChangeValue = (text: string) => {
    const digitsOnly = text.replace(/\D/g, "");
    setValueTransaction(transformToCurrency(digitsOnly));
  };

  const CATEGORIES = [
    { label: "Categorías", value: "all" },
    { label: "Salario principal", value: "main_salary" },
    { label: "Servicios públicos", value: "utilities" },
    { label: "Transporte", value: "transport" },
    { label: "Alimentación", value: "food" },
  ];

  const PAYMENT_METHODS = [
    { label: "Efectivo", value: "cash" },
    { label: "Electrónico", value: "electronic" },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <FlexBox style={styles.formContainer}>
        <AppTextInput
          label={`Nombre ${typeTransaction}`}
          placeholder="Ejemplo: Renta"
          value={nameTransaction}
          onChangeText={setNameTransaction}
        />
        <AppTextInput
          label="Valor"
          placeholder="Ejemplo: 1000"
          value={valueTransaction}
          type="number"
          onChangeText={handleChangeValue}
        />
        <AppDateField
          label="Fecha"
          value={dateTransaction}
          onChange={setDateTransaction}
        />
        <AppSelect
          label="Categoría"
          placeholder="Seleccionar"
          items={CATEGORIES}
          onValueChange={(value) => console.log(value)}
          value={""}
        />
        <AppRadio
          label="Metodo de pago"
          value={paymentMethod}
          onValueChange={setPaymentMethod}
          items={PAYMENT_METHODS.map((category) => ({
            label: category.label,
            value: category.value,
          }))}
        />
        <AppTextInput
          style={styles.textArea}
          label="Descripción"
          placeholder="Añade una descripción..."
          value={descriptionTransaction}
          onChangeText={setDescriptionTransaction}
          multiline={true}
          numberOfLines={4}
        />
        <AppButton
          title={`Agregar ${typeTransaction}`}
          onPress={() => console.log("Guardar")}
          variant="outlined"
        />
      </FlexBox>
    </ScrollView>
  );
};

export default CreateAndEditTransactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgrounds.base,
    padding: 24,
  },
  formContainer: {
    gap: 20,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
});
