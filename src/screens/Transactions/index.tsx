import React, { useState } from "react";
import { StyleSheet, ScrollView, Platform } from "react-native";
import colors from "@/src/constants/colors";
import { FlexBox } from "@/src/components/FlexBox";
import { FlexBetween } from "@/src/components/FlexBox/FlexBetween";
import TransactionCard from "@/src/components/TransactionCard";
import * as Haptics from "expo-haptics";
import TransactionTabs from "@/src/components/TransactionTabs";
import { AppComboBox } from "@/src/components/Inputs/AppComboBox";
import SpeedFabView from "@/src/components/FABButtom";
import { TransactionType } from "./interfaces";

const TRANSACTION_TABS = [
  { id: "income", title: "Ingresos" },
  { id: "expense", title: "Gastos" },
];

const CATEGORIES = [
  { label: "Categorías", value: "all" },
  { label: "Salario principal", value: "main_salary" },
  { label: "Servicios públicos", value: "utilities" },
  { label: "Transporte", value: "transport" },
  { label: "Alimentación", value: "food" },
];

const PAYMENT_TYPES = [
  { label: "Tipo de pago", value: "all" },
  { label: "Efectivo", value: "cash" },
  { label: "Electrónico", value: "credit_card" },
];

const SORT_OPTIONS = [
  { label: "Más reciente", value: "newest" },
  { label: "Más antiguo", value: "oldest" },
];

const Transactions = () => {
  const [selectedTabId, setSelectedTabId] = useState<string>("income");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPaymentType, setSelectedPaymentType] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("newest");

  const transactions: TransactionType[] = [
    {
      id: "1",
      type: "income",
      amount: 5500.0,
      category: "Salario principal",
      name: "Pago mensual",
      date: "20 Oct 2025, 3:15pm",
    },
    {
      id: "2",
      type: "expense",
      amount: 200.0,
      category: "Servicios públicos",
      name: "Pago de electricidad",
      date: "20 Oct 2025, 3:15pm",
    },
    {
      id: "3",
      type: "income",
      amount: 5500.0,
      category: "Salario principal",
      name: "Pago mensual2",
      date: "20 Oct 2025, 3:15pm",
    },
    {
      id: "4",
      type: "expense",
      amount: 200.0,
      category: "Servicios públicos",
      name: "Pago de electricidad2",
      date: "20 Oct 2025, 3:15pm",
    },
    {
      id: "5",
      type: "income",
      amount: 5500.0,
      category: "Salario principal",
      name: "Pago mensual3",
      date: "20 Oct 2025, 3:15pm",
    },
    {
      id: "6",
      type: "expense",
      amount: 200.0,
      category: "Servicios públicos",
      name: "Pago de electricidad3",
      date: "20 Oct 2025, 3:15pm",
    },
  ];

  const handleTabChange = (tabId: string) => {
    if (Platform.OS === "web") return setSelectedTabId(tabId); //Evita que se rompa en web
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedTabId(tabId);
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <TransactionTabs
          tabs={TRANSACTION_TABS}
          selectedTabId={selectedTabId}
          onTabChange={handleTabChange}
        />

        <FlexBetween style={[styles.filterContainer]}>
          <FlexBox style={{ gap: 15, flexDirection: "row" }}>
            <AppComboBox
              label="Categoría"
              value={selectedCategory}
              items={CATEGORIES}
              onSelect={(item) => setSelectedCategory(item.value)}
              dropdownAlign="left"
            />
            <AppComboBox
              label="Tipo de pago"
              value={selectedPaymentType}
              items={PAYMENT_TYPES}
              onSelect={(item) => setSelectedPaymentType(item.value)}
              dropdownAlign="left"
            />
          </FlexBox>
          <AppComboBox
            icon="sort"
            iconOnly={true}
            value={selectedSort}
            items={SORT_OPTIONS}
            onSelect={(item) => setSelectedSort(item.value)}
            dropdownAlign="right"
          />
        </FlexBetween>

        <FlexBox style={{ paddingLeft: 16, paddingRight: 16, gap: 10 }}>
          {transactions
            .filter((t) => t.type === selectedTabId)
            .map((transaction, idx) => (
              <TransactionCard key={idx} transaction={transaction} />
            ))}
        </FlexBox>
      </ScrollView>
      <SpeedFabView />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgrounds.base,
  },
  filterContainer: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary.main,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4,
    shadowColor: colors.primary.main,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default Transactions;
