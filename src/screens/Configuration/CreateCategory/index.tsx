import { AppButton } from "@/src/components/AppButton";
import { FlexBox } from "@/src/components/FlexBox";
import AppRadio from "@/src/components/Inputs/AppRadio";
import { AppTextInput } from "@/src/components/Inputs/AppTextInput";
import Typography from "@/src/components/Typography";
import colors from "@/src/constants/colors";
import { Category } from "@/src/models/Category";
import { createCategory } from "@/src/services/categories";
import { Navigation } from "@/src/utils";
import { MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { ScrollView, StyleSheet, TouchableOpacity, View, Alert } from "react-native";
import { useStore } from "../../../store";

const AVAILABLE_ICONS = [
  "home",
  "work",
  "restaurant",
  "school"
];

const CreateCategory = () => {
  const navigation = Navigation();
  const [valueCategory, setValueCategory] = useState(0);
  const [categoryName, setCategoryName] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("");
  const [selectedColor, setSelectedColor] = useState("#FAFAFA");
  const categories = ["Ingreso", "Gasto"];

  const handleCreateCategory = async () => {
    if (!categoryName.trim()) {
      Alert.alert("Error", "El nombre de la categoría es obligatorio");
      return;
    }

    if (!selectedIcon) {
      Alert.alert("Error", "Debes seleccionar un ícono");
      return;
    }

    try {
      const newCategory: Category = {
        name: categoryName,
        type: categories[valueCategory] as "Ingreso" | "Gasto",
        icon: selectedIcon,
        color: selectedColor,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const createdCategory = await createCategory(newCategory);
      const store = useStore.getState();
      store.setCategories([...store.categories, createdCategory]);
      
      Alert.alert("Éxito", `Categoría ${categoryName} creada correctamente`);
      navigation.goBack();
    } catch (error) {
      console.error("Error al crear la categoría:", error);
    }
  };

  return (
    <ScrollView style={styles.viewContainer}>
      <View style={styles.backButtonAndTitle}>
        <TouchableOpacity
          onPressIn={() => navigation.goBack()}
          style={{
            marginLeft: 3,
            padding: 10,
          }}
        >
          <MaterialIcons
            name="arrow-back-ios"
            size={18}
            color={colors.textsAndIcons.main}
          />
        </TouchableOpacity>
        <Typography.H5.SemiBold>Crear categoría</Typography.H5.SemiBold>
      </View>
      <AppRadio
        label="Seleccionar tipo"
        value={valueCategory}
        onValueChange={setValueCategory}
        items={categories.map((category) => ({
          label: category,
          value: category,
        }))}
      />
      <View style={{ marginTop: 24, marginBottom: 36 }}>
        <AppTextInput
          label="Nombre categoría"
          placeholder="Ingresar nombre"
          value={categoryName}
          onChangeText={setCategoryName}
          maxLength={20}
        />
      </View>
      <Typography.H5.SemiBold>Seleccionar ícono</Typography.H5.SemiBold>
      <FlexBox style={styles.containerCardIcon}>
        {AVAILABLE_ICONS.map((icon, index) => (
          <TouchableOpacity 
            key={index}
            onPress={() => setSelectedIcon(icon !== "add" ? icon : "")}
            style={selectedIcon === icon ? styles.selectedContainer : null}
          >
            <CardIcon 
              icon={icon}
            />
          </TouchableOpacity>
        ))}
      </FlexBox>
      <Typography.H5.SemiBold>Seleccionar color</Typography.H5.SemiBold>
      <FlexBox style={styles.containerCircleColor}>
        {[
          "#FAFAFA",
          "#37CAA0",
          "#7667F9",
          "#FD5EED",
          "#FDA23B",
          "#FD523B",
          "#3BC3FD",
          "#74DB6B",
        ].map((color, index) => (
          <TouchableOpacity 
            key={index} 
            onPress={() => setSelectedColor(color)}
            style={selectedColor === color ? styles.selectedColorContainer : null}
          >
            <CircleColor 
              color={color} 
              icon={index === 0 ? "add" : null}
            />
          </TouchableOpacity>
        ))}
      </FlexBox>
      <View style={{ marginBottom: 30 }}>
        <AppButton
          title="Crear categoría"
          variant="contained"
          onPress={handleCreateCategory}
        />
      </View>
    </ScrollView>
  );
};

export default CreateCategory;

const CardIcon = ({ icon }: any) => {
  return (
    <View style={styles.cardIcon}>
      {icon && (
        <MaterialIcons name={icon} size={24} color={colors.primary.main} />
      )}
    </View>
  );
};

const CircleColor = ({ color, icon }: any) => {
  return (
    <View
      style={{
        backgroundColor: color,
        ...styles.circleColor,
      }}
    >
      {icon && <MaterialIcons name={icon} size={20} color="black" />}
    </View>
  );
};

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    backgroundColor: colors.backgrounds.base,
    paddingHorizontal: 24,
  },
  backButtonAndTitle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 24,
    marginBottom: 36,
  },
  containerCardIcon: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 16,
    marginTop: 24,
    marginBottom: 36,
  },
  cardIcon: {
    backgroundColor: colors.backgrounds.medium,
    borderRadius: 10,
    padding: 16,
    width: 56,
    height: 56,
    alignItems: "center",
    justifyContent: "center",
  },
  containerCircleColor: {
    flexDirection: "row",
    marginTop: 24,
    gap: 15,
    marginBottom: 36,
  },
  circleColor: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  selectedContainer: {
    borderWidth: 2,
    borderColor: colors.primary.main,
    borderRadius: 12,
  },
  selectedColorContainer: {
    borderWidth: 2,
    borderColor: colors.primary.main,
    borderRadius: 14,
    padding: 2,
  },
});
