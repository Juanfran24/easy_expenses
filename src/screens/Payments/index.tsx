import React, { useState, useEffect, useRef } from "react";
import { AppButton } from "@/src/components/AppButton";
import { AppDateField } from "@/src/components/Inputs/AppDateField";
import AppSelect from "@/src/components/Inputs/AppSelect";
import { AppTextInput } from "@/src/components/Inputs/AppTextInput";
import MultiSelectWithChips from "@/src/components/MultiSelect";
import Typography from "@/src/components/Typography";
import colors from "@/src/constants/colors";
import { transformToCurrency } from "@/src/utils";
import { createPayment, updatePayment } from "@/src/services/payments";
import {
  ScrollView,
  StyleSheet,
  View,
  Alert,
  RefreshControl,
} from "react-native";
import { useStore } from "@/src/store";
import { useNavigation } from "@react-navigation/native";
import { FlexBox } from "@/src/components/FlexBox";
import PaymentCard from "@/src/components/PaymentCard";
import { Payment } from "@/src/models/Payment";
import { Formik } from "formik";
import * as Yup from "yup";

const Payments = () => {
  const navigation = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [currentPaymentId, setCurrentPaymentId] = useState<string | undefined>(
    undefined
  );
  const [refreshing, setRefreshing] = useState(false);
  const categories = useStore((state) => state.categories);
  const payments = useStore((state) => state.payments);
  const store = useStore((state) => state);
  const formikRef = useRef<any>(null);

  // Corregir el método handleSavePayment para que edite correctamente un pago existente
  const handleSavePayment = async (values: any, formikHelpers: any) => {
    try {
      // Limpieza del valor del pago
      const cleanAmount = values.valuePayment
        .replace(/[$.]/g, "")
        .replace(/,/g, "");

      // Preparación de datos del pago
      const paymentData = {
        name: values.paymentName,
        amount: parseInt(cleanAmount, 10),
        expirationDate: values.expirationDate,
        paymentSources: values.paymentSources,
        categories: values.paymentCategories,
        alertDaysBefore: values.alertDaysBefore
          ? parseInt(values.alertDaysBefore)
          : null,
        isPaid: false,
        paidDate: null,
      };

      const store = useStore.getState();

      if (isEditing && currentPaymentId) {
        // Actualizar pago existente
        await updatePayment(currentPaymentId, paymentData);

        // Actualizar la lista de pagos en el store
        const updatedPayments = store.payments.map((p) =>
          p.id === currentPaymentId ? { ...p, ...paymentData } : p
        );
        store.setPayments(updatedPayments);

        Alert.alert("Éxito", "Pago actualizado correctamente");
      } else {
        // Crear nuevo pago
        const newPayment = await createPayment(paymentData);
        store.setPayments([...store.payments, newPayment]);

        Alert.alert("Éxito", "Pago agregado correctamente");
      }

      // Limpiar formulario
      formikHelpers.resetForm();
      setIsEditing(false);
      setCurrentPaymentId(undefined);

      // Navegación de regreso
      // @ts-ignore
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error al guardar el pago:", error);
      Alert.alert("Error", "No se pudo guardar el pago");
    }
  };

  const handleEditPayment = (payment: Payment) => {
    // Configurar el modo de edición
    setIsEditing(true);
    setCurrentPaymentId(payment.id);

    // Usar Formik para llenar los valores del formulario
    formikRef.current?.setFieldValue("paymentName", payment.name);
    formikRef.current?.setFieldValue(
      "valuePayment",
      transformToCurrency(payment.amount.toString())
    );
    formikRef.current?.setFieldValue(
      "expirationDate",
      new Date(payment.expirationDate)
    );
    formikRef.current?.setFieldValue("paymentSources", payment.paymentSources);
    formikRef.current?.setFieldValue("paymentCategories", payment.categories);
    formikRef.current?.setFieldValue(
      "alertDaysBefore",
      payment.alertDaysBefore ? payment.alertDaysBefore.toString() : null
    );
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      formikRef.current?.resetForm(); // Reiniciar el formulario al regresar a esta pantalla
    });

    return unsubscribe;
  }, [navigation]);

  const onRefresh = async () => {
    setRefreshing(true);
    await store.loadCategories();
    await store.loadPayments();
    await store.loadTransactions();
    setRefreshing(false);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 110 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[colors.primary.medium]}
          progressBackgroundColor={colors.backgrounds.medium}
        />
      }
    >
      <Typography.H5.SemiBold>Pagos no recurrentes</Typography.H5.SemiBold>
      <Formik
        innerRef={formikRef}
        initialValues={{
          paymentName: "",
          valuePayment: "",
          expirationDate: new Date(),
          paymentSources: [],
          paymentCategories: [],
          alertDaysBefore: null,
        }}
        validationSchema={Yup.object().shape({
          paymentName: Yup.string().required("Campo requerido"),
          valuePayment: Yup.string().required("Campo requerido"),
          expirationDate: Yup.date().required("Campo requerido"),
          paymentSources: Yup.array().min(
            1,
            "Selecciona al menos una fuente de pago"
          ),
          paymentCategories: Yup.array().min(
            1,
            "Selecciona al menos una categoría"
          ),
          alertDaysBefore: Yup.string().required("Selecciona una opción"),
        })}
        onSubmit={(values, formikHelpers) => {
          handleSavePayment(values, formikHelpers);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <>
            <View style={styles.formContainer}>
              <MultiSelectWithChips
                label="Fuente de pago"
                options={categories
                  .filter((category) => category.type === "Ingreso")
                  .map((category) => ({
                    label: category.name,
                    value: category.id || category.name.toLowerCase(),
                  }))}
                selectedValues={values.paymentSources}
                onSelectionChange={(selected) =>
                  setFieldValue("paymentSources", selected)
                }
                error={touched.paymentSources && !!errors.paymentSources}
                helperText={
                  touched.paymentSources &&
                  typeof errors.paymentSources === "string"
                    ? errors.paymentSources
                    : undefined
                }
              />
              <MultiSelectWithChips
                label="Categoría"
                options={categories
                  .filter((category) => category.type === "Gasto")
                  .map((category) => ({
                    label: category.name,
                    value: category.id || category.name.toLowerCase(),
                  }))}
                selectedValues={values.paymentCategories}
                onSelectionChange={(selected) =>
                  setFieldValue("paymentCategories", selected)
                }
                error={touched.paymentCategories && !!errors.paymentCategories}
                helperText={
                  touched.paymentCategories &&
                  typeof errors.paymentCategories === "string"
                    ? errors.paymentCategories
                    : undefined
                }
              />
              <AppTextInput
                label="Nombre del pago"
                placeholder="Ingresa el nombre del pago"
                onChangeText={handleChange("paymentName")}
                onBlur={handleBlur("paymentName")}
                value={values.paymentName}
                error={touched.paymentName && !!errors.paymentName}
                helperText={
                  touched.paymentName && typeof errors.paymentName === "string"
                    ? errors.paymentName
                    : undefined
                }
              />
              <AppTextInput
                label="Valor a pagar"
                placeholder="Ejemplo: 100.000"
                value={values.valuePayment}
                type="number"
                onChangeText={(text) => {
                  const digitsOnly = text.replace(/\D/g, "");
                  handleChange("valuePayment")(transformToCurrency(digitsOnly));
                }}
                onBlur={handleBlur("valuePayment")}
                error={touched.valuePayment && !!errors.valuePayment}
                helperText={
                  touched.valuePayment &&
                  typeof errors.valuePayment === "string"
                    ? errors.valuePayment
                    : undefined
                }
              />
              <AppDateField
                label="Fecha de vencimiento"
                value={values.expirationDate}
                onChange={(date) => setFieldValue("expirationDate", date)}
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
                onValueChange={(value) =>
                  setFieldValue("alertDaysBefore", value)
                }
                value={values.alertDaysBefore}
                error={touched.alertDaysBefore && !!errors.alertDaysBefore}
                helperText={
                  touched.alertDaysBefore &&
                  typeof errors.alertDaysBefore === "string"
                    ? errors.alertDaysBefore
                    : undefined
                }
              />
            </View>

            <View style={{ marginTop: 24 }}>
              <FlexBox
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  gap: 10,
                }}
              >
                {isEditing && (
                  <View>
                    <AppButton
                      variant="outlined"
                      title="Cancelar"
                      onPress={() => {
                        formikRef.current?.resetForm(); // Limpiar los campos del formulario
                        setIsEditing(false);
                        setCurrentPaymentId(undefined);
                      }}
                    />
                  </View>
                )}
                <View style={{ flex: 1 }}>
                  <AppButton
                    variant="contained"
                    title={isEditing ? "Actualizar pago" : "Agregar pago"}
                    onPress={() => handleSubmit()}
                  />
                </View>
              </FlexBox>
            </View>
          </>
        )}
      </Formik>

      <FlexBox style={styles.pymentsContainer}>
        <Typography.H5.SemiBold>Pagos registrados</Typography.H5.SemiBold>
        <FlexBox style={{ gap: 10, width: "100%" }}>
          {payments.length > 0 ? (
            payments.map((payment, index) => (
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
  },
});
