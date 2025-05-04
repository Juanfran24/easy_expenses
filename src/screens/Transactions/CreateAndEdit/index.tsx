import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { FlexBox } from "@/src/components/FlexBox";
import { AppTextInput } from "@/src/components/Inputs/AppTextInput";
import colors from "@/src/constants/colors";
import { transformToCurrency } from "@/src/utils";
import AppSelect from "@/src/components/Inputs/AppSelect";
import { AppButton } from "@/src/components/AppButton";
import { AppDateField } from "@/src/components/Inputs/AppDateField";
import { createTransaction } from "@/src/services/transactions";
import { Transaction } from "@/src/models/Transaction";
import { useNavigation } from "@react-navigation/native";

const CreateAndEditTransactions = ({ route }: any) => {
  const navigation = useNavigation();
  const { type: typeTransaction } = route.params;
  const [nameTransaction, setNameTransaction] = useState("");
  const [valueTransaction, setValueTransaction] = useState("");
  const [dateTransaction, setDateTransaction] = useState<Date>(new Date());
  const [descriptionTransaction, setDescriptionTransaction] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [category, setCategory] = useState("");

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

  const onSaveTransaction = async () => {
    try {
      const now = new Date();
      
      // Remover el formato de moneda y convertir a número
      const cleanAmount = valueTransaction.replace(/[$.]/g, '').replace(/,/g, '');
      
      const transaction: Transaction = {
        name: nameTransaction,
        amount: parseInt(cleanAmount, 10),
        description: descriptionTransaction,
        date: dateTransaction,
        category: category || "all",
        type: typeTransaction,
        paymentMethod: paymentMethod as 'cash' | 'electronic',
        userId: "",
        createdAt: now,
        updatedAt: now
      };

      await createTransaction(transaction);
      //@ts-ignore
      navigation.navigate("Home", {
        screen: "Transacciones"
      });
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
    }
  };

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
          onValueChange={(value) => setCategory(value)}
          value={category}
        />
        <AppSelect
          label="Método de Pago"
          placeholder="Seleccionar"
          items={PAYMENT_METHODS}
          onValueChange={(value) => setPaymentMethod(value)}
          value={paymentMethod}
        />
        <AppButton
          title={`Agregar ${typeTransaction}`}
          onPress={() => onSaveTransaction()}
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
