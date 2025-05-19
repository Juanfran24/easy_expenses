import React, { useEffect } from "react";
import { StyleSheet, ScrollView } from "react-native";
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
import { useNavigation } from "@react-navigation/native";
import AppRadio from "@/src/components/Inputs/AppRadio";
import { AppDateField } from "@/src/components/Inputs/AppDateField";
import { useStore } from "../../../store";
import { Formik } from "formik";
import * as Yup from "yup";

const CreateAndEditTransactions = ({ route }: any) => {
  const navigation = useNavigation();
  const {
    type: typeTransaction,
    isEditing,
    transaction: editingTransaction,
  } = route.params;
  const [loadingCategories, setLoadingCategories] = React.useState(true);

  const categories = useStore((state) => state.categories);

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
  }, [categories]);

  const filteredCategories = categories.filter(
    (cat) => cat.type === (typeTransaction === "ingreso" ? "Ingreso" : "Gasto")
  );

  const categoryItems = filteredCategories.map((cat) => ({
    label: cat.name,
    value: cat.id || "",
  }));

  const categoriesWithDefault = [...categoryItems];

  const PAYMENT_METHODS = [
    { label: "Efectivo", value: "cash" },
    { label: "Electrónico", value: "electronic" },
  ];

  const onSaveTransaction = async (values: any) => {
    try {
      const now = new Date();

      const cleanAmount = values.valueTransaction
        .replace(/[$.]/g, "")
        .replace(/,/g, "");

      const transactionData = {
        name: values.nameTransaction,
        amount: parseInt(cleanAmount, 10),
        description: values.descriptionTransaction,
        date: new Date(values.dateTransaction),
        category: values.category || "none",
        type: typeTransaction,
        paymentMethod: values.paymentMethod as "cash" | "electronic",
        updatedAt: now,
        localTypeTransaction: values.localTypeTransaction as
          | "fijo"
          | "variable",
        dayOfMonth:
          values.localTypeTransaction === "fijo"
            ? values.dayOfMonth
            : undefined,
        endDate:
          values.localTypeTransaction === "fijo" ? values.endDate : undefined,
      };

      const store = useStore.getState();
      if (isEditing && editingTransaction?.id) {
        const transactionUpdated = await updateTransaction(
          editingTransaction.id,
          transactionData
        );
        const updatedTransactions = store.transactions.map((tx) =>
          tx.id === editingTransaction.id
            ? { ...tx, ...transactionUpdated }
            : tx
        );
        store.setTransactionList(updatedTransactions);
      } else {
        const newTransaction = await createTransaction({
          ...transactionData,
          userId: "",
          createdAt: now,
        });
        store.setTransactionList([newTransaction, ...store.transactions]);
      }

      //@ts-ignore
      navigation.navigate("Home", {
        screen: "Transacciones",
      });
    } catch (error) {
      console.error("Error al guardar la transacción:", error);
    }
  };

  const transactionYup = Yup.object().shape({
    nameTransaction: Yup.string()
      .required("El nombre es requerido")
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(20, "El nombre no puede exceder los 20 caracteres"),
    valueTransaction: Yup.string().required("El valor es requerido"),
    category: Yup.string().required("La categoría es requerida"),
    dateTransaction: Yup.date().required("La fecha es requerida"),
    paymentMethod: Yup.string().required("El método de pago es requerido"),
    descriptionTransaction: Yup.string(),
    endDate: Yup.date(),
    dayOfMonth: Yup.number(),
  });

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 50 }}
    >
      <Formik
        initialValues={{
          nameTransaction: editingTransaction?.name || "",
          valueTransaction: transformToCurrency(
            editingTransaction?.amount.toString() || ""
          ),
          category: editingTransaction?.category || "",
          dateTransaction: editingTransaction?.date
            ? new Date(editingTransaction.date)
            : new Date(),
          descriptionTransaction: editingTransaction?.description || "",
          paymentMethod: editingTransaction?.paymentMethod || "cash",
          endDate:
            editingTransaction?.endDate && new Date(editingTransaction.endDate),
          localTypeTransaction: "fijo",
          dayOfMonth: 1,
        }}
        validationSchema={transactionYup}
        onSubmit={(values) => {
          // console.log("Form values:", values);
          onSaveTransaction(values);
        }}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <FlexBox style={styles.formContainer}>
            <AppRadio
              label="Tipo de ingreso"
              value={values.localTypeTransaction === "fijo" ? 0 : 1}
              onValueChange={(value) =>
                handleChange("localTypeTransaction")(
                  value === 0 ? "fijo" : "variable"
                )
              }
              items={[
                { label: "Fijo", value: "fijo" },
                { label: "Variable", value: "variable" },
              ]}
            />
            <AppTextInput
              label={`Nombre ${typeTransaction}`}
              placeholder="Ejemplo: Renta"
              value={values.nameTransaction}
              onChangeText={handleChange("nameTransaction")}
              onBlur={handleBlur("nameTransaction")}
              error={touched.nameTransaction && !!errors.nameTransaction}
              helperText={
                touched.nameTransaction &&
                typeof errors.nameTransaction === "string"
                  ? errors.nameTransaction
                  : undefined
              }
            />
            <AppTextInput
              label="Valor"
              placeholder="Ejemplo: $2.500.000"
              value={values.valueTransaction}
              type="number"
              onChangeText={(text) => {
                const digitsOnly = text.replace(/\D/g, "");
                handleChange("valueTransaction")(
                  transformToCurrency(digitsOnly)
                );
              }}
              onBlur={handleBlur("valueTransaction")}
              maxLength={20}
              error={touched.valueTransaction && !!errors.valueTransaction}
              helperText={
                touched.valueTransaction &&
                typeof errors.valueTransaction === "string"
                  ? errors.valueTransaction
                  : undefined
              }
            />
            <AppSelect
              label="Categoría"
              placeholder={
                loadingCategories ? "Cargando categorías..." : "Seleccionar"
              }
              items={categoriesWithDefault}
              onValueChange={handleChange("category")}
              value={values.category}
              error={touched.category && !!errors.category}
              helperText={
                touched.category && typeof errors.category === "string"
                  ? errors.category
                  : undefined
              }
            />
            <AppDateField
              label="Fecha"
              value={values.dateTransaction}
              onChange={(date) =>
                handleChange("dateTransaction")(date.toISOString())
              }
            />
            <AppRadio
              label="Metodo de pago"
              value={values.paymentMethod === "cash" ? 0 : 1}
              onValueChange={(value) =>
                handleChange("paymentMethod")(
                  value === 0 ? "cash" : "electronic"
                )
              }
              items={PAYMENT_METHODS.map((category) => ({
                label: category.label,
                value: category.value,
              }))}
            />
            {values.localTypeTransaction === "fijo" && (
              <>
                <AppSelect
                  label="Día del mes"
                  placeholder="Seleccionar"
                  items={Array.from({ length: 30 }, (_, i) => ({
                    label: `${i + 1}`,
                    value: (i + 1).toString(),
                  }))}
                  onValueChange={(value) => handleChange("dayOfMonth")(value)}
                  value={values.dayOfMonth.toString()}
                />
                {typeTransaction === "gasto" && (
                  <AppDateField
                    label="Fecha hasta (Opcional)"
                    value={values.endDate}
                    onChange={(date) =>
                      handleChange("endDate")(date.toISOString())
                    }
                  />
                )}
              </>
            )}
            <AppTextInput
              style={styles.textArea}
              label="Nota (Opcional)"
              placeholder="Ingresar descripción"
              value={values.descriptionTransaction}
              onChangeText={handleChange("descriptionTransaction")}
              multiline={true}
              numberOfLines={4}
            />
            <AppButton
              title={`${
                isEditing ? "Actualizar" : "Agregar"
              } ${typeTransaction}`}
              onPress={() => handleSubmit()}
              variant="outlined"
            />
          </FlexBox>
        )}
      </Formik>
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
