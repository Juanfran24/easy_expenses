import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, Platform, ActivityIndicator, View } from "react-native";
import colors from "@/src/constants/colors";
import { FlexBox } from "@/src/components/FlexBox";
import { FlexBetween } from "@/src/components/FlexBox/FlexBetween";
import TransactionCard from "@/src/components/TransactionCard";
import * as Haptics from "expo-haptics";
import TransactionTabs from "@/src/components/TransactionTabs";
import { AppComboBox } from "@/src/components/Inputs/AppComboBox";
import SpeedFabView from "@/src/components/FABButtom";
import { getUserTransactions } from "@/src/services/transactions";
import { Transaction } from "@/src/models/Transaction";
import Typography from "@/src/components/Typography";

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
  { label: "Electrónico", value: "electronic" },
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
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleTabChange = (tabId: string) => {
    if (Platform.OS === "web") return setSelectedTabId(tabId);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedTabId(tabId);
  };

  const fetchTransactions = async () => {
    try {
      setIsLoading(true);
      const transactionsData = await getUserTransactions();
      setTransactions(transactionsData);
      console.log("Transactions fetched successfully:", transactionsData);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFilteredTransactions = () => {
    return transactions
      .filter(transaction => {
        const tabType = selectedTabId === "income" ? "ingreso" : "gasto";
        if (transaction.type !== tabType) return false;
        if (selectedCategory !== 'all' && transaction.category !== selectedCategory) return false;
        if (selectedPaymentType !== 'all' && transaction.paymentMethod !== selectedPaymentType) return false;
        return true;
      })
      .sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return selectedSort === 'newest' ? dateB - dateA : dateA - dateB;
      });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <>
      <ScrollView style={styles.container}>
        <TransactionTabs
          tabs={TRANSACTION_TABS}
          selectedTabId={selectedTabId}
          onTabChange={handleTabChange}
        />

        <FlexBetween style={[styles.filterContainer, { gap: 15 }]}>
          <FlexBetween style={{ gap: 4, flex: 1 }}>
            <AppComboBox
              label="Categoría"
              value={selectedCategory}
              items={CATEGORIES}
              onSelect={(item) => setSelectedCategory(item.value)}
              containerStyle={{ flex: 1, height: 28 }}
              dropdownAlign="left"
            />
            <AppComboBox
              label="Tipo de pago"
              value={selectedPaymentType}
              items={PAYMENT_TYPES}
              onSelect={(item) => setSelectedPaymentType(item.value)}
              containerStyle={{ flex: 1, height: 28, marginLeft: 4 }}
              dropdownAlign="left"
            />
          </FlexBetween>
          <AppComboBox
            icon="sort"
            iconOnly={true}
            value={selectedSort}
            items={SORT_OPTIONS}
            onSelect={(item) => setSelectedSort(item.value)}
            containerStyle={{ marginLeft: 8, height: 28 }}
            dropdownAlign="right"
          />
        </FlexBetween>

        <FlexBox style={{ paddingLeft: 16, paddingRight: 16 }}>
          {isLoading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.primary.main} />
            </View>
          ) : getFilteredTransactions().length > 0 ? (
            getFilteredTransactions().map((transaction, idx) => (
              <TransactionCard
                key={idx}
                type={transaction.type === "ingreso" ? "income" : "expense"}
                amount={transaction.amount}
                category={transaction.category}
                description={transaction.description}
                date={transaction.date.toLocaleString('es-ES', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              />
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Typography.H6.Regular styles={{ color: colors.textsAndIcons.dark }}>
                No hay transacciones para mostrar
              </Typography.H6.Regular>
            </View>
          )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
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
