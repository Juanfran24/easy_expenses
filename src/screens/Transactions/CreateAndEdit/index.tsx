import React, { useState, useEffect } from "react";
import { StyleSheet, ScrollView, Alert } from "react-native";
import { FlexBox } from "@/src/components/FlexBox";
import { AppTextInput } from "@/src/components/Inputs/AppTextInput";
import colors from "@/src/constants/colors";
import { transformToCurrency } from "@/src/utils";
import AppSelect from "@/src/components/Inputs/AppSelect";
import { AppButton } from "@/src/components/AppButton";
import {
  createTransaction,
  updateTransaction,
} from "@/src/services/transactions";
import { getUserCategories } from "@/src/services/categories";
import { Category } from "@/src/models/Category";
import { useNavigation } from "@react-navigation/native";
import AppRadio from "@/src/components/Inputs/AppRadio";
import { AppDateField } from "@/src/components/Inputs/AppDateField";

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
  const [paymentMethod, setPaymentMethod] = useState<string>("cash");
  const [category, setCategory] = useState("");
  const [dayOfMonth, setDayOfMonth] = useState<number>(1);
  const [localTypeTransaction, setLocalTypeTransaction] = useState<string>("fijo");
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    if (isEditing && editingTransaction) {
      setNameTransaction(editingTransaction.name);
      setValueTransaction(
        transformToCurrency(editingTransaction.amount.toString())
      );
      setDateTransaction(editingTransaction.date ? new Date(editingTransaction.date) : new Date());
      setDescriptionTransaction(editingTransaction.description || "");
      setPaymentMethod(editingTransaction.paymentMethod);
      setCategory(editingTransaction.category);
      if (editingTransaction.endDate) {
        setEndDate(new Date(editingTransaction.endDate));
      } else {
        setEndDate(null);
      }
      if (editingTransaction.localTypeTransaction) {
        setLocalTypeTransaction(editingTransaction.localTypeTransaction);
      }
      if (editingTransaction.dayOfMonth) {
        setDayOfMonth(editingTransaction.dayOfMonth);
      }
    }
  }, [isEditing, editingTransaction]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const userCategories = await getUserCategories();
        setCategories(userCategories.filter(cat => cat.type === 
          (typeTransaction === "ingreso" ? "Ingreso" : "Gasto")));
      } catch (error) {
        console.error("Error al cargar categorías:", error);
        Alert.alert("Error", "No se pudieron cargar las categorías");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [typeTransaction]);

  const handleChangeValue = (text: string) => {
    const digitsOnly = text.replace(/\D/g, "");
    setValueTransaction(transformToCurrency(digitsOnly));
  };

  const categoryItems = categories.map(cat => ({
    label: cat.name,
    value: cat.id || "",
  }));

  const categoriesWithDefault = [
    ...categoryItems
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
        category: category || "none",
        type: typeTransaction,
        paymentMethod: paymentMethod as "cash" | "electronic",
        updatedAt: now,
        localTypeTransaction: localTypeTransaction as "fijo" | "variable",
        dayOfMonth: localTypeTransaction === "fijo" ? dayOfMonth : undefined,
        endDate: localTypeTransaction === "fijo" ? endDate : undefined,
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
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <FlexBox style={styles.formContainer}>
        <AppRadio
          label="Tipo de ingreso"
          value={localTypeTransaction === "fijo" ? 0 : 1}
          onValueChange={(value) =>
            setLocalTypeTransaction(value === 0 ? "fijo" : "variable")
          }
          items={[
            { label: "Fijo", value: "fijo" },
            { label: "Variable", value: "variable" },
          ]}
        />
        <AppTextInput
          label={`Nombre ${typeTransaction}`}
          placeholder="Ejemplo: Renta"
          value={nameTransaction}
          onChangeText={setNameTransaction}
        />
        <AppTextInput
          label="Valor"
          placeholder="Ejemplo: $2.500.000"
          value={valueTransaction}
          type="number"
          onChangeText={handleChangeValue}
          maxLength={20}
        />
        <AppSelect
          label="Categoría"
          placeholder={loadingCategories ? "Cargando categorías..." : "Seleccionar"}
          items={categoriesWithDefault}
          onValueChange={(value) => setCategory(value)}
          value={category}
        />
        <AppDateField
          label="Fecha"
          value={dateTransaction}
          onChange={setDateTransaction}
        />
        {localTypeTransaction === "fijo" ? (
          <>
            <AppRadio
              label="Metodo de pago"
              value={paymentMethod === "cash" ? 0 : 1}
              onValueChange={(value) =>
                setPaymentMethod(value === 0 ? "cash" : "electronic")
              }
              items={PAYMENT_METHODS.map((category) => ({
                label: category.label,
                value: category.value,
              }))}
            />
            <AppSelect
              label="Día del mes"
              placeholder="Seleccionar"
              items={Array.from({ length: 30 }, (_, i) => ({
                label: `${i + 1}`,
                value: (i + 1).toString(),
              }))}
              onValueChange={(value) => setDayOfMonth(parseInt(value))}
              value={dayOfMonth.toString()}
            />
            {localTypeTransaction === "fijo" && typeTransaction === "gasto" && (
              <AppDateField
                label="Fecha hasta (Opcional)"
                value={endDate}
                onChange={setDateTransaction}
              />
            )}
          </>
        ) : (
          <>
            <AppRadio
              label="Metodo de pago"
              value={paymentMethod === "cash" ? 0 : 1}
              onValueChange={(value) =>
                setPaymentMethod(value === 0 ? "cash" : "electronic")
              }
              items={PAYMENT_METHODS.map((category) => ({
                label: category.label,
                value: category.value,
              }))}
            />
          </>
        )}
        <AppTextInput
          style={styles.textArea}
          label="Nota (Opcional)"
          placeholder="Ingresar descripción"
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
