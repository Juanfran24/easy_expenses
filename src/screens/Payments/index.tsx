import React, { useState, useEffect } from "react";
import { AppButton } from "@/src/components/AppButton";
import { AppDateField } from "@/src/components/Inputs/AppDateField";
import AppSelect from "@/src/components/Inputs/AppSelect";
import { AppTextInput } from "@/src/components/Inputs/AppTextInput";
import MultiSelectWithChips from "@/src/components/MultiSelect";
import Typography from "@/src/components/Typography";
import colors from "@/src/constants/colors";
import { transformToCurrency } from "@/src/utils";
import { createPayment, updatePayment } from "@/src/services/payments";
import { ScrollView, StyleSheet, View, Alert } from "react-native";
import { useStore } from "@/src/store";
import { useNavigation } from "@react-navigation/native";

const Payments = () => {
  const navigation = useNavigation();
  const [paymentName, setPaymentName] = useState("");
  const [valueTransaction, setValueTransaction] = useState("");
  const [expirationDate, setExpirationDate] = useState<Date | null>(new Date());
  const [paymentSources, setPaymentSources] = useState<string[]>([]);
  const [paymentCategories, setPaymentCategories] = useState<string[]>([]);
  const [alertDaysBefore, setAlertDaysBefore] = useState<string | null>(null);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const { categories, loadCategories } = useStore();

  const handleChangeValue = (text: string) => {
    const digitsOnly = text.replace(/\D/g, "");
    setValueTransaction(transformToCurrency(digitsOnly));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        if (categories.length !== 0) {
          setLoadingCategories(false);
          return;
        }
      } catch (error) {
        console.error("Error al cargar categorías:", error);
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategories();
  }, [categories, loadCategories]);
  
  const handleSavePayment = async () => {
    try {
      // Validaciones

      // Limpieza del valor del pago
      const cleanAmount = valueTransaction
        .replace(/[$.]/g, "")
        .replace(/,/g, "");

      // Preparación de datos del pago
      const paymentData = {
        name: paymentName,
        amount: parseInt(cleanAmount, 10),
        expirationDate: expirationDate as Date,
        paymentSources: paymentSources,
        categories: paymentCategories,
        alertDaysBefore: alertDaysBefore ? parseInt(alertDaysBefore) : null,
        isPaid: false,
        paidDate: null,
      };

      // Creación del pago
      await createPayment(paymentData);
      Alert.alert("Éxito", "Pago agregado correctamente");
      
      // Limpieza de formulario
      setPaymentName("");
      setValueTransaction("");
      setExpirationDate(new Date());
      setPaymentSources([]);
      setPaymentCategories([]);
      setAlertDaysBefore(null);
      
      // Navegación de regreso
      // @ts-ignore
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error al guardar el pago:", error);
      Alert.alert("Error", "No se pudo guardar el pago");
    }
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
          selectedValues={paymentSources}
          onSelectionChange={setPaymentSources}
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
          selectedValues={paymentCategories}
          onSelectionChange={setPaymentCategories}
        />
        <AppTextInput
          label="Nombre del pago"
          placeholder="Ingresa el nombre del pago"
          onChangeText={setPaymentName}
          value={paymentName}
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
            { label: "No generar alerta", value: "0" },
            { label: "1 día antes de la fecha de pago", value: "1" },
            { label: "3 días antes de la fecha de pago", value: "3" },
            { label: "5 días antes de la fecha de pago", value: "5" },
            { label: "10 días antes de la fecha de pago", value: "10" },
          ]}
          onValueChange={setAlertDaysBefore}
          value={alertDaysBefore}
        />
      </View>
      <View style={{ marginTop: 24 }}>
        <AppButton 
          variant="outlined" 
          title="Agregar pago" 
          onPress={handleSavePayment} 
        />
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
