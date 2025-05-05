import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
import { FlexBox } from "@/src/components/FlexBox";
import { AppTextInput } from "@/src/components/Inputs/AppTextInput";
import colors from "@/src/constants/colors";
import { transformToCurrency } from "@/src/utils";
import AppSelect from "@/src/components/Inputs/AppSelect";
import { AppButton } from "@/src/components/AppButton";
import { AppDateField } from "@/src/components/Inputs/AppDateField";
import {
  createTransaction,
  updateTransaction,
} from "@/src/services/transactions";
import { useNavigation } from "@react-navigation/native";
import AppRadio from "@/src/components/Inputs/AppRadio";

const CreateAndEditTransactions = ({ route }: any) => {
  const navigation = useNavigation();
  const {
    type: typeTransaction,
    isEditing,
    transaction: editingTransaction,
  } = route.params;
  const [nameTransaction, setNameTransaction] = useState("");
  const [valueTransaction, setValueTransaction] = useState("");
  const [dateTransaction, setDateTransaction] = useState<Date>(new Date());
  const [descriptionTransaction, setDescriptionTransaction] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    if (isEditing && editingTransaction) {
      setNameTransaction(editingTransaction.name);
      setValueTransaction(
        transformToCurrency(editingTransaction.amount.toString())
      );
      setDateTransaction(new Date(editingTransaction.date));
      setDescriptionTransaction(editingTransaction.description);
      setPaymentMethod(editingTransaction.paymentMethod);
      setCategory(editingTransaction.category);
    }
  }, [isEditing, editingTransaction]);

  const handleChangeValue = (text: string) => {
    const digitsOnly = text.replace(/\D/g, "");
    setValueTransaction(transformToCurrency(digitsOnly));
  };

  const CATEGORIES = [
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

      const cleanAmount = valueTransaction
        .replace(/[$.]/g, "")
        .replace(/,/g, "");

      const transactionData = {
        name: nameTransaction,
        amount: parseInt(cleanAmount, 10),
        description: descriptionTransaction,
        date: dateTransaction,
        category: category || "all",
        type: typeTransaction,
        paymentMethod: paymentMethod as "cash" | "electronic",
        updatedAt: now,
      };

      if (isEditing && editingTransaction?.id) {
        await updateTransaction(editingTransaction.id, transactionData);
      } else {
        await createTransaction({
          ...transactionData,
          userId: "",
          createdAt: now,
        });
      }

      //@ts-ignore
      navigation.navigate("Home", {
        screen: "Transacciones",
      });
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
    }
  };

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
          onValueChange={(value) => setCategory(value)}
          value={category}
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
          title={`${isEditing ? "Actualizar" : "Agregar"} ${typeTransaction}`}
          onPress={() => onSaveTransaction()}
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
