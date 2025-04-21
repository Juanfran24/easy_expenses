import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { FlexBox } from "@/src/components/FlexBox";
import { AppTextInput } from "@/src/components/Inputs/AppTextInput";
import colors from "@/src/constants/colors";
import { transformToCurrency } from "@/src/utils";
import AppSelect from "@/src/components/Inputs/AppSelect";
import { AppButton } from "@/src/components/AppButton";
import { AppDateField } from "@/src/components/Inputs/AppDateField";

const CreateAndEditTransactions = ({ route }: any) => {
  const { type: typeTransaction } = route.params; // "ingreso" o "gasto"
  const [nameTransaction, setNameTransaction] = useState("");
  const [valueTransaction, setValueTransaction] = useState("");
  const [dateTransaction, setDateTransaction] = useState<Date>(new Date());
  const [descriptionTransaction, setDescriptionTransaction] = useState("");

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

  return (
    <View style={styles.container}>
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
        <AppTextInput
          label="Descripción"
          placeholder="Agrega una descripción"
          value={descriptionTransaction}
          onChangeText={setDescriptionTransaction}
          multiline={true}
          numberOfLines={3}
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
        <AppButton
          title={`Agregar ${typeTransaction}`}
          onPress={() => console.log("Guardar")}
          variant="outlined"
        />
      </FlexBox>
    </View>
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
});
