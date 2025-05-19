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
import { FlexBox } from "@/src/components/FlexBox";
import PaymentCard from "@/src/components/PaymentCard";
import { Payment } from "@/src/models/Payment";

const Payments = () => {
  const navigation = useNavigation();
  const [paymentName, setPaymentName] = useState("");
  const [valuePayment, setValuePayment] = useState("");
  const [expirationDate, setExpirationDate] = useState<Date | null>(new Date());
  const [paymentSources, setPaymentSources] = useState<string[]>([]);
  const [paymentCategories, setPaymentCategories] = useState<string[]>([]);
  const [alertDaysBefore, setAlertDaysBefore] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPaymentId, setCurrentPaymentId] = useState<string | undefined>(undefined);
  const categories = useStore(state => state.categories);
  const pyments = useStore(state => state.pyments);

  const handleChangeValue = (text: string) => {
    const digitsOnly = text.replace(/\D/g, "");
    setValuePayment(transformToCurrency(digitsOnly));
  };

  const handleSavePayment = async () => {
    try {
      // Validaciones

      // Limpieza del valor del pago
      const cleanAmount = valuePayment
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

      const store = useStore.getState();
      
      if (isEditing && currentPaymentId) {
        // Actualizar pago existente
        await updatePayment(currentPaymentId, paymentData);
        
        // Actualizar la lista de pagos en el store
        const updatedPayments = store.pyments.map(p => 
          p.id === currentPaymentId ? { ...p, ...paymentData } : p
        );
        store.setPyments(updatedPayments);
        
        Alert.alert("Éxito", "Pago actualizado correctamente");
      } else {
        // Crear nuevo pago
        const newPayment = await createPayment(paymentData);
        store.setPyments([...store.pyments, newPayment]);
        
        Alert.alert("Éxito", "Pago agregado correctamente");
      }
      
      // Limpiar formulario y estados
      resetForm();
      
      // Navegación de regreso
      // @ts-ignore
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error al guardar el pago:", error);
      Alert.alert("Error", "No se pudo guardar el pago");
    }
  };
  
  const resetForm = () => {
    setPaymentName("");
    setValuePayment("");
    setExpirationDate(new Date());
    setPaymentSources([]);
    setPaymentCategories([]);
    setAlertDaysBefore(null);
    setIsEditing(false);
    setCurrentPaymentId(undefined);
  };
  
  const handleEditPayment = (payment: Payment) => {
    // Configurar el modo de edición
    setIsEditing(true);
    setCurrentPaymentId(payment.id);
    
    // Llenar el formulario con los datos del pago seleccionado
    setPaymentName(payment.name);
    setValuePayment(transformToCurrency(payment.amount.toString()));
    setExpirationDate(new Date(payment.expirationDate));
    setPaymentSources(payment.paymentSources);
    setPaymentCategories(payment.categories);
    setAlertDaysBefore(payment.alertDaysBefore ? payment.alertDaysBefore.toString() : null);
    
    // Hacer scroll hacia arriba para ver el formulario
    // No es necesario implementar el scroll si el usuario puede ver el formulario naturalmente
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
          options={categories
            .filter(category => category.type === "Ingreso")
            .map(category => ({
              label: category.name,
              value: category.id || category.name.toLowerCase(),
            }))}
          selectedValues={paymentSources}
          onSelectionChange={setPaymentSources}
        />
        <MultiSelectWithChips
          label="Categoría"
          options={categories
            .filter(category => category.type === "Gasto")
            .map(category => ({
              label: category.name,
              value: category.id || category.name.toLowerCase(),
            }))}
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
          value={valuePayment}
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
        <FlexBox style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 10 }}>
          <View style={{ flex: 1 }}>
            <AppButton 
              variant="outlined" 
              title={isEditing ? "Actualizar pago" : "Agregar pago"} 
              onPress={handleSavePayment} 
            />
          </View>
          {isEditing && (
            <View>
              <AppButton
                variant="outlined"
                title="Cancelar"
                onPress={resetForm}
              />
            </View>
          )}
        </FlexBox>
      </View>
      <FlexBox style={styles.pymentsContainer}>
        <Typography.H5.SemiBold>
          Pagos registrados
        </Typography.H5.SemiBold>
        <FlexBox style={{ gap: 10, width: "100%" }}>
          {pyments.length > 0 ? (
            pyments.map((payment, index) => (
              <PaymentCard
                key={index}
                payment={payment}
                onEdit={handleEditPayment}
              />
            ))
          ) : (
            <FlexBox
              style={{
                justifyContent: "center",
                marginTop: 10,
                width: "50%",
                minWidth: 200,
                alignItems: "center",
                alignSelf: "center",
              }}
            >
              <Typography.P2.Regular
                styles={{
                  textAlign: "center",
                  color: colors.textsAndIcons.dark,
                  letterSpacing: 1,
                }}
              >
                Agrega tu primer pago.
              </Typography.P2.Regular>
            </FlexBox>
          )}
        </FlexBox>
      </FlexBox>
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
  pymentsContainer: {
    width: "100%",
    backgroundColor: colors.backgrounds.medium,
    alignItems: "center",
    borderRadius: 10,
    paddingVertical: 16,
    marginTop: 32,
    gap: 18,
  }
});
